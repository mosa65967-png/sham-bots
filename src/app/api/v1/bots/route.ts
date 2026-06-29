import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [],
    message: 'قريباً - نظام البوتات قيد التطوير',
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      success: true,
      data: body,
      message: 'تم إنشاء البوت بنجاح',
    }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }
}
