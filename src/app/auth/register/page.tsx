'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Bot, ArrowLeft, User, Phone, MapPin } from 'lucide-react'
import { governorates } from '@/data/governorates'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [governorate, setGovernorate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/auth/login?registered=true')
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">إنشاء حساب جديد</h1>
          <p className="text-gray-400 mt-2">أدخل بياناتك لبدء رحلتك الرقمية</p>
        </div>

        <div className="glass-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="محمد أحمد"
                  className="input-field pr-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">رقم الهاتف</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09XX XXX XXX"
                  className="input-field pr-12"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">المحافظة</label>
              <div className="relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="input-field pr-12 appearance-none"
                  required
                >
                  <option value="">اختر محافظتك</option>
                  {governorates.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {gov.nameAr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              إنشاء الحساب
              <ArrowLeft className="inline-block w-4 h-4 mr-2" />
            </button>

            <p className="text-center text-sm text-gray-500">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-medium">
                تسجيل الدخول
              </Link>
            </p>

            <p className="text-center text-xs text-gray-600">
              بالتسجيل أنت توافق على{' '}
              <Link href="/terms" className="text-primary-400 hover:text-primary-300">شروط الخدمة</Link>
              {' '}و{' '}
              <Link href="/privacy" className="text-primary-400 hover:text-primary-300">سياسة الخصوصية</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
