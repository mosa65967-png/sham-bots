import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { botSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)
  const offset = Number(searchParams.get('offset')) || 0

  try {
    const where = userId ? { userId } : {}
    const [data, total] = await Promise.all([
      prisma.bot.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { flows: true, conversations: true } } },
      }),
      prisma.bot.count({ where }),
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
    if (!session) {
      return NextResponse.json({ success: false, error: 'غير مصرح. الرجاء تسجيل الدخول.' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = botSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    const bot = await prisma.bot.create({
      data: {
        userId: session.userId as string,
        name: parsed.data.name,
        botType: parsed.data.botType,
        templateId: parsed.data.templateId || null,
        description: parsed.data.description || null,
        governorateId: parsed.data.governorateId || null,
        isAiEnabled: parsed.data.isAiEnabled ?? true,
      },
    })
    return NextResponse.json({ success: true, data: bot }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'فشل إنشاء البوت' }, { status: 500 })
  }
}
