import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { orderSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)
  const offset = Number(searchParams.get('offset')) || 0
  const userId = searchParams.get('userId')
  const status = searchParams.get('status')

  try {
    const where: Record<string, unknown> = {}
    if (userId) where.userId = userId
    if (status) where.status = status

    const [data, total] = await Promise.all([
      prisma.order.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: { payments: true, store: { select: { name: true } } },
      }),
      prisma.order.count({ where }),
    ])
    return NextResponse.json({ success: true, data, total })
  } catch {
    return NextResponse.json({ success: true, data: [], total: 0 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value
    const session = token ? await verifySession(token) : null

    const body = await request.json()
    const parsed = orderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        userId: session?.userId as string || 'guest',
        storeId: parsed.data.storeId,
        orderNumber: `ORD-${Date.now().toString(36).toUpperCase()}`,
        items: parsed.data.items,
        totalSyp: parsed.data.totalSyp,
        totalUsd: parsed.data.totalUsd || null,
        governorateId: parsed.data.governorateId || null,
        notes: parsed.data.notes || null,
      },
    })
    return NextResponse.json({ success: true, data: order }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'فشل إنشاء الطلب' }, { status: 500 })
  }
}
