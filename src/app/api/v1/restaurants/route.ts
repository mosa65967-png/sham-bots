import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const governorateId = searchParams.get('governorateId')
  const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)

  try {
    const where: Record<string, unknown> = { status: 'active' }
    if (governorateId) where.governorateId = governorateId

    const [data, total] = await Promise.all([
      prisma.restaurant.findMany({
        where,
        take: limit,
        orderBy: { rating: 'desc' },
        include: { _count: { select: { menuItems: true } } },
      }),
      prisma.restaurant.count({ where }),
    ])
    return NextResponse.json({ success: true, data, total })
  } catch (error) {
    return NextResponse.json({ success: true, data: [], total: 0 })
  }
}
