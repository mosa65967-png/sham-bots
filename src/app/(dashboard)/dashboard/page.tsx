'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Bot, ShoppingBag, Headphones, Wallet, Settings, Plus, TrendingUp, Users, MessageCircle } from 'lucide-react'

const quickStats = [
  { label: 'البوتات النشطة', value: '0', icon: Bot, color: 'from-primary-500 to-purple-600' },
  { label: 'الطلبات', value: '0', icon: ShoppingBag, color: 'from-secondary-500 to-green-600' },
  { label: 'تذاكر الدعم', value: '0', icon: Headphones, color: 'from-orange-500 to-red-500' },
  { label: 'رصيد المحفظة', value: '0 ل.س', icon: Wallet, color: 'from-blue-500 to-cyan-500' },
]

const quickActions = [
  { label: 'إنشاء بوت جديد', href: '/dashboard/bots/new', icon: Plus, color: 'text-primary-400' },
  { label: 'إضافة منتج', href: '/dashboard/merchant/products/new', icon: ShoppingBag, color: 'text-secondary-400' },
  { label: 'عرض التذاكر', href: '/dashboard/tickets', icon: Headphones, color: 'text-orange-400' },
  { label: 'شحن المحفظة', href: '/dashboard/wallet', icon: Wallet, color: 'text-blue-400' },
]

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-white">
            مرحباً بك في <span className="gradient-text">لوحة التحكم</span>
          </h1>
          <p className="text-gray-400 mt-2">إدارة أعمالك الرقمية من مكان واحد</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat) => (
            <div key={stat.label} className="glass-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold gradient-text">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="font-heading font-bold text-xl text-white mb-4">إجراءات سريعة</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="glass-card flex items-center gap-3 !p-4 card-hover">
                  <div className="w-10 h-10 rounded-xl bg-dark-tertiary flex items-center justify-center">
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <span className="text-sm text-gray-300">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Empty States */}
        <div className="glass-card text-center !py-16">
          <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="font-heading font-bold text-xl text-white mb-2">ابدأ رحلتك الرقمية</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            أنشئ أول بوت ذكي، أو أضف منتجاً لمتجرك، أو سجل قناتك في الدليل
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard/bots/new" className="btn-primary">
              <Plus className="inline-block w-4 h-4 ml-2" />
              إنشاء بوت جديد
            </Link>
            <Link href="/directory" className="btn-secondary">
              استعرض الخدمات
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
