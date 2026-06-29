'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, MapPin, Star, Clock, Utensils, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { governorates } from '@/data/governorates'
import { sampleRestaurants } from '@/data/restaurants'
import { useAppStore } from '@/lib/store/app-store'

export default function RestaurantsPage() {
  const { selectedGovernorate } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)

  const filtered = useMemo(() => {
    let results = [...sampleRestaurants]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      results = results.filter(r => r.nameAr.includes(q) || r.description?.includes(q))
    }
    if (selectedGovernorate) results = results.filter(r => r.governorateId === selectedGovernorate.id)
    if (availableOnly) results = results.filter(r => r.isOpen)
    return results
  }, [searchQuery, selectedGovernorate, availableOnly])

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">
            <span className="gradient-text">QR Menu</span> للمطاعم
          </h1>
          <p className="text-gray-400 text-lg">اطلب طعامك مباشرة من هاتفك. امسح QR أو تصفح المنيو.</p>
        </motion.div>

        {/* Search */}
        <div className="glass-card !p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مطعم..."
                className="input-field pr-12"
              />
            </div>
            <label className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-tertiary border border-dark-border cursor-pointer">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={() => setAvailableOnly(!availableOnly)}
                className="w-4 h-4 rounded border-dark-border bg-dark-tertiary text-primary-500"
              />
              <span className="text-sm text-gray-300">المفتوح الآن</span>
            </label>
          </div>
        </div>

        {/* Restaurant Grid */}
        {filtered.length === 0 ? (
          <div className="glass-card text-center !py-16">
            <Utensils className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-white mb-2">لا توجد مطاعم</h3>
            <p className="text-gray-400">لا توجد مطاعم في هذه المنطقة حالياً</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/restaurants/${restaurant.id}`}>
                  <div className="glass-card card-hover group">
                    {/* Cover */}
                    <div className="h-40 rounded-xl bg-gradient-to-br from-dark-tertiary to-dark-secondary flex items-center justify-center mb-4 relative overflow-hidden">
                      <Utensils className="w-12 h-12 text-gray-600" />
                      <div className={cn(
                        'absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold',
                        restaurant.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      )}>
                        {restaurant.isOpen ? 'مفتوح' : 'مغلق'}
                      </div>
                      {restaurant.deliveryAvailable && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs">
                          توصيل
                        </div>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white mb-1 group-hover:text-primary-400 transition-colors">
                      {restaurant.nameAr}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">{restaurant.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500" />
                        {restaurant.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {restaurant.address?.slice(0, 20)}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-dark-border flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {restaurant.subscriptionTier === 'basic' ? 'مجاني' : restaurant.subscriptionTier === 'pro' ? 'احترافي' : 'مميز'}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-primary-400">
                        عرض المنيو
                        <ChevronLeft className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
