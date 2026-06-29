import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('session')?.value
  if (!token) {
    return NextResponse.json({ success: false, error: 'غير مصرح' }, { status: 401 })
  }

  const session = await verifySession(token)
  if (!session) {
    return NextResponse.json({ success: false, error: 'الجلسة منتهية' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
    select: { id: true, nameAr: true, phone: true, email: true, role: true, isVerified: true },
  })

  if (!user) {
    return NextResponse.json({ success: false, error: 'المستخدم غير موجود' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: user })
}
