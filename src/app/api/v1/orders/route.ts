import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)
  const offset = Number(searchParams.get('offset')) || 0

  try {
    const [data, total] = await Promise.all([
      prisma.order.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: { payments: true },
      }),
      prisma.order.count(),
    ])
    return NextResponse.json({ success: true, data, total })
  } catch (error) {
    return NextResponse.json({ success: true, data: [], total: 0 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const order = await prisma.order.create({
      data: {
        userId: body.userId,
        storeId: body.storeId,
        orderNumber: `ORD-${Date.now().toString(36).toUpperCase()}`,
        items: body.items,
        totalSyp: body.totalSyp,
        totalUsd: body.totalUsd || null,
        governorateId: body.governorateId || null,
        notes: body.notes || null,
      },
    })
    return NextResponse.json({ success: true, data: order }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل إنشاء الطلب' }, { status: 500 })
  }
}
