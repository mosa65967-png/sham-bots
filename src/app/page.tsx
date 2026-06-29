'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Bot, Utensils, ShoppingBag, Headphones, MapPin, ArrowLeft, Sparkles, Globe2, QrCode, MessageCircle, Store, CreditCard, Star, Users, TrendingUp } from 'lucide-react'
import { governorates } from '@/data/governorates'
import { SyriaMap } from '@/components/maps/SyriaMap'

const services = [
  {
    title: 'بوتات تليجرام وواتساب',
    description: 'بوتات ذكية للرد التلقائي، المتاجر، الحجوزات، وخدمة العملاء. تدعم الذكاء الاصطناعي بالعربية.',
    icon: Bot,
    href: '/directory',
    gradient: 'from-primary-500 to-purple-600',
    features: ['رد تلقائي ذكي', 'متجر كامل', 'حجز مواعيد', 'تحليلات متقدمة'],
  },
  {
    title: 'دليل تليجرام',
    description: 'أكبر دليل للقنوات والمجموعات والبوتات في سوريا. مصنف حسب المحافظة والتصنيف.',
    icon: MessageCircle,
    href: '/directory',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['آلاف القنوات', 'بحث ذكي', 'تصنيف دقيق', 'محتوى محلي'],
  },
  {
    title: 'QR Menu للمطاعم',
    description: 'منيو رقمي تفاعلي مع QR كود. اطلب طعامك مباشرة عبر واتساب دون تطبيق.',
    icon: Utensils,
    href: '/restaurants',
    gradient: 'from-orange-500 to-red-500',
    features: ['QR كود مخصص', 'طلب عبر واتساب', 'تحديث فوري', 'تحليلات'],
  },
  {
    title: 'متجر إلكتروني',
    description: 'أنشئ متجرك الإلكتروني مجاناً. بيع منتجاتك مع دفع نقدي عند الاستلام.',
    icon: Store,
    href: '/stores',
    gradient: 'from-green-500 to-emerald-600',
    features: ['متجر مجاني', 'دفع نقدي', 'دروب شيبينج', 'شحن داخلي'],
  },
  {
    title: 'SaaS خدمة العملاء',
    description: 'نظام متكامل لخدمة العملاء مع رد آلي بالذكاء الاصطناعي. صندوق وارد موحد.',
    icon: Headphones,
    href: '/support',
    gradient: 'from-pink-500 to-rose-600',
    features: ['AI Agent', 'موحد لكل المنصات', 'تذاكر دعم', 'تحليلات'],
  },
  {
    title: 'دروب شيبينج',
    description: 'استورد منتجات من علي إكسبريس وبيعها في سوريا. بدون مخزون أو تكاليف شحن.',
    icon: ShoppingBag,
    href: '/stores',
    gradient: 'from-yellow-500 to-amber-600',
    features: ['استيراد تلقائي', 'لا مخزون مطلوب', 'شحن مباشر', 'هوامش ربح'],
  },
]

const stats = [
  { label: 'محافظة', value: '14', icon: MapPin },
  { label: 'خدمة رقمية', value: '10+', icon: Users },
  { label: 'بوت جاهز', value: '10+', icon: Bot },
  { label: 'خدمة', value: '6', icon: Sparkles },
]

const plans = [
  {
    name: 'مجاني',
    price: '0',
    currency: 'ل.س',
    description: 'للبدء والتجربة',
    features: ['بوت واحد أساسي', 'دليل تليجرام', 'QR Menu تجريبي', 'دعم عبر البوت'],
    cta: 'ابدأ مجاناً',
    popular: false,
  },
  {
    name: 'برونزي',
    price: '75,000',
    currency: 'ل.س/شهر',
    description: 'للأعمال الصغيرة',
    features: ['3 بوتات احترافية', 'QR Menu كامل', 'متجر إلكتروني', 'دعم فني', 'إحصائيات أساسية'],
    cta: 'اشترك الآن',
    popular: true,
  },
  {
    name: 'فضي',
    price: '200,000',
    currency: 'ل.س/شهر',
    description: 'للشركات المتوسطة',
    features: ['بوتات غير محدودة', 'AI Agent متقدم', 'SaaS كامل', 'متجر + دروب شيبينج', 'دعم VIP', 'تقارير متقدمة'],
    cta: 'اختر الفضي',
    popular: false,
  },
  {
    name: 'ذهبي',
    price: '450,000',
    currency: 'ل.س/شهر',
    description: 'للشركات الكبرى',
    features: ['كل الخدمات', 'مندوب تحصيل خاص', 'API مخصص', 'استضافة خاصة', 'دعم 24/7', 'تدريب فريق'],
    cta: 'تواصل معنا',
    popular: false,
  },
]

