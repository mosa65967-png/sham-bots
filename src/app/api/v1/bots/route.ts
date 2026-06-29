import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)

  try {
    const where = userId ? { userId } : {}
    const [data, total] = await Promise.all([
      prisma.bot.findMany({
        where,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { flows: true, conversations: true } } },
      }),
      prisma.bot.count({ where }),
    ])
    return NextResponse.json({ success: true, data, total })
  } catch (error) {
    return NextResponse.json({ success: true, data: [], total: 0 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const bot = await prisma.bot.create({
      data: {
        userId: body.userId,
        name: body.name,
        botType: body.botType || 'custom',
        templateId: body.templateId || null,
        description: body.description || null,
        governorateId: body.governorateId || null,
        isAiEnabled: body.isAiEnabled ?? true,
      },
    })
    return NextResponse.json({ success: true, data: bot }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'فشل إنشاء البوت' }, { status: 500 })
  }
}
