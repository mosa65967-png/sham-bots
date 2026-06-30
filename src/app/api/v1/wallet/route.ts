import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  if (!session?.userId) {
    return NextResponse.json({ success: false, error: 'غير مصرح' }, { status: 401 })
  }

  const wallet = await prisma.wallet.findUnique({
    where: { userId: session.userId as string },
    include: {
      transactions: { orderBy: { createdAt: 'desc' }, take: 20 },
    },
  })

  if (!wallet) {
    const newWallet = await prisma.wallet.create({
      data: { userId: session.userId as string },
      include: { transactions: { take: 0 } },
    })
    return NextResponse.json({ success: true, data: newWallet })
  }

  return NextResponse.json({ success: true, data: wallet })
}
