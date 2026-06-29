'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, CheckCircle, Clock, DollarSign, MapPin, Phone, User, QrCode, TrendingUp, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OrderItem {
  productId: string
  quantity: number
  priceSyp: number
  name?: string
}

interface AgentOrder {
  id: string
  orderNumber: string
  totalSyp: number
  status: string
  createdAt: string
  collectionAgentId: string | null
  shippingAddress: string | null
  notes: string | null
  user: { nameAr: string; phone: string }
  store: { name: string }
  items: OrderItem[]
}

export default function AgentPage() {
  const [orders, setOrders] = useState<AgentOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'collected'>('pending')
  const [showQR, setShowQR] = useState<string | null>(null)
  const [scanMode, setScanMode] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/v1/orders')
        if (!res.ok) throw new Error('فشل في تحميل الطلبات')
        const data = await res.json()
        setOrders(data.data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const pendingOrders = orders.filter(o => o.status === 'pending')
  const collectedOrders = orders.filter(o => o.status === 'collected' || o.status === 'completed')

  const filteredOrders = activeTab === 'pending' ? pendingOrders : collectedOrders

  const pendingTotal = pendingOrders.reduce((s, o) => s + o.totalSyp, 0)
  const collectedToday = collectedOrders.reduce((s, o) => s + o.totalSyp, 0)

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-red-400 mb-2">حدث خطأ في تحميل البيانات</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">لوحة المندوب</h1>
            <p className="text-gray-400">مرحباً بك! طلبات التحصيل في منطقتك</p>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'معلق', value: loading ? '-' : pendingOrders.length, icon: Clock, color: 'from-yellow-500 to-amber-500' },
          { label: 'محصل اليوم', value: loading ? '-' : collectedOrders.length, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
          { label: 'مبلغ التحصيل', value: loading ? '-' : `${collectedToday.toLocaleString()} ل.س`, icon: DollarSign, color: 'from-blue-500 to-cyan-500' },
          { label: 'العمولة', value: loading ? '-' : `${(collectedToday * 0.1).toLocaleString()} ل.س`, icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card !p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center', stat.color)}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-2xl font-heading font-bold gradient-text">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setScanMode(!scanMode)}
        className={cn('w-full glass-card !p-4 mb-6 flex items-center justify-center gap-3 card-hover', scanMode && 'border-primary-500/50')}
      >
        <QrCode className={cn('w-6 h-6', scanMode ? 'text-primary-400' : 'text-gray-400')} />
        <span className={cn('font-medium', scanMode ? 'text-primary-400' : 'text-gray-300')}>
          {scanMode ? 'امسح QR العميل لتأكيد الدفع' : 'اضغط لفتح ماسح QR'}
        </span>
      </button>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={cn('px-6 py-2.5 rounded-xl text-sm font-medium transition-all', activeTab === 'pending' ? 'bg-primary-500 text-white' : 'glass text-gray-400')}
        >
          معلقة
        </button>
        <button
          onClick={() => setActiveTab('collected')}
          className={cn('px-6 py-2.5 rounded-xl text-sm font-medium transition-all', activeTab === 'collected' ? 'bg-primary-500 text-white' : 'glass text-gray-400')}
        >
          محصلة
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card animate-pulse">
              <div className="h-24 bg-dark-tertiary rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="glass-card text-center !py-12">
          <p className="text-gray-400">
            {activeTab === 'pending' ? 'لا توجد طلبات معلقة حالياً' : 'لا توجد طلبات محصلة بعد'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-bold text-white">{order.orderNumber}</span>
                    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold',
                      order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    )}>
                      {order.status === 'pending' ? 'معلق' : 'تم التحصيل'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{order.user.nameAr}</p>
                </div>
                <span className="font-heading font-bold text-lg gradient-text">
                  {order.totalSyp.toLocaleString()} ل.س
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {order.user.phone}
                </span>
                {order.shippingAddress && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {order.shippingAddress}
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-500 mb-3">
                {order.items.map((item: OrderItem) => `${item.name || item.productId} x${item.quantity}`).join('، ')}
              </div>

              {order.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowQR(order.id)}
                    className="flex-1 btn-primary !py-2 text-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    تأكيد التحصيل
                  </button>
                  <button className="btn-secondary !py-2 text-sm">
                    إلغاء
                  </button>
                </div>
              )}

              {showQR === order.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-dark-border"
                >
                  <div className="glass rounded-xl p-4 text-center bg-dark-tertiary">
                    <div className="w-32 h-32 rounded-xl bg-white mx-auto mb-3 flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-800" />
                    </div>
                    <p className="text-sm text-gray-300 mb-1">اطلب من العميل مسح هذا الكود</p>
                    <p className="text-xs text-gray-500">أو أدخل رمز التأكيد</p>
                    <div className="flex gap-2 mt-3 justify-center" dir="ltr">
                      {[1,2,3,4].map((i) => (
                        <input key={i} maxLength={1} className="w-10 h-12 text-center text-lg font-bold bg-dark-secondary border border-dark-border rounded-lg text-white" />
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => { setShowQR(null) }}
                        className="flex-1 btn-primary !py-2 text-sm"
                      >
                        تأكيد الدفع
                      </button>
                      <button
                        onClick={() => setShowQR(null)}
                        className="btn-secondary !py-2 text-sm"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
