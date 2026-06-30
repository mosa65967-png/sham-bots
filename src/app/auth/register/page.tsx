'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Bot, User, Phone, Lock, ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [nameAr, setNameAr] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameAr, phone, password }),
      })
      const data = await res.json()
      if (data.success) {
        const result = await signIn('password', { phone, password, redirect: false })
        if (result?.ok) {
          router.push('/dashboard')
          router.refresh()
        } else {
          setError('تم إنشاء الحساب بنجاح. يمكنك تسجيل الدخول الآن')
        }
      } else {
        setError(data.error || 'فشل إنشاء الحساب')
      }
    } catch {
      setError('حدث خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
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
          <p className="text-gray-400 mt-2">أدخل بياناتك لإنشاء حساب في شام بوتس</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
            {error.includes('تسجيل الدخول') && (
              <Link href="/auth/login" className="block mt-1 text-primary-400 hover:text-primary-300 underline">تسجيل الدخول</Link>
            )}
          </div>
        )}

        <div className="glass-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">الاسم</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="text" value={nameAr} onChange={(e) => setNameAr(e.target.value)} placeholder="الاسم الكامل" className="input-field pr-12" required />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">رقم الهاتف</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09XX XXX XXX" className="input-field pr-12" dir="ltr" required />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أقل شيء 6 أحرف" className="input-field pr-12" required minLength={6} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? 'جاري...' : 'إنشاء الحساب'}
              <ArrowLeft className="inline-block w-4 h-4 mr-2" />
            </button>

            <p className="text-center text-sm text-gray-500">
              لديك حساب بالفعل؟{' '}
              <Link href="/auth/login" className="text-primary-400 hover:text-primary-300">تسجيل الدخول</Link>
            </p>

            <p className="text-center text-xs text-gray-500">
              بالتسجيل أنت توافق على{' '}
              <Link href="/terms" className="text-primary-400 hover:text-primary-300">شروط الخدمة</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
