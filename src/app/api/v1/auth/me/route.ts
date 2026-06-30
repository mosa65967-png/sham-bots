import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  let userId: string | null = null

  const token = request.cookies.get('session')?.value
  if (token) {
    const session = await verifySession(token)
    if (session?.userId) userId = session.userId as string
  }

  if (!userId) {
    const nextAuth = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (nextAuth?.userId) userId = nextAuth.userId as string
  }

  if (!userId) {
    return NextResponse.json({ success: false, error: 'غير مصرح' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, nameAr: true, phone: true, email: true, role: true, isVerified: true },
  })

  if (!user) {
    return NextResponse.json({ success: false, error: 'المستخدم غير موجود' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: user })
}
