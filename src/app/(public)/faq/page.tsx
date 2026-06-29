'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Search, MessageCircle, CreditCard, Bot, ShoppingBag, Globe2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    category: 'عام',
    icon: Globe2,
    questions: [
      { q: 'ما هي منصة شام بوتس؟', a: 'شام بوتس هي أول منصة سورية رقمية متكاملة تجمع بوتات الذكاء الاصطناعي، دليل تليجرام، QR Menu للمطاعم، متجر إلكتروني، ونظام خدمة عملاء. تدعم جميع المحافظات السورية الـ14 بنظام دفع نقدي باليد.' },
      { q: 'هل المنصة مجانية؟', a: 'نعم، الباقة المجانية متاحة للجميع وتشمل بوت واحد أساسي ودليل تليجرام و QR Menu تجريبي. يمكنك الترقية لأي باقة احترافية لاحقاً.' },
      { q: 'هل أحتاج بطاقة ائتمان؟', a: 'لا أبداً. نقبل الدفع نقداً باليد عبر مندوبينا في جميع المحافظات السورية. الدفع الإلكتروني قيد التطوير.' },
    ],
  },
  {
    category: 'البوتات',
    icon: Bot,
    questions: [
      { q: 'ما أنواع البوتات المتوفرة؟', a: 'نوفر بوتات تليجرام وواتساب للرد التلقائي، المتاجر الإلكترونية، الحجوزات، خدمة العملاء، الألعاب، والاستفتاءات. كلها تدعم اللغة العربية والذكاء الاصطناعي.' },
      { q: 'هل يمكنني تصميم بوت مخصص؟', a: 'نعم، من خلال استوديو البوتات (Bot Studio) يمكنك تصميم بوتك بنظام السحب والإفلات بدون أي خبرة برمجية.' },
      { q: 'كم يستغرق تصميم البوت؟', a: 'البوتات الجاهزة تفعّل فوراً. التصميم المخصص يستغرق من ساعة إلى يوم حسب التعقيد.' },
    ],
  },
  {
    category: 'الدفع',
    icon: CreditCard,
    questions: [
      { q: 'كيف أدفع مقابل الخدمات؟', a: 'نقداً باليد عبر مندوبنا في محافظتك. نوصل للبيت في جميع المحافظات السورية الـ14.' },
      { q: 'هل تقبلون التحويل البنكي؟', a: 'نعم، نقبل التحويل البنكي داخل سوريا بالإضافة إلى Western Union.' },
      { q: 'متى سيتوفر الدفع الإلكتروني؟', a: 'نعمل على إضافة Stripe و PayPal قريباً لتغطية العملاء خارج سوريا.' },
    ],
  },
  {
    category: 'QR Menu',
    icon: ShoppingBag,
    questions: [
      { q: 'كيف يعمل QR Menu؟', a: 'نحول منيو مطعمك إلى صفحة رقمية مع QR كود. الزبون يمسح الكود، يشوف المنيو، ويطلب مباشرة عبر واتساب.' },
      { q: 'هل يمكن تحديث المنيو؟', a: 'نعم، يمكنك تحديث المنيو فوراً من لوحة التحكم. أي تعديل يظهر فوراً على QR كود.' },
    ],
  },
  {
    category: 'الدعم',
    icon: MessageCircle,
    questions: [
      { q: 'كيف أتواصل مع الدعم الفني؟', a: 'عبر صفحة خدمة العملاء، أو شات AI المباشر، أو عبر تليجرام أو واتساب.' },
      { q: 'ما أوقات الدعم؟', a: 'الدعم عبر AI متاح 24/7. الدعم البشري من 9 صباحاً حتى 11 مساءً بتوقيت دمشق.' },
    ],
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => q.q.includes(search) || q.a.includes(search) || search === ''
    ),
  })).filter(cat => cat.questions.length > 0)

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">
            الأسئلة <span className="gradient-text">الشائعة</span>
          </h1>
          <p className="text-gray-400 mb-8">كل ما تريد معرفته عن منصة شام بوتس</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث في الأسئلة..."
              className="input-field pr-12"
            />
          </div>
        </motion.div>

        <div className="space-y-8">
          {filteredFaqs.map((cat) => (
            <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary-400" />
                </div>
                <h2 className="font-heading font-bold text-xl text-white">{cat.category}</h2>
              </div>
              <div className="space-y-3">
                {cat.questions.map((faq) => {
                  const id = `${cat.category}-${faq.q}`
                  const isOpen = openIndex === id
                  return (
                    <div key={id} className="glass-card !p-0 overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : id)}
                        className="w-full flex items-center justify-between p-4 text-right"
                      >
                        <span className="text-sm text-white font-medium">{faq.q}</span>
                        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', isOpen && 'rotate-180')} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-gray-400 leading-relaxed border-t border-dark-border pt-3">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
