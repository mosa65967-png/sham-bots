'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react'

const sections = [
  {
    icon: Shield,
    title: 'الخصوصية والأمان',
    content: 'نحن في شام بوتس نأخذ خصوصيتك على محمل الجد. هذه السياسة توضح كيف نجمع ونستخدم ونحمي معلوماتك الشخصية.',
  },
  {
    icon: Database,
    title: 'المعلومات التي نجمعها',
    items: [
      'معلومات التسجيل: الاسم، رقم الهاتف، البريد الإلكتروني.',
      'معلومات الاستخدام: الصفحات التي تزورها، الخدمات التي تستخدمها.',
      'معلومات الدفع: يتم التعامل معها بأمان ولا نخزن تفاصيل الدفع كاملة.',
    ],
  },
  {
    icon: Eye,
    title: 'كيف نستخدم معلوماتك',
    items: [
      'تقديم وتحسين الخدمات التي تطلبها.',
      'التواصل معك بخصوص حسابك وخدماتنا.',
      'تحليل استخدام المنصة لتحسين التجربة.',
      'إرسال تحديثات وعروض (يمكنك إلغاء الاشتراك في أي وقت).',
    ],
  },
  {
    icon: Lock,
    title: 'حماية المعلومات',
    content: 'نستخدم أحدث تقنيات التشفير والحماية. جميع البيانات مشفرة أثناء النقل والتخزين. لا نشارك معلوماتك مع أطراف ثالثة دون موافقتك.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">
            سياسة <span className="gradient-text">الخصوصية</span>
          </h1>
          <p className="text-gray-400">آخر تحديث: 30 يونيو 2026</p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((sec) => (
            <motion.div key={sec.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <sec.icon className="w-5 h-5 text-primary-400" />
                </div>
                <h2 className="font-heading font-bold text-lg text-white">{sec.title}</h2>
              </div>
              {sec.content && <p className="text-sm text-gray-400 leading-relaxed">{sec.content}</p>}
              {sec.items && (
                <ul className="space-y-2">
                  {sec.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-primary-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 glass-card text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Mail className="w-4 h-4 text-primary-400" />
            للاستفسارات: <a href="mailto:info@sham-bots.com" className="text-primary-400 hover:underline">info@sham-bots.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}
