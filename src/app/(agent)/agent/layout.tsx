'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, ListTodo, Wallet, Settings, Menu, X } from 'lucide-react'

const sidebarLinks = [
  { label: 'الرئيسية', href: '/agent', icon: LayoutDashboard },
  { label: 'التحصيلات', href: '/agent/collections', icon: ListTodo },
  { label: 'المحفظة', href: '/agent/wallet', icon: Wallet },
  { label: 'الإعدادات', href: '/agent/settings', icon: Settings },
]

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark-primary">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/30 flex items-center justify-center"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside className={cn(
        'fixed top-16 right-0 z-40 h-[calc(100vh-4rem)] w-64 glass border-l border-white/10 transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      )}>
        <div className="p-4">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm">م</div>
            <div>
              <p className="text-sm text-white font-medium">مندوب</p>
              <p className="text-[10px] text-amber-400">متحقق منه</p>
            </div>
          </div>
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all',
                  pathname === link.href
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-dark-tertiary'
                )}
              >
                <link.icon className="w-5 h-5" />
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
