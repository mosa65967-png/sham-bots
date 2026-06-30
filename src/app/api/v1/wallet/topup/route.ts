import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { walletTopupSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: 'غير مصرح. الرجاء تسجيل الدخول.' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = walletTopupSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    let wallet = await prisma.wallet.findUnique({
      where: { userId: session.userId as string },
    })

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { userId: session.userId as string },
      })
    }

    const transactionStatus = parsed.data.method === 'cash' ? 'pending' : 'completed'

    const transaction = await prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: 'credit',
        amountSyp: parsed.data.amountSyp,
        status: transactionStatus,
        description: `إيداع عبر ${parsed.data.method === 'cash' ? 'نقدي' : parsed.data.method === 'card' ? 'بطاقة' : 'محفظة'}`,
      },
    })

    if (transactionStatus === 'completed') {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: { balanceSyp: { increment: parsed.data.amountSyp } },
      })
    }

    return NextResponse.json({ success: true, data: transaction }, { status: 201 })
  } catch (error) {
    console.error('[WALLET_TOPUP]', error)
    return NextResponse.json({ success: false, error: 'فشل شحن المحفظة' }, { status: 500 })
  }
}
