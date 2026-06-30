'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-blue-500/20 text-blue-400',
  delivered: 'bg-secondary-500/20 text-secondary-400',
  cancelled: 'bg-red-500/20 text-red-400',
}

const statusLabels: Record<string, string> = {
  pending: 'قيد الانتظار',
  confirmed: 'مؤكد',
  delivered: 'مكتمل',
  cancelled: 'ملغي',
}

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userRes = await fetch('/api/v1/auth/me')
        if (!userRes.ok) throw new Error('فشل في تحميل البيانات')
        const userData = await userRes.json()
        if (!userData?.id) throw new Error('لم يتم العثور على معرف المستخدم')

        const ordersRes = await fetch(`/api/v1/orders?userId=${userData.id}`)
        if (!ordersRes.ok) throw new Error('فشل في تحميل الطلبات')
        const ordersData = await ordersRes.json()
        setOrders(Array.isArray(ordersData?.data) ? ordersData.data : Array.isArray(ordersData) ? ordersData : [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const stats = [
    { label: 'الكل', value: orders.length },
    { label: 'قيد الانتظار', value: orders.filter((o) => o.status === 'pending').length },
    { label: 'مؤكدة', value: orders.filter((o) => o.status === 'confirmed').length },
    { label: 'مكتملة', value: orders.filter((o) => o.status === 'delivered').length },
  ]

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-gray-400">جاري تحميل الطلبات...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-red-400 mb-2">حدث خطأ في تحميل الطلبات</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-white">الطلبات</h1>
          <p className="text-gray-400 mt-1">متابعة وإدارة طلباتك</p>
        </div>

        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass-card text-center">
              <div className="text-2xl font-heading font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="glass-card text-center !py-16">
            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-xl text-white mb-2">لا توجد طلبات بعد</h3>
            <p className="text-gray-400">عندما يتم تقديم طلب جديد، سيظهر هنا</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="glass-card flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-dark-tertiary flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium">{order.id}</span>
                      <span className={cn('px-2 py-0.5 rounded text-[10px]', statusStyles[order.status])}>{statusLabels[order.status]}</span>
                    </div>
                    <p className="text-xs text-gray-400">{order.customer ?? '—'} · {order.items ?? 0} منتجات · {(order.total ?? 0).toLocaleString()} ل.س</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{order.date ?? '—'}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
