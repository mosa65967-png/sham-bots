import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations'
import { checkRateLimit } from '@/lib/rate-limiter'
import { encode } from 'next-auth/jwt'

const COOKIE_NAME = process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { phone, password } = parsed.data
    if (!checkRateLimit(`login:${phone}`, 10, 60_000)) {
      return NextResponse.json({ success: false, error: 'طلبات كثيرة. الرجاء الانتظار دقيقة.' }, { status: 429 })
    }

    const user = await prisma.user.findUnique({ where: { phone } })
    if (!user) {
      return NextResponse.json({ success: false, error: 'رقم الهاتف غير مسجل. الرجاء إنشاء حساب جديد.' }, { status: 401 })
    }

    if (user.passwordHash) {
      if (!password) {
        return NextResponse.json({ success: false, error: 'هذا الحساب محمي بكلمة مرور. الرجاء إدخال كلمة المرور.' }, { status: 401 })
      }
      const valid = await bcrypt.compare(password, user.passwordHash)
      if (!valid) {
        return NextResponse.json({ success: false, error: 'كلمة المرور غير صحيحة' }, { status: 401 })
      }
    }

    const token = await encode({
      token: { userId: user.id, role: user.role },
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: 86400,
    })

    const response = NextResponse.json({
      success: true,
      data: { id: user.id, name: user.nameAr, role: user.role, hasPassword: !!user.passwordHash },
    })

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400,
    })

    return response
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل تسجيل الدخول' }, { status: 500 })
  }
}
