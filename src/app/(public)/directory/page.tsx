'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Filter, TrendingUp, Sparkles, Bot, MessageCircle, Users, ChevronDown, X, Star, MapPin, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { governorates } from '@/data/governorates'
import { telegramCategories, sampleListings, featuredListings } from '@/data/telegram-listings'
import { useAppStore } from '@/lib/store/app-store'
import { ListingCard } from '@/components/directory/ListingCard'

const typeTabs = [
  { id: 'all', label: 'الكل', icon: Sparkles },
  { id: 'channel', label: 'قنوات', icon: MessageCircle },
  { id: 'group', label: 'مجموعات', icon: Users },
  { id: 'bot', label: 'بوتات', icon: Bot },
]

export default function DirectoryPage() {
  const { selectedGovernorate } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeType, setActiveType] = useState('all')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'rating' | 'members' | 'newest'>('rating')

  const filteredListings = useMemo(() => {
    let results = [...sampleListings]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      results = results.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q) ||
        l.tags.some(t => t.toLowerCase().includes(q)) ||
        l.telegramId.toLowerCase().includes(q)
      )
    }

    if (activeType !== 'all') results = results.filter(l => l.type === activeType)
    if (activeCategory) results = results.filter(l => l.category === activeCategory)
    if (selectedGovernorate) results = results.filter(l => l.governorateId === selectedGovernorate.id)

    results.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'members') return b.membersCount - a.membersCount
      return 0
    })

    return results
  }, [searchQuery, activeType, activeCategory, selectedGovernorate, sortBy])

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">
            دليل <span className="gradient-text">تليجرام</span>
          </h1>
          <p className="text-gray-400 text-lg">
            أكبر دليل للقنوات والمجموعات والبوتات السورية. مصنف حسب المحافظة والتصنيف.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'قناة', value: sampleListings.filter(l => l.type === 'channel').length, icon: MessageCircle, color: 'from-blue-500 to-cyan-500' },
            { label: 'مجموعة', value: sampleListings.filter(l => l.type === 'group').length, icon: Users, color: 'from-green-500 to-emerald-500' },
            { label: 'بوت', value: sampleListings.filter(l => l.type === 'bot').length, icon: Bot, color: 'from-purple-500 to-pink-500' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card !p-4 text-center">
              <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br', stat.color, 'flex items-center justify-center mx-auto mb-2')}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-heading font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured */}
        {featuredListings.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary-400" />
              <h2 className="font-heading font-bold text-lg text-white">مميزة</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredListings.slice(0, 4).map((listing) => (
                <ListingCard key={listing.id} listing={listing} featured />
              ))}
            </div>
          </motion.div>
        )}

        {/* Search & Filters */}
        <div className="glass-card !p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن قنوات، مجموعات، أو بوتات..."
                className="input-field pr-12"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="input-field w-full lg:w-40"
            >
              <option value="rating">الأعلى تقييماً</option>
              <option value="members">الأكثر أعضاء</option>
              <option value="newest">الأحدث</option>
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn('btn-secondary flex items-center gap-2', showFilters && 'bg-primary-500/20 border-primary-500/30 text-primary-400')}
            >
              <Filter className="w-4 h-4" />
              فلترة
              <ChevronDown className={cn('w-3 h-3 transition-transform', showFilters && 'rotate-180')} />
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 pt-4 border-t border-dark-border">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-2">المحافظة</label>
                  <select
                    value={selectedGovernorate?.id || ''}
                    onChange={() => {}}
                    className="input-field"
                  >
                    <option value="">كل المحافظات</option>
                    {governorates.map(g => (
                      <option key={g.id} value={g.id}>{g.nameAr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2">أقل تقييم</label>
                  <select className="input-field">
                    <option value="0">أي تقييم</option>
                    <option value="4">4 نجوم فأكثر</option>
                    <option value="4.5">4.5 نجوم فأكثر</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2">التحقق</label>
                  <select className="input-field">
                    <option value="all">الكل</option>
                    <option value="verified">موثقة فقط</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Type Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {typeTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                activeType === tab.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'glass text-gray-400 hover:text-white'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
              !activeCategory ? 'bg-dark-tertiary text-white' : 'text-gray-500 hover:text-white'
            )}
          >
            الكل
          </button>
          {telegramCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                activeCategory === cat.id ? 'bg-dark-tertiary text-white' : 'text-gray-500 hover:text-white'
              )}
            >
              {cat.icon} {cat.nameAr}
            </button>
          ))}
        </div>

        {/* Results */}
        <motion.div layout className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {filteredListings.length} نتيجة
              {searchQuery && <> لـ &quot;{searchQuery}&quot;</>}
            </p>
          </div>

          {filteredListings.length === 0 ? (
            <div className="glass-card text-center !py-16">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-xl text-white mb-2">لا توجد نتائج</h3>
              <p className="text-gray-400">حاول تغيير كلمات البحث أو الفلترة</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <ListingCard listing={listing} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
