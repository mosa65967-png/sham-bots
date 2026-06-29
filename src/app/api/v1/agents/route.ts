import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const governorateId = searchParams.get('governorateId')

  try {
    const where: Record<string, unknown> = { role: 'agent', isActive: true }
    if (governorateId) where.governorateId = governorateId

    const agents = await prisma.user.findMany({
      where,
      select: {
        id: true,
        nameAr: true,
        phone: true,
        governorateId: true,
        avatarUrl: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: agents })
  } catch {
    return NextResponse.json({ success: false, data: [] })
  }
}
