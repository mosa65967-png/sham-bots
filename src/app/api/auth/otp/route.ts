import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()
    if (!phone) {
      return NextResponse.json({ success: false, error: 'رقم الهاتف مطلوب' }, { status: 400 })
    }

    const normalizedPhone = phone.replace(/[^0-9]/g, '')
    if (normalizedPhone.length < 9) {
      return NextResponse.json({ success: false, error: 'رقم هاتف غير صحيح' }, { status: 400 })
    }

    await prisma.verificationToken.deleteMany({ where: { identifier: normalizedPhone } })

    const otp = generateOTP()
    const expires = new Date(Date.now() + 5 * 60 * 1000)

    await prisma.verificationToken.create({
      data: { identifier: normalizedPhone, token: otp, expires },
    })

    console.log(`[OTP] To ${normalizedPhone}: ${otp}`)

    return NextResponse.json({
      success: true,
      message: 'تم إرسال رمز التحقق',
      debug: process.env.NODE_ENV !== 'production' ? { otp } : undefined,
    })
  } catch (error) {
    console.error('[OTP]', error)
    return NextResponse.json({ success: false, error: 'فشل إرسال رمز التحقق' }, { status: 500 })
  }
}
