import Link from 'next/link'
import { Bot, Utensils, ShoppingBag, Headphones, MapPin } from 'lucide-react'

const footerLinks = {
  'الخدمات': [
    { label: 'بوتات تليجرام', href: '/directory?filter=bots' },
    { label: 'قنوات تليجرام', href: '/directory?filter=channels' },
    { label: 'QR Menu', href: '/restaurants' },
    { label: 'خدمة العملاء', href: '/support' },
  ],
  'التجارة': [
    { label: 'متجر إلكتروني', href: '/stores' },
    { label: 'تسعير الباقات', href: '/pricing' },
    { label: 'لوحة التحكم', href: '/dashboard' },
  ],
  'الدعم': [
    { label: 'مركز المساعدة', href: '/support' },
    { label: 'الأسئلة الشائعة', href: '/faq' },
    { label: 'اتصل بنا', href: '/contact' },
    { label: 'شروط الخدمة', href: '/terms' },
  ],
  'روابط سريعة': [
    { label: 'دليل تليجرام', href: '/directory' },
    { label: 'المطاعم', href: '/restaurants' },
    { label: 'المتاجر', href: '/stores' },
    { label: 'الأسعار', href: '/pricing' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading font-bold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-dark-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">ش</span>
              </div>
              <span className="text-gray-400 text-sm">
                © 2026 شام بوتس. جميع الحقوق محفوظة.
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <span>منصة سورية رقمية 🇸🇾</span>
              <span>|</span>
              <span>14 محافظة</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
