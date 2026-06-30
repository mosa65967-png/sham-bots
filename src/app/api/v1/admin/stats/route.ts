import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  try {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'غير مصرح. صلاحيات المشرف مطلوبة.' }, { status: 403 })
    }

    const [
      totalUsers,
      totalBots,
      totalOrders,
      totalRestaurants,
      totalStores,
      totalTickets,
      revenueAgg,
      usersByRole,
      recentOrders,
      ordersByStatus,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.bot.count(),
      prisma.order.count(),
      prisma.restaurant.count(),
      prisma.store.count(),
      prisma.ticket.count(),
      prisma.order.aggregate({
        _sum: { totalSyp: true },
        where: { status: { not: 'cancelled' } },
      }),
      prisma.user.groupBy({
        by: ['role'],
        _count: true,
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { nameAr: true } },
          store: { select: { name: true } },
        },
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: true,
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalBots,
        totalOrders,
        totalRestaurants,
        totalStores,
        totalTickets,
        revenueSyp: revenueAgg._sum.totalSyp || 0,
        usersByRole,
        recentOrders,
        ordersByStatus,
      },
    })
  } catch (error) {
    console.error('[ADMIN_STATS]', error)
    return NextResponse.json({ success: false, error: 'فشل تحميل الإحصائيات' }, { status: 500 })
  }
}
