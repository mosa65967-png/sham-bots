'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Bell, Shield, Save } from 'lucide-react'

export default function DashboardSettingsPage() {
  const [profile, setProfile] = useState({ name: '', phone: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/v1/auth/me')
        if (!res.ok) throw new Error('فشل في تحميل البيانات')
        const data = await res.json()
        setProfile({
          name: data.nameAr || data.name || '',
          phone: data.phone || '',
          email: data.email || '',
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-gray-400">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-red-400 mb-2">حدث خطأ في تحميل الإعدادات</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold text-white mb-8">الإعدادات</h1>

        <div className="space-y-6">
          <div className="glass-card">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-primary-400" />
              <h2 className="font-heading font-bold text-lg text-white">الملف الشخصي</h2>
            </div>
            <div className="space-y-4">
              <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="الاسم الكامل" className="input-field" />
              <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="رقم الهاتف" className="input-field" />
              <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="البريد الإلكتروني" className="input-field" />
              <button className="btn-primary">
                <Save className="w-4 h-4 ml-2 inline-block" />
                حفظ التغييرات
              </button>
            </div>
          </div>

          <div className="glass-card">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary-400" />
              <h2 className="font-heading font-bold text-lg text-white">الإشعارات</h2>
            </div>
            <div className="space-y-4">
              {['إشعارات الطلبات', 'إشعارات الدعم', 'عروض وتحديثات'].map((n) => (
                <label key={n} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{n}</span>
                  <input type="checkbox" defaultChecked className="form-checkbox rounded bg-dark-tertiary border-white/10 text-primary-500" />
                </label>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary-400" />
              <h2 className="font-heading font-bold text-lg text-white">الأمان</h2>
            </div>
            <p className="text-sm text-gray-400 mb-4">تغيير كلمة المرور أو تفعيل التحقق بخطوتين</p>
            <button className="btn-secondary">تغيير كلمة المرور</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
