'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Bot, Plus, ExternalLink } from 'lucide-react'

export default function DashboardBotsPage() {
  const [bots, setBots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const userRes = await fetch('/api/v1/auth/me')
        if (!userRes.ok) throw new Error('فشل في تحميل البيانات')
        const userData = await userRes.json()
        if (!userData?.id) throw new Error('لم يتم العثور على معرف المستخدم')

        const botsRes = await fetch(`/api/v1/bots?userId=${userData.id}`)
        if (!botsRes.ok) throw new Error('فشل في تحميل البوتات')
        const botsData = await botsRes.json()
        setBots(botsData.data ?? [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBots()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-gray-400">جاري تحميل البوتات...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-red-400 mb-2">حدث خطأ في تحميل البوتات</p>
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
            <h1 className="font-heading text-3xl font-bold text-white">البوتات</h1>
            <p className="text-gray-400 mt-1">إدارة بوتاتك الذكية</p>
          </div>
          <Link href="/dashboard/bots/new" className="btn-primary">
            <Plus className="w-4 h-4 ml-2 inline-block" />
            بوت جديد
          </Link>
        </div>

        {bots.length === 0 ? (
          <div className="glass-card text-center !py-16">
            <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-xl text-white mb-2">لا توجد بوتات بعد</h3>
            <p className="text-gray-400 mb-6">أنشئ أول بوت ذكي لخدمتك</p>
            <Link href="/dashboard/bots/new" className="btn-primary">
              <Plus className="w-4 h-4 ml-2 inline-block" />
              إنشاء بوت
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bots.map((bot) => (
              <div key={bot.id} className="glass-card flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white">{bot.name}</h3>
                    <p className="text-sm text-gray-400">{bot.type} · {bot.platform}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${bot.status === 'active' ? 'bg-secondary-500/20 text-secondary-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {bot.status === 'active' ? 'نشط' : 'مسودة'}
                  </span>
                  <Link href={`/dashboard/bots/studio`} className="text-primary-400 hover:text-primary-300">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
