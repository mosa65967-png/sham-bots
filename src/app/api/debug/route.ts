import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const userCount = await prisma.user.count()
    const user = await prisma.user.findFirst({ take: 1 })
    const columns = user ? Object.keys(user) : []
    return NextResponse.json({
      status: 'ok',
      userCount,
      userColumns: columns,
      hasOtpCode: columns.includes('otpCode'),
      env: process.env.NODE_ENV,
    })
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
  }
}
