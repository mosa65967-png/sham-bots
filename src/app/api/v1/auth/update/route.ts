import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export async function PUT(request: NextRequest) {
  try {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: 'غير مصرح' }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, email } = body

    const updateData: Record<string, string> = {}
    if (name) updateData.nameAr = name
    if (phone) updateData.phone = phone
    if (email) updateData.email = email

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: false, error: 'لا توجد بيانات للتحديث' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: session.userId as string },
      data: updateData,
      select: { id: true, nameAr: true, phone: true, email: true, role: true },
    })

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل تحديث البيانات' }, { status: 500 })
  }
}
