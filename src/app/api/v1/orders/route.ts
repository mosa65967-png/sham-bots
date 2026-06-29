import { NextResponse } from 'next/server'
import { generateOrderNumber } from '@/lib/utils'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [],
    total: 0,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const order = {
      id: crypto.randomUUID(),
      orderNumber: generateOrderNumber(),
      ...body,
      status: 'pending',
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: order,
      message: 'تم إنشاء الطلب بنجاح',
    }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
