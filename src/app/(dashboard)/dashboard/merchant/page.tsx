'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Store, Package, Plus } from 'lucide-react'

export default function DashboardMerchantPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/v1/auth/me')
        if (!res.ok) throw new Error('فشل في تحميل البيانات')
        const d = await res.json()
        setUser(d.data || d)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-red-400 mb-2">حدث خطأ في تحميل البيانات</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-white">
            {user ? `متجر ${user.nameAr || user.name || ''}`.trim() : 'المتجر'}
          </h1>
          <p className="text-gray-400 mt-1">إدارة منتجاتك ومتجرك الإلكتروني</p>
        </div>

        <div className="glass-card text-center !py-16">
          <Store className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="font-heading font-bold text-xl text-white mb-2">ليس لديك متجر بعد</h3>
          <p className="text-gray-400 mb-6">أنشئ متجرك الإلكتروني وابدأ البيع فوراً</p>
          <button className="btn-primary">
            <Plus className="w-4 h-4 ml-2 inline-block" />
            إنشاء متجر
          </button>
        </div>
      </motion.div>
    </div>
  )
}
