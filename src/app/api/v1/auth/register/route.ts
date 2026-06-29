import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'
import { registerSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
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

    const token = await createSession({ userId: user.id, role: user.role })
    const response = NextResponse.json({ success: true, data: { id: user.id, name: user.nameAr, role: user.role } }, { status: 201 })
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400,
    })
    return response
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل إنشاء الحساب' }, { status: 500 })
  }
}
