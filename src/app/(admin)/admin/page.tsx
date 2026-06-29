'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Bot, Store, ShoppingBag, Wallet, TrendingUp, MapPin, Headphones, Settings, Activity, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  { label: 'المستخدمين', value: '1,234', icon: Users, href: '/admin/users', color: 'from-blue-500 to-cyan-500', change: '+12%' },
  { label: 'البوتات', value: '56', icon: Bot, href: '/admin/bots', color: 'from-purple-500 to-pink-500', change: '+8%' },
  { label: 'المطاعم', value: '23', icon: Store, href: '/admin/restaurants', color: 'from-orange-500 to-red-500', change: '+15%' },
  { label: 'الطلبات', value: '189', icon: ShoppingBag, href: '/admin/orders', color: 'from-green-500 to-emerald-500', change: '+23%' },
  { label: 'الإيرادات', value: '2.5M ل.س', icon: Wallet, href: '/admin/finance', color: 'from-amber-500 to-yellow-500', change: '+18%' },
  { label: 'المحافظات', value: '14', icon: MapPin, href: '/admin/governorates', color: 'from-teal-500 to-cyan-500', change: '100%' },
]

const recentActivities = [
  { action: 'مستخدم جديد', detail: 'محمد أحمد سجل في المنصة', time: 'قبل 5 دقائق', type: 'user' },
  { action: 'بوت جديد', detail: 'تم إنشاء بوت متجر إلكتروني', time: 'قبل 15 دقيقة', type: 'bot' },
  { action: 'طلب جديد', detail: 'طلب #SHAM-001 بقيمة 75,000 ل.س', time: 'قبل 30 دقيقة', type: 'order' },
  { action: 'دفع', detail: 'تأكيد دفع نقدي من المندوب', time: 'قبل ساعة', type: 'payment' },
  { action: 'مندوب جديد', detail: 'تم تسجيل مندوب جديد في دمشق', time: 'قبل ساعتين', type: 'agent' },
]

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-6 h-6 text-primary-400" />
              <h1 className="font-heading text-3xl font-bold text-white">لوحة الإدارة</h1>
            </div>
            <p className="text-gray-400">مرحباً بك أيها المدير. جميع المؤشرات في مكان واحد.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Activity className="w-4 h-4 text-green-400" />
            النظام يعمل بكفاءة
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <div className="glass-card !p-4 card-hover">
                <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3', stat.color)}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-heading font-bold gradient-text">{stat.value}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">{stat.label}</span>
                  <span className="text-[10px] text-green-400">{stat.change}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 glass-card">
            <h2 className="font-heading font-bold text-lg text-white mb-4">إجراءات سريعة</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'إدارة المستخدمين', icon: Users, href: '/admin/users', color: 'text-blue-400' },
                { label: 'إدارة البوتات', icon: Bot, href: '/admin/bots', color: 'text-purple-400' },
                { label: 'المحافظات', icon: MapPin, href: '/admin/governorates', color: 'text-teal-400' },
                { label: 'التقارير', icon: TrendingUp, href: '/admin/analytics', color: 'text-green-400' },
                { label: 'الإعدادات', icon: Settings, href: '/admin/settings', color: 'text-gray-400' },
                { label: 'المندوبين', icon: Users, href: '/admin/agents', color: 'text-amber-400' },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-tertiary hover:bg-dark-border transition-all cursor-pointer">
                    <action.icon className={cn('w-5 h-5', action.color)} />
                    <span className="text-sm text-gray-300">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card">
            <h2 className="font-heading font-bold text-lg text-white mb-4">آخر النشاطات</h2>
            <div className="space-y-3">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-dark-border last:border-0">
                  <div className={cn(
                    'w-2 h-2 rounded-full mt-1.5',
                    activity.type === 'user' ? 'bg-blue-400' :
                    activity.type === 'bot' ? 'bg-purple-400' :
                    activity.type === 'order' ? 'bg-green-400' :
                    activity.type === 'payment' ? 'bg-amber-400' : 'bg-teal-400'
                  )} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.detail}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
