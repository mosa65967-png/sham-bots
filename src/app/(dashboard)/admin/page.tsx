'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Bot, ShoppingCart, Store, Building2, Ticket, CircleDollarSign, TrendingUp, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminStats {
  totalUsers: number
  totalBots: number
  totalOrders: number
  totalRestaurants: number
  totalStores: number
  totalTickets: number
  revenueSyp: number
  usersByRole: { role: string; _count: number }[]
  recentOrders: { id: string; orderNumber: string; totalSyp: number; status: string; createdAt: string; user: { nameAr: string }; store: { name: string } }[]
  ordersByStatus: { status: string; _count: number }[]
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/v1/admin/stats')
        if (!res.ok) throw new Error('فشل في تحميل الإحصائيات')
        const data = await res.json()
        if (!data.success) throw new Error(data.error || 'فشل في تحميل الإحصائيات')
        setStats(data.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: 'المستخدمين', value: stats?.totalUsers ?? 0, icon: Users, color: 'from-primary-500 to-purple-600' },
    { label: 'البوتات', value: stats?.totalBots ?? 0, icon: Bot, color: 'from-secondary-500 to-green-600' },
    { label: 'الطلبات', value: stats?.totalOrders ?? 0, icon: ShoppingCart, color: 'from-orange-500 to-red-500' },
    { label: 'المطاعم', value: stats?.totalRestaurants ?? 0, icon: Building2, color: 'from-blue-500 to-cyan-500' },
    { label: 'المتاجر', value: stats?.totalStores ?? 0, icon: Store, color: 'from-emerald-500 to-teal-500' },
    { label: 'التذاكر', value: stats?.totalTickets ?? 0, icon: Ticket, color: 'from-pink-500 to-rose-500' },
  ]

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-red-400 mb-2">حدث خطأ في تحميل البيانات</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card animate-pulse">
              <div className="h-20 bg-dark-tertiary rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-gray-400">لا توجد بيانات متاحة</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-white">
            لوحة <span className="gradient-text">المشرف</span>
          </h1>
          <p className="text-gray-400 mt-2">إحصائيات عامة للمنصة</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statCards.map((stat) => (
            <div key={stat.label} className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center', stat.color)}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold gradient-text">
                  {stat.value.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-4">
              <CircleDollarSign className="w-5 h-5 text-green-400" />
              <h2 className="font-heading font-bold text-lg text-white">الإيرادات</h2>
            </div>
            <div className="text-3xl font-heading font-bold gradient-text">
              {stats.revenueSyp.toLocaleString()} ل.س
            </div>
            <p className="text-xs text-gray-500 mt-1">إجمالي الطلبات (غير الملغية)</p>
          </div>

          <div className="glass-card">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary-400" />
              <h2 className="font-heading font-bold text-lg text-white">المستخدمين حسب الدور</h2>
            </div>
            <div className="space-y-2">
              {stats.usersByRole.length > 0 ? stats.usersByRole.map((item) => (
                <div key={item.role} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{item.role === 'admin' ? 'مشرف' : item.role === 'agent' ? 'مندوب' : item.role === 'merchant' ? 'تاجر' : 'مستخدم'}</span>
                  <span className="text-sm font-bold text-white">{item._count}</span>
                </div>
              )) : (
                <p className="text-sm text-gray-500">لا توجد بيانات</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-orange-400" />
              <h2 className="font-heading font-bold text-lg text-white">آخر الطلبات</h2>
            </div>
            <div className="space-y-3">
              {stats.recentOrders.length > 0 ? stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-dark-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white">{order.orderNumber}</p>
                    <p className="text-xs text-gray-500">{order.user.nameAr} - {order.store.name}</p>
                  </div>
                  <span className="text-sm font-bold text-green-400">{order.totalSyp.toLocaleString()} ل.س</span>
                </div>
              )) : (
                <p className="text-sm text-gray-500">لا توجد طلبات</p>
              )}
            </div>
          </div>

          <div className="glass-card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h2 className="font-heading font-bold text-lg text-white">حالة الطلبات</h2>
            </div>
            <div className="space-y-2">
              {stats.ordersByStatus.length > 0 ? stats.ordersByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    {item.status === 'pending' ? 'معلق' : item.status === 'processing' ? 'قيد المعالجة' : item.status === 'completed' ? 'مكتمل' : item.status === 'cancelled' ? 'ملغي' : item.status}
                  </span>
                  <span className="text-sm font-bold text-white">{item._count}</span>
                </div>
              )) : (
                <p className="text-sm text-gray-500">لا توجد بيانات</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
