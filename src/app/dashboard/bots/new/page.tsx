'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Bot, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { BotTemplate, BotType } from '@/types'

const botTypes: { id: BotType; label: string; icon: string; desc: string }[] = [
  { id: 'telegram', label: 'تليجرام', icon: '✈️', desc: 'بوت يعمل على منصة تليجرام' },
  { id: 'whatsapp', label: 'واتساب', icon: '💬', desc: 'بوت يعمل على واتساب بيزنس' },
  { id: 'facebook', label: 'فيسبوك', icon: '📘', desc: 'بوت لصفحات فيسبوك' },
  { id: 'instagram', label: 'انستغرام', icon: '📸', desc: 'بوت لحسابات انستغرام' },
  { id: 'multi', label: 'متعدد المنصات', icon: '🌐', desc: 'بوت واحد يعمل على كل المنصات' },
]

const categories = [
  { id: 'all', label: 'الكل' },
  { id: 'ecommerce', label: 'متجر إلكتروني' },
  { id: 'support', label: 'خدمة عملاء' },
  { id: 'booking', label: 'حجوزات' },
  { id: 'food', label: 'مطاعم' },
  { id: 'marketing', label: 'تسويق' },
  { id: 'education', label: 'تعليم' },
]

const sampleTemplates: BotTemplate[] = [
  { id: 't1', name: 'متجر إلكتروني', description: 'بوت متجر كامل مع سلة مشتريات ودفع', category: 'ecommerce', thumbnailUrl: '', flowData: [], isPremium: false, priceSyp: 0, priceUsd: 0, downloadsCount: 234, rating: 4.8 },
  { id: 't2', name: 'خدمة عملاء', description: 'رد تلقائي على العملاء مع تحويل للبشر', category: 'support', thumbnailUrl: '', flowData: [], isPremium: false, priceSyp: 0, priceUsd: 0, downloadsCount: 189, rating: 4.6 },
  { id: 't3', name: 'حجز مواعيد', description: 'حجز مواعيد للمتاجر والعيادات', category: 'booking', thumbnailUrl: '', flowData: [], isPremium: false, priceSyp: 0, priceUsd: 0, downloadsCount: 156, rating: 4.7 },
  { id: 't4', name: 'منيو مطعم', description: 'عرض منيو وطلب طعام عبر البوت', category: 'food', thumbnailUrl: '', flowData: [], isPremium: true, priceSyp: 75000, priceUsd: 5, downloadsCount: 312, rating: 4.9 },
  { id: 't5', name: 'تسويق بالعمولة', description: 'بوت تسويق مع روابط إحالة', category: 'marketing', thumbnailUrl: '', flowData: [], isPremium: false, priceSyp: 0, priceUsd: 0, downloadsCount: 98, rating: 4.4 },
  { id: 't6', name: 'منصة تعليمية', description: 'بوت تعليمي مع دروس واختبارات', category: 'education', thumbnailUrl: '', flowData: [], isPremium: true, priceSyp: 150000, priceUsd: 10, downloadsCount: 67, rating: 4.5 },
]

export default function NewBotPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [botName, setBotName] = useState('')
  const [botType, setBotType] = useState<BotType | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filteredTemplates = categoryFilter === 'all'
    ? sampleTemplates
    : sampleTemplates.filter(t => t.category === categoryFilter)

  const handleCreate = () => {
    router.push(`/dashboard/bots/studio?name=${encodeURIComponent(botName)}&type=${botType}&template=${selectedTemplate || ''}`)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        العودة للوحة التحكم
      </Link>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= s ? 'bg-primary-500 text-white' : 'bg-dark-tertiary text-gray-500'
            }`}>
              {s}
            </div>
            <span className={`text-sm ${step >= s ? 'text-white' : 'text-gray-500'}`}>
              {s === 1 ? 'النوع' : s === 2 ? 'القالب' : 'التفاصيل'}
            </span>
            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary-500' : 'bg-dark-border'}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="font-heading text-2xl font-bold text-white mb-2">اختر منصة البوت</h2>
          <p className="text-gray-400 mb-6">على أي منصة سيعمل البوت؟</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {botTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setBotType(type.id)}
                className={`glass-card text-right !p-5 card-hover ${
                  botType === type.id ? 'border-primary-500/50 shadow-lg shadow-primary-500/10' : ''
                }`}
              >
                <span className="text-3xl block mb-3">{type.icon}</span>
                <h3 className="font-heading font-bold text-white mb-1">{type.label}</h3>
                <p className="text-sm text-gray-400">{type.desc}</p>
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <div />
            <button
              onClick={() => setStep(2)}
              disabled={!botType}
              className="btn-primary disabled:opacity-50"
            >
              التالي: اختر قالباً
            </button>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="font-heading text-2xl font-bold text-white mb-2">اختر قالباً للبوت</h2>
          <p className="text-gray-400 mb-4">أو ابدأ من الصفر</p>

          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                  categoryFilter === cat.id ? 'bg-primary-500 text-white' : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => { setSelectedTemplate(null); setStep(3) }}
              className={`glass-card text-center !p-8 card-hover flex flex-col items-center ${
                selectedTemplate === null ? 'border-primary-500/50 shadow-lg shadow-primary-500/10' : ''
              }`}
            >
              <span className="text-4xl mb-3">✨</span>
              <h3 className="font-heading font-bold text-white mb-1">ابدأ من الصفر</h3>
              <p className="text-sm text-gray-400">قم ببناء البوت بنفسك</p>
            </button>
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => { setSelectedTemplate(template.id); setStep(3) }}
                className={`glass-card text-right !p-5 card-hover ${
                  selectedTemplate === template.id ? 'border-primary-500/50 shadow-lg shadow-primary-500/10' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">🤖</span>
                  {template.isPremium && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">PRO</span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-white mb-1">{template.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⭐ {template.rating} · {template.downloadsCount} تحميل</span>
                  {template.isPremium && <span className="text-amber-400">{template.priceSyp?.toLocaleString()} ل.س</span>}
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(1)} className="btn-secondary">السابق</button>
            {selectedTemplate && (
              <button onClick={() => setStep(3)} className="btn-primary">التالي: التفاصيل</button>
            )}
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="font-heading text-2xl font-bold text-white mb-2">أدخل تفاصيل البوت</h2>
          <p className="text-gray-400 mb-6">اللمسات الأخيرة قبل الإنشاء</p>

          <div className="max-w-lg space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">اسم البوت</label>
              <input
                type="text"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="مثلاً: بوت متجري الإلكتروني"
                className="input-field"
              />
            </div>

            <div className="glass-card !p-5">
              <h4 className="font-heading font-bold text-white mb-3">ملخص البوت</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>المنصة: {botTypes.find(t => t.id === botType)?.label}</p>
                <p>القالب: {selectedTemplate ? sampleTemplates.find(t => t.id === selectedTemplate)?.name : 'بدون قالب'}</p>
                <p>الذكاء الاصطناعي: مفعل (Gemini Flash - مجاني)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary-500/10 border border-secondary-500/20">
              <span className="text-secondary-500">💡</span>
              <span className="text-sm text-secondary-400">يمكنك تعديل البوت لاحقاً من الاستوديو</span>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(2)} className="btn-secondary">السابق</button>
            <button onClick={handleCreate} disabled={!botName} className="btn-primary disabled:opacity-50">
              <Bot className="inline-block w-4 h-4 ml-2" />
              إنشاء البوت
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
