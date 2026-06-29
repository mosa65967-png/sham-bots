import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const messages = await prisma.ticketMessage.findMany({
      where: { ticketId: id },
      include: {
        sender: { select: { nameAr: true, role: true } },
      },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    console.error('[TICKET_MESSAGES]', error)
    return NextResponse.json({ success: true, data: [] })
  }
}
