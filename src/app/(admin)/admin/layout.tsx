'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, Bot, Store, ShoppingBag, Wallet, MapPin, Headphones,
  TrendingUp, Settings, Shield, Menu, X, UserCog
} from 'lucide-react'

const sidebarLinks = [
  { label: 'الرئيسية', href: '/admin', icon: LayoutDashboard },
  { label: 'المستخدمين', href: '/admin/users', icon: Users },
  { label: 'البوتات', href: '/admin/bots', icon: Bot },
  { label: 'المطاعم', href: '/admin/restaurants', icon: Store },
  { label: 'المتاجر', href: '/admin/stores', icon: ShoppingBag },
  { label: 'الطلبات', href: '/admin/orders', icon: ShoppingBag },
  { label: 'المحافظات', href: '/admin/governorates', icon: MapPin },
  { label: 'المندوبين', href: '/admin/agents', icon: UserCog },
  { label: 'الدعم', href: '/admin/tickets', icon: Headphones },
  { label: 'المالية', href: '/admin/finance', icon: Wallet },
  { label: 'التقارير', href: '/admin/analytics', icon: TrendingUp },
  { label: 'الإعدادات', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark-primary">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 flex items-center justify-center"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside className={cn(
        'fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] w-64 glass border-l border-white/10 overflow-y-auto transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      )}>
        <div className="p-4">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <Shield className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-sm text-white font-medium">الإدارة</p>
              <p className="text-[10px] text-red-400">صلاحية كاملة</p>
            </div>
          </div>
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all',
                  pathname === link.href
                    ? 'bg-red-500/20 text-red-400 border border-red-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-dark-tertiary'
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <div className="lg:mr-64 min-h-screen">
        {children}
      </div>
    </div>
  )
}
