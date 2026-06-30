import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/rate-limiter'

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    const { phone } = await request.json()
    if (!phone) {
      return NextResponse.json({ success: false, error: 'رقم الهاتف مطلوب' }, { status: 400 })
    }

    const normalizedPhone = phone.replace(/[^0-9]/g, '')
    if (normalizedPhone.length < 9) {
      return NextResponse.json({ success: false, error: 'رقم هاتف غير صحيح' }, { status: 400 })
    }

    if (!checkRateLimit(`otp:${normalizedPhone}`, 3, 120_000)) {
      return NextResponse.json({ success: false, error: 'طلبات كثيرة. الرجاء الانتظار دقيقتين.' }, { status: 429 })
    }

    let user = await prisma.user.findUnique({ where: { phone: normalizedPhone } })
    if (!user) {
      user = await prisma.user.create({
        data: { phone: normalizedPhone, nameAr: normalizedPhone, role: 'user', isVerified: true },
      })
      await prisma.wallet.create({ data: { userId: user.id } }).catch(() => {})
    }

    const otp = generateOTP()
    const expires = new Date(Date.now() + 5 * 60 * 1000)

    await prisma.user.update({
      where: { id: user.id },
      data: { otpCode: otp, otpExpires: expires, otpAttempts: 0 },
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
