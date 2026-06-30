import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { ticketSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('session')?.value || request.cookies.get('next-auth.session-token')?.value || request.cookies.get('__Secure-next-auth.session-token')?.value
  const session = token ? await verifySession(token) : null
  if (!session) {
    return NextResponse.json({ success: false, error: 'غير مصرح. الرجاء تسجيل الدخول.' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)
  const offset = Number(searchParams.get('offset')) || 0
  const status = searchParams.get('status')
  const category = searchParams.get('category')

  try {
    const where: Record<string, unknown> = { userId: session.userId as string }
    if (status) where.status = status
    if (category) where.category = category

    const [data, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          bot: { select: { name: true } },
          _count: { select: { messages: true } },
        },
      }),
      prisma.ticket.count({ where }),
    ])
    return NextResponse.json({ success: true, data, total })
  } catch (error) {
    console.error('[TICKETS_LIST]', error)
    return NextResponse.json({ success: false, error: 'فشل تحميل التذاكر' }, { status: 500 })
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
    const parsed = ticketSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
    }

    const ticket = await prisma.ticket.create({
      data: {
        userId: session.userId as string,
        subject: parsed.data.subject,
        description: parsed.data.description || null,
        category: parsed.data.category || 'other',
        priority: parsed.data.priority || 'medium',
      },
    })
    return NextResponse.json({ success: true, data: ticket }, { status: 201 })
  } catch (error) {
    console.error('[TICKETS_CREATE]', error)
    return NextResponse.json({ success: false, error: 'فشل إنشاء التذكرة' }, { status: 500 })
  }
}
