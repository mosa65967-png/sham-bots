'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Store as StoreIcon, MapPin, Star, ShoppingBag } from 'lucide-react'
import { useAppStore } from '@/lib/store/app-store'

const sampleStores = [
  { id: 's1', name: 'متجر الإلكترونيات', slug: 'electronics', description: 'أجهزة إلكترونية، جوالات، لابتوبات، واكسسوارات', governorateId: '1', rating: 4.6, productsCount: 45, image: '' },
  { id: 's2', name: 'موضة دمشق', slug: 'damascus-fashion', description: 'أزياء عصرية وتقليدية، ماركات عالمية', governorateId: '1', rating: 4.3, productsCount: 78, image: '' },
  { id: 's3', name: 'سوق حلب الإلكتروني', slug: 'aleppo-market', description: 'منتجات متنوعة بأسعار الجملة', governorateId: '3', rating: 4.7, productsCount: 120, image: '' },
]

export default function StoresPage() {
  const { selectedGovernorate } = useAppStore()
  const [search, setSearch] = useState('')

  const filtered = sampleStores.filter(s => {
    if (selectedGovernorate && s.governorateId !== selectedGovernorate.id) return false
    if (search && !s.name.includes(search) && !s.description.includes(search)) return false
    return true
  })

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">
            <span className="gradient-text">المتاجر</span> الإلكترونية
          </h1>
          <p className="text-gray-400 text-lg">تسوق من متاجر سورية موثوقة. دفع نقداً عند الاستلام.</p>
        </motion.div>

        <div className="relative max-w-md mb-8">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن متجر..." className="input-field pr-12" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((store) => (
            <motion.div key={store.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link href={`/stores/${store.slug}`}>
                <div className="glass-card card-hover">
                  <div className="h-36 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center mb-4">
                    <StoreIcon className="w-14 h-14 text-primary-400" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mb-1 group-hover:text-primary-400">{store.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{store.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500" />{store.rating}</span>
                    <span className="flex items-center gap-1"><ShoppingBag className="w-3.5 h-3.5" />{store.productsCount} منتج</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
