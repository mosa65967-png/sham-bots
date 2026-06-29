import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        user: { select: { nameAr: true, phone: true } },
        assignee: { select: { nameAr: true } },
        bot: { select: { name: true } },
        messages: {
          include: { sender: { select: { nameAr: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!ticket) {
      return NextResponse.json({ success: false, error: 'التذكرة غير موجودة' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: ticket })
  } catch (error) {
    console.error('[TICKET_GET]', error)
    return NextResponse.json({ success: false, error: 'فشل تحميل التذكرة' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const token = request.cookies.get('session')?.value
    const session = token ? await verifySession(token) : null
    if (!session) {
      return NextResponse.json({ success: false, error: 'غير مصرح. الرجاء تسجيل الدخول.' }, { status: 401 })
    }

    const body = await request.json()
    const { message, attachments } = body

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'الرسالة مطلوبة' }, { status: 400 })
    }

    const ticket = await prisma.ticket.findUnique({ where: { id } })
    if (!ticket) {
      return NextResponse.json({ success: false, error: 'التذكرة غير موجودة' }, { status: 404 })
    }

    const ticketMessage = await prisma.ticketMessage.create({
      data: {
        ticketId: id,
        senderId: session.userId as string,
        senderType: session.role === 'admin' || session.role === 'agent' ? 'agent' : 'user',
        message: message.trim(),
        attachments: attachments || [],
      },
    })

    if (!ticket.firstResponseAt && session.role !== 'user') {
      await prisma.ticket.update({
        where: { id },
        data: { firstResponseAt: new Date() },
      })
    }

    return NextResponse.json({ success: true, data: ticketMessage }, { status: 201 })
  } catch (error) {
    console.error('[TICKET_REPLY]', error)
    return NextResponse.json({ success: false, error: 'فشل إرسال الرد' }, { status: 500 })
  }
}
