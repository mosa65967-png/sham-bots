'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Bot, ShoppingBag, Headphones, Wallet,
  Settings, Menu, X, ChevronLeft, Store, MessageCircle, Utensils
} from 'lucide-react'

const sidebarLinks = [
  { label: 'الرئيسية', href: '/dashboard', icon: LayoutDashboard },
  { label: 'البوتات', href: '/dashboard/bots', icon: Bot },
  { label: 'المتجر', href: '/dashboard/merchant', icon: Store },
  { label: 'الطلبات', href: '/dashboard/orders', icon: ShoppingBag },
  { label: 'الدعم', href: '/dashboard/tickets', icon: Headphones },
  { label: 'المحفظة', href: '/dashboard/wallet', icon: Wallet },
  { label: 'الإعدادات', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30 flex items-center justify-center"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] w-64 glass border-l border-white/10 transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      )}>
        <div className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all',
                pathname === link.href
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-dark-tertiary'
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-dark-tertiary">
          <p className="text-xs text-gray-500">الباقة الحالية</p>
          <p className="font-heading font-bold text-white text-sm">مجاني</p>
          <Link href="/pricing" className="text-xs text-primary-400 hover:text-primary-300 mt-1 inline-block">
            ترقية الباقة
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:mr-64 min-h-screen">
        {children}
      </div>
    </div>
  )
}
