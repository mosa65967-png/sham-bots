'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Bot, ArrowLeft, Phone, MessageCircle, Chrome } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<'phone' | 'otp' | 'password'>('phone')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (session) return null

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (data.success) {
        setStep('otp')
      } else {
        setError(data.error || 'فشل إرسال رمز التحقق')
      }
    } catch {
      setError('حدث خطأ في الاتصال')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const code = otp.join('')
      const result = await signIn('phone-otp', { phone, otp: code, redirect: false })
      if (result?.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setError('رمز التحقق غير صحيح أو منتهي الصلاحية')
      }
    } catch {
      setError('حدث خطأ في التحقق من الرمز')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('password', { phone, password, redirect: false })
      if (result?.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setError('رقم الهاتف أو كلمة المرور غير صحيحة')
      }
    } catch {
      setError('حدث خطأ في تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch {
      setError('فشل تسجيل الدخول عبر Google')
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (data.success) { /* sent */ }
    } catch {
      setError('فشل إعادة الإرسال')
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
          <h1 className="font-heading text-2xl font-bold text-white">
            {step === 'phone' ? 'تسجيل الدخول' : step === 'otp' ? 'تأكيد الرقم' : 'تسجيل الدخول بكلمة المرور'}
          </h1>
          <p className="text-gray-400 mt-2">
            {step === 'phone' ? 'أدخل رقم هاتفك للتسجيل أو تسجيل الدخول' : step === 'otp' ? 'أدخل رمز التأكيد المرسل إلى هاتفك' : 'أدخل كلمة المرور للحساب'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <div className="glass-card">
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
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

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? 'جاري...' : 'إرسال رمز التأكيد'}
                <ArrowLeft className="inline-block w-4 h-4 mr-2" />
              </button>

              <div className="text-center">
                <button type="button" onClick={() => setStep('password')} className="text-sm text-primary-400 hover:text-primary-300">
                  تسجيل الدخول بكلمة المرور
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-dark-secondary text-gray-500">أو</span>
                </div>
              </div>

              <div className="space-y-3">
                <button type="button" disabled={loading} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-dark-tertiary border border-dark-border hover:bg-dark-border transition-all text-gray-300 disabled:opacity-50">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  تسجيل الدخول عبر تليجرام
                </button>
                <button type="button" disabled={loading} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-dark-tertiary border border-dark-border hover:bg-dark-border transition-all text-gray-300 disabled:opacity-50">
                  <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  تسجيل الدخول عبر واتساب
                </button>
                {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
                  <button type="button" onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-dark-tertiary border border-dark-border hover:bg-dark-border transition-all text-gray-300 disabled:opacity-50">
                    <Chrome className="w-5 h-5 text-blue-400" />
                    تسجيل الدخول عبر Google
                  </button>
                )}
              </div>

              <p className="text-center text-sm text-gray-500">
                ليس لديك حساب؟{' '}
                <Link href="/auth/register" className="text-primary-400 hover:text-primary-300">
                  إنشاء حساب جديد
                </Link>
              </p>

              <p className="text-center text-xs text-gray-500">
                بالتسجيل أنت توافق على{' '}
                <Link href="/terms" className="text-primary-400 hover:text-primary-300">
                  شروط الخدمة
                </Link>
              </p>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-4 text-center">
                  تم إرسال رمز التأكيد إلى <span className="text-white" dir="ltr">{phone}</span>
                </label>
                <div className="flex gap-2 justify-center" dir="ltr">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp]
                        newOtp[i] = e.target.value.replace(/[^0-9]/g, '')
                        setOtp(newOtp)
                        if (e.target.value && i < 5) {
                          const next = document.querySelector<HTMLInputElement>(`[data-otp="${i + 1}"]`)
                          next?.focus()
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[i] && i > 0) {
                          const prev = document.querySelector<HTMLInputElement>(`[data-otp="${i - 1}"]`)
                          prev?.focus()
                        }
                      }}
                      data-otp={i}
                      className="w-12 h-14 text-center text-xl font-bold bg-dark-tertiary border border-dark-border rounded-xl text-white focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  لم يصلك الرمز؟{' '}
                  <button type="button" onClick={handleResendOTP} disabled={loading} className="text-primary-400 hover:text-primary-300 disabled:opacity-50">
                    إعادة الإرسال
                  </button>
                </p>
              </div>

              <button type="submit" disabled={loading || otp.some(d => !d)} className="btn-primary w-full disabled:opacity-50">
                {loading ? 'جاري...' : 'تأكيد الدخول'}
              </button>

              <button type="button" onClick={() => setStep('phone')} disabled={loading} className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50">
                تغيير رقم الهاتف
              </button>
            </form>
          )}

          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09XX XXX XXX"
                  className="input-field"
                  dir="ltr"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">كلمة المرور</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="input-field"
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? 'جاري...' : 'تسجيل الدخول'}
              </button>

              <div className="text-center space-y-2">
                <button type="button" onClick={() => setStep('phone')} className="text-sm text-primary-400 hover:text-primary-300 block w-full">
                  تسجيل الدخول برمز التأكيد
                </button>
                <Link href="/auth/register" className="text-sm text-primary-400 hover:text-primary-300 block">
                  إنشاء حساب جديد
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
