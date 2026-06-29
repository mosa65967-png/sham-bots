'use client'

import { motion } from 'framer-motion'
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, CreditCard } from 'lucide-react'

export default function DashboardWalletPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold text-white mb-8">المحفظة</h1>

        <div className="glass-card mb-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">الرصيد الحالي</p>
            <p className="text-5xl font-heading font-black gradient-text mb-2">0</p>
            <p className="text-gray-500 mb-6">ل.س</p>
            <div className="flex gap-3 justify-center">
              <button className="btn-primary">
                <Plus className="w-4 h-4 ml-2 inline-block" />
                شحن المحفظة
              </button>
              <button className="btn-secondary">
                <ArrowUpRight className="w-4 h-4 ml-2 inline-block" />
                سحب
              </button>
            </div>
          </div>
        </div>

        <h2 className="font-heading font-bold text-lg text-white mb-4">آخر الحركات</h2>
        <div className="glass-card text-center !py-12">
          <WalletIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">لا توجد حركات بعد</p>
        </div>
      </motion.div>
    </div>
  )
}
