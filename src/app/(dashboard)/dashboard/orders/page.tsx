'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Package, Eye, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const mockOrders = [
  { id: 'ORD-001', customer: 'أحمد محمود', items: 3, total: 85000, status: 'pending', date: '2026-06-29', type: 'store' },
  { id: 'ORD-002', customer: 'سارة خالد', items: 5, total: 120000, status: 'confirmed', date: '2026-06-28', type: 'restaurant' },
  { id: 'ORD-003', customer: 'محمد علي', items: 1, total: 45000, status: 'delivered', date: '2026-06-27', type: 'restaurant' },
  { id: 'ORD-004', customer: 'نور حسن', items: 2, total: 35000, status: 'cancelled', date: '2026-06-26', type: 'store' },
]

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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-white">الطلبات</h1>
          <p className="text-gray-400 mt-1">متابعة وإدارة طلباتك</p>
        </div>

        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[{ label: 'الكل', value: mockOrders.length }, { label: 'قيد الانتظار', value: 1 }, { label: 'مؤكدة', value: 1 }, { label: 'مكتملة', value: 1 }].map((s) => (
            <div key={s.label} className="glass-card text-center">
              <div className="text-2xl font-heading font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {mockOrders.map((order) => (
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
                  <p className="text-xs text-gray-400">{order.customer} · {order.items} منتجات · {order.total.toLocaleString()} ل.س</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{order.date}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
