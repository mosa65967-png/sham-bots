import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession, PROTECTED_ROUTES, AUTH_ROUTES } from '@/lib/auth'

const PUBLIC_PATHS = ['/', '/auth/login', '/auth/register', '/directory', '/restaurants', '/stores', '/pricing', '/support', '/contact', '/faq', '/blog', '/terms', '/privacy']
const API_PUBLIC_PATHS = ['/api/v1/governorates', '/api/v1/telegram-directory', '/api/v1/orders', '/api/v1/bots', '/api/v1/agents', '/api/v1/restaurants', '/api/v1/auth/login']
const STATIC_PATHS = ['/_next', '/favicon.ico', '/images', '/fonts', '/icon.svg']

const RATE_LIMIT_MAP = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 100
const RATE_LIMIT_WINDOW = 60 * 1000

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const record = RATE_LIMIT_MAP.get(ip)
  if (!record || now > record.resetTime) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  if (record.count >= RATE_LIMIT_MAX) return false
  record.count++
  return true
}

function sanitizeInput(value: string): string {
  return value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'

  // Allow static files
  if (STATIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    if (!rateLimit(ip)) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'طلبات كثيرة جداً. حاول لاحقاً.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' } }
      )
    }
  }

  // Auth check for protected routes
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('session')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    const session = await verifySession(token)
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    // Admin-only routes
    if (pathname.startsWith('/admin') && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // Agent-only routes
    if (pathname.startsWith('/agent') && session.role !== 'agent' && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Redirect logged-in users away from auth pages
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('session')?.value
    if (token) {
      const session = await verifySession(token)
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  // Security headers
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  // CORS for API
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }

  // Sanitize query parameters
  const sanitizedUrl = new URL(request.url)
  let needsRedirect = false
  sanitizedUrl.searchParams.forEach((value, key) => {
    const clean = sanitizeInput(value)
    if (clean !== value) {
      sanitizedUrl.searchParams.set(key, clean)
      needsRedirect = true
    }
  })
  if (needsRedirect) {
    return NextResponse.redirect(sanitizedUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
