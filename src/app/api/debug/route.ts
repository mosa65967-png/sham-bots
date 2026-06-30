import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'production') {
      const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
      if (!session || session.role !== 'admin') {
        return NextResponse.json({ status: 'unauthorized' }, { status: 403 })
      }
    }

    const userCount = await prisma.user.count()
    return NextResponse.json({ status: 'ok', userCount, env: process.env.NODE_ENV })
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
  }
}
