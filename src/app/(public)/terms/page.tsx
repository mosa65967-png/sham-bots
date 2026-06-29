'use client'

import { motion } from 'framer-motion'
import { Shield, FileText, AlertTriangle, CheckCircle } from 'lucide-react'

const sections = [
  {
    icon: FileText,
    title: 'مقدمة',
    content: 'مرحباً بك في شام بوتس. باستخدامك للمنصة، أنت توافق على هذه الشروط. إذا كنت لا توافق، يرجى عدم استخدام المنصة.',
  },
  {
    icon: CheckCircle,
    title: 'الحقوق والالتزامات',
    items: [
      'شام بوتس تقدم خدمات رقمية (بوتات، دليل تليجرام، QR Menu، متجر إلكتروني، نظام خدمة عملاء).',
      'المستخدم يتحمل مسؤولية المحتوى الذي ينشره عبر المنصة.',
      'يمنع استخدام المنصة لأي نشاط غير قانوني أو مخالف للقوانين السورية.',
      'جميع البيانات الشخصية محمية وفق سياسة الخصوصية.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'المدفوعات والاشتراكات',
    items: [
      'الدفع نقداً باليد متاح في جميع المحافظات السورية الـ14.',
      'الباقة المجانية غير محدودة المدة ولكن مع خدمات محدودة.',
      'الاشتراكات الشهرية تتجدد تلقائياً، يمكن إلغاؤها في أي وقت.',
      'المبالغ المدفوعة لا تسترد إلا في حالات محدودة وفق سياسة الاسترجاع.',
    ],
  },
  {
    icon: Shield,
    title: 'الملكية الفكرية',
    content: 'جميع الحقوق الفكرية للمنصة ومحتواها وبرمجياتها محفوظة لشام بوتس. لا يحق للمستخدم نسخ أو توزيع أو تعديل أي جزء من المنصة دون إذن خطي.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">
            شروط <span className="gradient-text">الخدمة</span>
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
          <p className="text-sm text-gray-400">
            للمزيد من المعلومات أو الاستفسارات، يرجى التواصل معنا عبر صفحة <a href="/contact" className="text-primary-400 hover:underline">اتصل بنا</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
