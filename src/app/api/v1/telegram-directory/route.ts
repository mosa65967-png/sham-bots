import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const governorateId = searchParams.get('governorateId')
  const category = searchParams.get('category')
  const q = searchParams.get('q')
  const featured = searchParams.get('featured')
  const verified = searchParams.get('verified')
  const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)
  const offset = Number(searchParams.get('offset')) || 0

  const where: Record<string, unknown> = { status: 'approved' }
  if (type) where.type = type
  if (governorateId) where.governorateId = governorateId
  if (category) where.category = category
  if (q) where.title = { contains: q, mode: 'insensitive' }
  if (featured === 'true') where.isFeatured = true
  if (verified === 'true') where.isVerified = true

  try {
    const [data, total] = await Promise.all([
      prisma.telegramListing.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { membersCount: 'desc' },
      }),
      prisma.telegramListing.count({ where }),
    ])
    return NextResponse.json({ success: true, data, total })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل جلب البيانات' }, { status: 500 })
  }
}
