'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Bot, Plus, ExternalLink, Settings } from 'lucide-react'

const mockBots = [
  { id: 'b1', name: 'بوت المتجر', platform: 'telegram', status: 'active', createdAt: '2026-06-01', type: 'متجر إلكتروني' },
  { id: 'b2', name: 'بوت خدمة العملاء', platform: 'whatsapp', status: 'draft', createdAt: '2026-06-15', type: 'خدمة عملاء' },
]

export default function DashboardBotsPage() {
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

        {mockBots.length === 0 ? (
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
            {mockBots.map((bot) => (
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
