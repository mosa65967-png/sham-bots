import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'production') {
      const token = request.cookies.get('session')?.value || request.cookies.get('next-auth.session-token')?.value || request.cookies.get('__Secure-next-auth.session-token')?.value
      const session = token ? await verifySession(token) : null
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