export default function Home() {
  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-400 mb-6">
                <Sparkles className="w-4 h-4" />
                المنصة الرقمية السورية الأولى
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="gradient-text">شام بوتس</span>
                <br />
                <span className="text-white">منصتك السورية المتكاملة</span>
              </h1>

              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                منصة سورية تجمع بوتات الذكاء الاصطناعي، دليل تليجرام، QR Menu للمطاعم، 
                متجر إلكتروني، ونظام خدمة عملاء متكامل. كل هذا يدعم 14 محافظة سورية 
                بنظام دفع نقدي باليد.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register" className="btn-primary text-lg text-center">
                  ابدأ مجاناً
                  <ArrowLeft className="inline-block w-5 h-5 mr-2" />
                </Link>
                <Link href="/directory" className="btn-secondary text-lg text-center">
                  استعرض الخدمات
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mt-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-heading font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="glass rounded-3xl p-8 relative">
                <SyriaMap className="mb-6" />
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-4">اختر محافظتك لتبدأ</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {governorates.slice(0, 7).map((gov) => (
                      <Link
                        key={gov.id}
                        href="/directory"
                        className="px-3 py-1.5 rounded-lg bg-dark-tertiary text-sm text-gray-300 hover:text-white hover:bg-primary-500/20 transition-all"
                      >
                        {gov.nameAr}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/directory"
                    className="inline-block mt-4 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    تصفح جميع الخدمات ←
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Services Section ===== */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              خدماتنا <span className="gradient-text">المتكاملة</span>
            </h2>
            <p className="section-subtitle">
              كل ما تحتاجه لإدارة أعمالك رقمياً في سوريا، منصة واحدة تجمع كل الخدمات
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <div className="glass-card card-hover group">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <span key={f} className="px-2.5 py-1 rounded-lg bg-dark-tertiary text-xs text-gray-400">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              كيف <span className="gradient-text">تعمل المنصة</span>؟
            </h2>
            <p className="section-subtitle">
              ثلاث خطوات بسيطة لتبدأ في الاستفادة من جميع الخدمات
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'اختر محافظتك',
                desc: 'اختر محافظتك من الخريطة. الأسعار والخدمات تختلف حسب المحافظة.',
                icon: MapPin,
              },
              {
                step: '02',
                title: 'اختر الخدمة',
                desc: 'تصفح الخدمات المتاحة: بوتات، دليل تليجرام، QR Menu، متجر إلكتروني.',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'ادفع نقداً واستلم',
                desc: 'ادفع لمندوبنا في محافظتك نقداً باليد، وستفعل الخدمة فوراً.',
                icon: CreditCard,
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mx-auto mb-6 group hover:border-primary-500/50 transition-all">
                  <item.icon className="w-10 h-10 text-primary-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-5xl font-heading font-black gradient-text opacity-20 mb-2">
                  {item.step}
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 14 Governorates ===== */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              <span className="gradient-text">14 محافظة</span> سورية
            </h2>
            <p className="section-subtitle">
              خدماتنا متوفرة في جميع المحافظات السورية مع أسعار خاصة لكل محافظة
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {governorates.map((gov, index) => (
              <motion.div
                key={gov.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/directory"
                  className="glass-card text-center !p-4 block card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white">{gov.nameAr}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">{gov.region}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">
              باقات <span className="gradient-text">مرنة</span> تناسب الجميع
            </h2>
            <p className="section-subtitle">
              ابدأ مجاناً، وارتقِ بأعمالك مع باقاتنا الاحترافية. الدفع نقداً باليد أو إلكتروني.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`glass-card relative ${plan.popular ? 'border-primary-500/50 shadow-lg shadow-primary-500/10' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-500 text-white text-xs font-bold">
                    الأكثر طلباً
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-heading font-bold text-xl text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-heading font-black gradient-text">{plan.price}</span>
                    <span className="text-sm text-gray-400">{plan.currency}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <Star className="w-4 h-4 text-secondary-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/register"
                  className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25'
                      : 'bg-dark-tertiary text-gray-300 hover:text-white hover:bg-dark-border border border-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-4xl mb-6">
              جهز أعمالك للعالم <span className="gradient-text">الرقمي</span> اليوم
            </h2>
            <p className="section-subtitle mb-10">
              لا تنتظر. مئات الخدمات في انتظارك. ابدأ مجاناً وادفع نقداً في محافظتك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="btn-primary text-lg">
                ابدأ مجاناً
              </Link>
              <Link href="/support" className="btn-secondary text-lg">
                تواصل معنا
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4 text-secondary-500" />
              لا تحتاج بطاقة ائتمان. مجاني تماماً للبدء.
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
