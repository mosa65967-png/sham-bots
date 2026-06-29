import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()
    if (!phone) {
      return NextResponse.json({ success: false, error: 'رقم الهاتف مطلوب' }, { status: 400 })
    }

    let user = await prisma.user.findUnique({ where: { phone } })
    if (!user) {
      user = await prisma.user.create({
        data: { phone, nameAr: phone, role: 'user', isVerified: true },
      })
    }

    const token = await createSession({ userId: user.id, role: user.role })
    const response = NextResponse.json({ success: true, data: { id: user.id, name: user.nameAr, role: user.role } })
    response.cookies.set('session', token, {
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
