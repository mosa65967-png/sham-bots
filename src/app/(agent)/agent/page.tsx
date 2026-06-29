'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, CheckCircle, Clock, DollarSign, MapPin, Phone, User, QrCode, TrendingUp, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PendingOrder {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  address: string
  amount: number
  items: string[]
  status: 'pending' | 'collected' | 'cancelled'
  createdAt: string
}

const mockOrders: PendingOrder[] = [
  { id: 'o1', orderNumber: 'SHAM-001', customerName: 'محمد أحمد', customerPhone: '0934567890', address: 'دمشق، المزة، شارع بغداد', amount: 75000, items: ['دجاج على الفحم x2', 'حمص x1'], status: 'pending', createdAt: '2026-06-29T10:30:00' },
  { id: 'o2', orderNumber: 'SHAM-002', customerName: 'سارة خالد', customerPhone: '0945678901', address: 'دمشق، البرامكة', amount: 45000, items: ['بيتزا مارغريتا x1', 'كولا x2'], status: 'pending', createdAt: '2026-06-29T11:00:00' },
  { id: 'o3', orderNumber: 'SHAM-003', customerName: 'أحمد علي', customerPhone: '0956789012', address: 'دمشق، الشعلان', amount: 120000, items: ['مندي لحم x1', 'كنافة x2'], status: 'collected', createdAt: '2026-06-29T09:00:00' },
]

export default function AgentPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'collected'>('pending')
  const [showQR, setShowQR] = useState<string | null>(null)
  const [scanMode, setScanMode] = useState(false)

  const filteredOrders = mockOrders.filter(o =>
    activeTab === 'pending' ? o.status === 'pending' : o.status === 'collected'
  )

  const pendingTotal = mockOrders.filter(o => o.status === 'pending').reduce((s, o) => s + o.amount, 0)
  const collectedToday = mockOrders.filter(o => o.status === 'collected').reduce((s, o) => s + o.amount, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
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

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'معلق', value: mockOrders.filter(o => o.status === 'pending').length, icon: Clock, color: 'from-yellow-500 to-amber-500' },
          { label: 'محصل اليوم', value: mockOrders.filter(o => o.status === 'collected').length, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
          { label: 'مبلغ التحصيل', value: `${collectedToday.toLocaleString()} ل.س`, icon: DollarSign, color: 'from-blue-500 to-cyan-500' },
          { label: 'العمولة', value: `${(collectedToday * 0.1).toLocaleString()} ل.س`, icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
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

      {/* Scan QR Button */}
      <button
        onClick={() => setScanMode(!scanMode)}
        className={cn('w-full glass-card !p-4 mb-6 flex items-center justify-center gap-3 card-hover', scanMode && 'border-primary-500/50')}
      >
        <QrCode className={cn('w-6 h-6', scanMode ? 'text-primary-400' : 'text-gray-400')} />
        <span className={cn('font-medium', scanMode ? 'text-primary-400' : 'text-gray-300')}>
          {scanMode ? 'امسح QR العميل لتأكيد الدفع' : 'اضغط لفتح ماسح QR'}
        </span>
      </button>

      {/* Tabs */}
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

      {/* Orders List */}
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
                <p className="text-sm text-gray-400">{order.customerName}</p>
              </div>
              <span className="font-heading font-bold text-lg gradient-text">
                {order.amount.toLocaleString()} ل.س
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {order.customerPhone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {order.address}
              </span>
            </div>

            <div className="text-xs text-gray-500 mb-3">
              {order.items.join('، ')}
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

            {/* QR Confirmation Modal */}
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
    </div>
  )
}
