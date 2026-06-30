import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations'
import { checkRateLimit } from '@/lib/rate-limiter'
import { encode } from 'next-auth/jwt'

const COOKIE_NAME = process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!checkRateLimit(`register:${ip}`, 10, 60_000)) {
      return NextResponse.json({ success: false, error: 'طلبات كثيرة. الرجاء الانتظار.' }, { status: 429 })
    }

    const body = await request.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { phone, password, nameAr } = parsed.data
    const existing = await prisma.user.findUnique({ where: { phone } })
    if (existing) {
      return NextResponse.json({ success: false, error: 'رقم الهاتف مسجل مسبقاً' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { phone, nameAr, passwordHash, role: 'user', isVerified: true },
    })
    await prisma.wallet.create({
      data: { userId: user.id },
    })

    const token = await encode({
      token: { userId: user.id, role: user.role },
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: 86400,
    })

    const response = NextResponse.json({ success: true, data: { id: user.id, name: user.nameAr, role: user.role } }, { status: 201 })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400,
    })
    return response
  } catch (error) {
    console.error('[REGISTER]', error)
    return NextResponse.json({ success: false, error: 'فشل إنشاء الحساب' }, { status: 500 })
  }
}
