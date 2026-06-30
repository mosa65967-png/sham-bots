'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bot, ArrowLeft, Phone, Chrome } from 'lucide-react'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<'phone' | 'otp' | 'password'>('password')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpCode, setOtpCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (window.location.search.includes('registered=true')) {
      setSuccessMessage('تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن')
    }
  }, [])

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setOtpCode('')
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (data.success) {
        setStep('otp')
        if (data.otp) {
          setOtpCode(data.otp)
          setOtp(data.otp.split(''))
        }
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
      const res = await fetch('/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp: code }),
      })
      const data = await res.json()
      if (data.success) {
        window.location.href = '/dashboard'
      } else {
        setError(data.error || 'رمز التحقق غير صحيح أو منتهي الصلاحية')
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
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      })
      const data = await res.json()
      if (data.success) {
        window.location.href = '/dashboard'
      } else {
        setError(data.error || 'رقم الهاتف أو كلمة المرور غير صحيحة')
        setLoading(false)
      }
    } catch {
      setError('حدث خطأ في تسجيل الدخول')
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('تسجيل الدخول عبر Google غير متاح حالياً')
    setLoading(false)
  }

  const handleResendOTP = async () => {
    setError('')
    setLoading(true)
    setOtpCode('')
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (data.success && data.otp) {
        setOtpCode(data.otp)
        setOtp(data.otp.split(''))
      }
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

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center">
            {successMessage}
          </div>
        )}

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
                {otpCode && (
                  <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-center text-lg font-bold tracking-widest" dir="ltr">
                    {otpCode}
                  </div>
                )}
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
                {!otpCode && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    لم يصلك الرمز؟{' '}
                    <button type="button" onClick={handleResendOTP} disabled={loading} className="text-primary-400 hover:text-primary-300 disabled:opacity-50">
                      إعادة الإرسال
                    </button>
                  </p>
                )}
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
