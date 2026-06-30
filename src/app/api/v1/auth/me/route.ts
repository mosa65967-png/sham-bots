import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (!token?.userId) {
    return NextResponse.json({ success: false, error: 'غير مصرح' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: token.userId as string },
    select: { id: true, nameAr: true, phone: true, email: true, role: true, isVerified: true },
  })

  if (!user) {
    return NextResponse.json({ success: false, error: 'المستخدم غير موجود' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: user })
}
