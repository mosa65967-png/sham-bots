import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json()
    if (!phone || !otp) {
      return NextResponse.json({ success: false, error: 'رقم الهاتف ورمز التحقق مطلوبان' }, { status: 400 })
    }

    const normalizedPhone = phone.replace(/[^0-9]/g, '')
    const user = await prisma.user.findUnique({ where: { phone: normalizedPhone } })
    if (!user || !user.otpCode || !user.otpExpires) {
      return NextResponse.json({ success: false, error: 'لم يتم طلب رمز تحقق. الرجاء طلب رمز جديد.' }, { status: 400 })
    }

    if (user.otpCode !== otp) {
      return NextResponse.json({ success: false, error: 'رمز التحقق غير صحيح' }, { status: 401 })
    }

    if (user.otpExpires < new Date()) {
      return NextResponse.json({ success: false, error: 'رمز التحقق منتهي الصلاحية. الرجاء طلب رمز جديد.' }, { status: 401 })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { otpCode: null, otpExpires: null, otpAttempts: { increment: 1 } },
    })

    const token = await createSession({ userId: user.id, role: user.role })
    const response = NextResponse.json({ success: true, data: { id: user.id, name: user.nameAr, role: user.role } })
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400,
    })
    return response
  } catch {
    return NextResponse.json({ success: false, error: 'فشل التحقق من الرمز' }, { status: 500 })
  }
}
