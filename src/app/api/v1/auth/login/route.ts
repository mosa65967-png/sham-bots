import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'
import { loginSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { phone, password } = parsed.data
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

    const token = await createSession({ userId: user.id, role: user.role })
    const response = NextResponse.json({ success: true, data: { id: user.id, name: user.nameAr, role: user.role, hasPassword: !!user.passwordHash } })
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400,
    })
    const csrfCookie = btoa(JSON.stringify({ t: Date.now(), r: Math.random().toString(36).slice(2) }))
    response.cookies.set('csrf-token', csrfCookie, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400,
    })
    return response
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل تسجيل الدخول' }, { status: 500 })
  }
}
