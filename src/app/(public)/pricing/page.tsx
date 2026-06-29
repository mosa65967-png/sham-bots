'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Star, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'مجاني',
    priceSyp: '0',
    priceUsd: '0',
    period: 'شهرياً',
    description: 'للبدء والتجربة',
    features: ['بوت تليجرام واحد', 'دليل تليجرام', 'QR Menu تجريبي (50 طلب)', 'دعم عبر البوت', 'إحصائيات أساسية'],
    cta: 'ابدأ مجاناً',
    href: '/auth/register',
    popular: false,
  },
  {
    name: 'برونزي',
    priceSyp: '75,000',
    priceUsd: '5',
    period: 'شهرياً',
    description: 'للأعمال الصغيرة والمتاجر',
    features: ['3 بوتات احترافية', 'جميع المنصات', 'QR Menu كامل (غير محدود)', 'متجر إلكتروني', 'تصدير تقارير PDF', 'دعم فني عبر البوت'],
    cta: 'اشترك الآن',
    href: '/auth/register?plan=bronze',
    popular: true,
  },
  {
    name: 'فضي',
    priceSyp: '200,000',
    priceUsd: '13',
    period: 'شهرياً',
    description: 'للشركات المتوسطة',
    features: ['بوتات غير محدودة', 'AI Agent متقدم', 'SaaS خدمة عملاء كامل', 'متجر + دروب شيبينج', 'QR Menu + تحليلات', 'دعم VIP (رد خلال ساعة)', 'تقارير متقدمة', 'API مخصص'],
    cta: 'اختر الفضي',
    href: '/auth/register?plan=silver',
    popular: false,
  },
  {
    name: 'ذهبي',
    priceSyp: '450,000',
    priceUsd: '30',
    period: 'شهرياً',
    description: 'للشركات الكبرى',
    features: ['كل خدمات الفضي', 'مندوب تحصيل خاص', 'استضافة خاصة (Subdomain)', 'لوحة تحكم مخصصة', 'تدريب فريق العمل', 'دعم 24/7 (واتساب + تليجرام)', 'تحديثات مجانية', 'أولوية في الميزات الجديدة'],
    cta: 'تواصل معنا',
    href: '/contact',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-400 mb-4">
            <Sparkles className="w-4 h-4" />
            أسعار مرنة تناسب الجميع
          </div>
          <h1 className="section-title text-5xl mb-4">
            باقات <span className="gradient-text">شام بوتس</span>
          </h1>
          <p className="section-subtitle">
            ابدأ مجاناً وارتقِ بأعمالك. الدفع نقداً باليد في جميع المحافظات السورية.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'glass-card relative flex flex-col',
                plan.popular && 'border-primary-500/50 shadow-lg shadow-primary-500/10 scale-105 lg:scale-110'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-500 text-white text-xs font-bold whitespace-nowrap">
                  الأكثر طلباً
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-heading font-bold text-xl text-white mb-3">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-heading font-black gradient-text">{plan.priceSyp}</span>
                  <span className="text-sm text-gray-400">ل.س</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">/ {plan.period}</p>
                <p className="text-sm text-gray-400 mt-3">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-secondary-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={cn(
                  'block text-center py-3 rounded-xl font-semibold transition-all',
                  plan.popular
                    ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25'
                    : 'bg-dark-tertiary text-gray-300 hover:text-white hover:bg-dark-border border border-white/10'
                )}
              >
                {plan.cta}
              </Link>

              {plan.priceUsd !== '0' && (
                <p className="text-center text-[10px] text-gray-600 mt-2">
                  أو {plan.priceUsd}$ دولار أمريكي
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="glass-card !p-8 text-center max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-xl text-white mb-4">طرق الدفع</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-dark-tertiary text-sm text-gray-300">💵 يداً بيد</span>
            <span className="px-4 py-2 rounded-xl bg-dark-tertiary text-sm text-gray-300">🏠 توصيل للمنزل</span>
            <span className="px-4 py-2 rounded-xl bg-dark-tertiary text-sm text-gray-300">🏦 تحويل بنكي</span>
            <span className="px-4 py-2 rounded-xl bg-dark-tertiary text-sm text-gray-300">🌐 ويسترن يونيون</span>
            <span className="px-4 py-2 rounded-xl bg-dark-tertiary text-sm text-gray-300 opacity-50">💳 Stripe (قريباً)</span>
            <span className="px-4 py-2 rounded-xl bg-dark-tertiary text-sm text-gray-300 opacity-50">💳 PayPal (قريباً)</span>
          </div>
          <p className="text-xs text-gray-500 mt-4">نعمل على إضافة الدفع الإلكتروني قريباً</p>
        </div>
      </div>
    </div>
  )
}
