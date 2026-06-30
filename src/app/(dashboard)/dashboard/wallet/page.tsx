'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react'

export default function DashboardWalletPage() {
  const [wallet, setWallet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch('/api/v1/wallet')
        if (!res.ok) throw new Error('فشل في تحميل بيانات المحفظة')
        const data = await res.json()
        setWallet(data.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchWallet()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-gray-400">جاري تحميل المحفظة...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card text-center !py-16">
          <p className="text-red-400 mb-2">حدث خطأ في تحميل المحفظة</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  const transactions = wallet?.transactions ?? []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold text-white mb-8">المحفظة</h1>

        <div className="glass-card mb-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">الرصيد الحالي</p>
            <p className="text-5xl font-heading font-black gradient-text mb-2">{wallet?.balanceSyp?.toLocaleString() ?? 0}</p>
            <p className="text-gray-500 mb-6">ل.س</p>
            {wallet?.balanceUsd != null && (
              <p className="text-gray-500 -mt-4 mb-6 text-sm">≈ {wallet.balanceUsd.toLocaleString()} USD</p>
            )}
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
        {transactions.length === 0 ? (
          <div className="glass-card text-center !py-12">
            <WalletIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">لا توجد حركات بعد</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx: any) => (
              <div key={tx.id} className="glass-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'deposit' || tx.type === 'credit' ? 'bg-secondary-500/20' : 'bg-red-500/20'}`}>
                    {tx.type === 'deposit' || tx.type === 'credit' ? (
                      <ArrowDownLeft className="w-5 h-5 text-secondary-400" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{tx.description || tx.type}</p>
                    <p className="text-xs text-gray-500">{tx.date ?? '—'}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${tx.type === 'deposit' || tx.type === 'credit' ? 'text-secondary-400' : 'text-red-400'}`}>
                  {tx.type === 'deposit' || tx.type === 'credit' ? '+' : '-'}{tx.amount?.toLocaleString()} ل.س
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
