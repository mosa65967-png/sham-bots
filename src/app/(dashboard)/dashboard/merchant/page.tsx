'use client'

import { motion } from 'framer-motion'
import { Store, Package, Plus } from 'lucide-react'

export default function DashboardMerchantPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold text-white mb-8">المتجر</h1>

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
