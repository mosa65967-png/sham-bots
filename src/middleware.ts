import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession, PROTECTED_ROUTES, AUTH_ROUTES } from '@/lib/auth'

const STATIC_PATHS = ['/_next', '/favicon.ico', '/images', '/fonts', '/icon.svg']
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sham-bots-production.up.railway.app'
const ALLOWED_ORIGINS = [SITE_URL, 'http://localhost:3000', 'http://localhost:3001']

function isMutatingMethod(method: string): boolean {
  return ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)
}

async function verifyAuth(token: string | undefined): Promise<Record<string, unknown> | null> {
  if (!token) return null
  try {
    return await verifySession(token)
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method

  if (STATIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // CSRF: reject mutating requests from external origins
  if (isMutatingMethod(method) && !pathname.startsWith('/api/v1/auth/')) {
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    if (origin && !ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
      return NextResponse.json({ success: false, error: 'طلب محظور: مصدر غير معروف' }, { status: 403 })
    }
    if (!origin && referer && !ALLOWED_ORIGINS.some(o => referer.startsWith(o))) {
      return NextResponse.json({ success: false, error: 'طلب محظور: مصدر غير معروف' }, { status: 403 })
    }
  }

  // Auth check for protected routes
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('session')?.value
    const session = await verifyAuth(token)
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if (pathname.startsWith('/admin') && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (pathname.startsWith('/agent') && session.role !== 'agent' && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Redirect logged-in users away from auth pages
  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('session')?.value
    const session = await verifyAuth(token)
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https: wss:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'"
  )

  // CORS for API
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin') || ''
    if (ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    } else if (!origin) {
      response.headers.set('Access-Control-Allow-Origin', SITE_URL)
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token')
    response.headers.set('Access-Control-Allow-Credentials', 'true')

    if (method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin') || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '86400',
        },
      })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg).*)'],
}
