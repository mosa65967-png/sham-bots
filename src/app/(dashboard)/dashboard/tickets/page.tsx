'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Headphones, MessageCircle, Plus } from 'lucide-react'

export default function DashboardTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userRes = await fetch('/api/v1/auth/me')
        if (!userRes.ok) throw new Error('فشل في تحميل البيانات')
        const userData = await userRes.json()

        const ticketsRes = await fetch(`/api/v1/tickets?userId=${userData.id}`)
        if (ticketsRes.ok) {
          const ticketsData = await ticketsRes.json()
          setTickets(ticketsData.data ?? [])
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-gray-400">جاري تحميل التذاكر...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-red-400 mb-2">حدث خطأ في تحميل التذاكر</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white">الدعم</h1>
            <p className="text-gray-400 mt-1">تذاكر الدعم والمساعدة</p>
          </div>
          <a href="/support" className="btn-primary">
            <Plus className="w-4 h-4 ml-2 inline-block" />
            تذكرة جديدة
          </a>
        </div>

        {tickets.length === 0 ? (
          <div className="glass-card text-center !py-16">
            <Headphones className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-xl text-white mb-2">لا توجد تذاكر</h3>
            <p className="text-gray-400">إذا احتجت مساعدة، يمكنك فتح تذكرة دعم جديدة</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="glass-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-white font-medium">{t.subject}</p>
                    <p className="text-xs text-gray-500">{t.messages} رسائل · {t.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${t.status === 'open' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {t.status === 'open' ? 'مفتوحة' : 'قيد المعالجة'}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
