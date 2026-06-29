'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Bot, ShoppingBag, Utensils, Headphones } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GovernorateSelector } from '@/components/shared/GovernorateSelector'
import { CurrencyToggle } from '@/components/shared/CurrencyToggle'

const navItems = [
  {
    label: 'البوتات',
    href: '/directory',
    icon: Bot,
    children: [
      { label: 'بوتات تليجرام', href: '/directory?filter=bots' },
      { label: 'قنوات تليجرام', href: '/directory?filter=channels' },
      { label: 'مجموعات تليجرام', href: '/directory?filter=groups' },
    ],
  },
  {
    label: 'المطاعم',
    href: '/restaurants',
    icon: Utensils,
  },
  {
    label: 'المتاجر',
    href: '/stores',
    icon: ShoppingBag,
  },
  {
    label: 'خدمة العملاء',
    href: '/support',
    icon: Headphones,
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-dark-border bg-dark-primary/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">ش</span>
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">
              <span className="gradient-text">شام</span>
              <span className="text-white">بوتس</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-dark-tertiary transition-all"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full right-0 mt-1 w-48 glass rounded-xl p-2 shadow-xl border border-white/10">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-dark-tertiary transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <CurrencyToggle />
            <GovernorateSelector />

            <Link href="/auth/login" className="hidden sm:block btn-primary text-sm !py-2 !px-4">
              تسجيل الدخول
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-tertiary transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass border-t border-white/10 animate-slide-up">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-dark-tertiary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-dark-tertiary mr-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/auth/login"
              className="block btn-primary text-sm !py-2 !px-4 text-center mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
