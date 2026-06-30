'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, MapPin, Phone, Clock, QrCode, ShoppingCart, Plus, Minus, MessageCircle, Utensils } from 'lucide-react'
import { getRestaurantById, getCategoriesByRestaurant, getMenuByCategory, getMenuByRestaurant } from '@/data/restaurants'
import { useAppStore } from '@/lib/store/app-store'
import { cn } from '@/lib/utils'
import { MenuItem } from '@/types'

interface CartItem {
  item: MenuItem
  quantity: number
  extras: { name: string; price: number }[]
}

export default function RestaurantMenuPage() {
  const { id } = useParams<{ id: string }>()
  const { currency } = useAppStore()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const restaurant = getRestaurantById(id)
  const categories = getCategoriesByRestaurant(id)
  const allItems = getMenuByRestaurant(id)

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Utensils className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold text-white mb-2">المطعم غير موجود</h2>
          <Link href="/restaurants" className="btn-primary inline-block mt-4">
            العودة للمطاعم
          </Link>
        </div>
      </div>
    )
  }

  const displayItems = activeCategory
    ? getMenuByCategory(id, activeCategory)
    : allItems

  const totalCart = cart.reduce((sum, ci) => {
    const extrasTotal = ci.extras.reduce((eSum, e) => eSum + e.price, 0)
    return sum + (ci.item.priceSyp + extrasTotal) * ci.quantity
  }, 0)

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.item.id === item.id)
      if (existing) {
        return prev.map(ci => ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci)
      }
      return [...prev, { item, quantity: 1, extras: [] }]
    })
    setShowCart(true)
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.item.id === itemId)
      if (existing && existing.quantity > 1) {
        return prev.map(ci => ci.item.id === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci)
      }
      return prev.filter(ci => ci.item.id !== itemId)
    })
  }

  const orderViaWhatsApp = () => {
    const message = cart.map(ci =>
      `${ci.item.nameAr} x${ci.quantity}${ci.extras.length ? ` (${ci.extras.map(e => e.name).join(', ')})` : ''}`
    ).join('%0A')
    const total = totalCart.toLocaleString()
    const text = `طلب جديد من ${restaurant.nameAr}:%0A%0A${message}%0A%0Aالإجمالي: ${total} ل.س`
    window.open(`https://wa.me/${restaurant.whatsappNumber}?text=${text}`, '_blank')
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/restaurants" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowRight className="w-4 h-4" />
          العودة للمطاعم
        </Link>

        {/* Restaurant Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card !p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-heading text-3xl font-bold text-white mb-2">{restaurant.nameAr}</h1>
              <p className="text-gray-400 mb-4">{restaurant.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {restaurant.rating}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {restaurant.address}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {restaurant.phone}
                </span>
                {restaurant.deliveryAvailable && (
                  <span className="px-3 py-1 rounded-full bg-secondary-500/10 text-secondary-400 text-xs">
                    توصيل: {(restaurant.deliveryFee ?? 0).toLocaleString()} ل.س
                  </span>
                )}
              </div>
            </div>
            {/* QR Code */}
            <div className="w-24 h-24 rounded-xl bg-white p-2 flex-shrink-0">
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                <QrCode className="w-10 h-10 text-gray-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn('px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
              !activeCategory ? 'bg-primary-500 text-white' : 'glass text-gray-400 hover:text-white'
            )}
          >
            الكل
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn('px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                activeCategory === cat.id ? 'bg-primary-500 text-white' : 'glass text-gray-400 hover:text-white'
              )}
            >
              {cat.icon} {cat.nameAr}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={cn('glass-card card-hover group', !item.isAvailable && 'opacity-50')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white group-hover:text-primary-400 transition-colors">
                    {item.nameAr}
                  </h3>
                  {item.descriptionAr && (
                    <p className="text-sm text-gray-400 mt-1">{item.descriptionAr}</p>
                  )}
                </div>
                {!item.isAvailable && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px]">غير متوفر</span>
                )}
              </div>

              {item.extras.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.extras.map((ext) => (
                    <span key={ext.name} className="px-2 py-0.5 rounded bg-dark-tertiary text-[10px] text-gray-500">
                      {ext.name}: {ext.price.toLocaleString()} ل.س
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-auto">
                <span className="font-heading font-bold text-lg gradient-text">
                  {currency === 'syp' ? `${item.priceSyp.toLocaleString()} ل.س` : `$${item.priceUsd?.toFixed(1) || ''}`}
                </span>
                {item.isAvailable && (
                  <button
                    onClick={() => addToCart(item)}
                    className="w-10 h-10 rounded-xl bg-primary-500/20 text-primary-400 hover:bg-primary-500 hover:text-white transition-all flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Floating Button */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-6 right-6 z-50 max-w-md mx-auto"
        >
          <div className="glass rounded-2xl p-4 border border-primary-500/30 shadow-lg shadow-primary-500/10">
            {showCart && (
              <div className="mb-3 space-y-2 max-h-40 overflow-y-auto">
                {cart.map((ci) => (
                  <div key={ci.item.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{ci.item.nameAr} x{ci.quantity}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">
                        {((ci.item.priceSyp + ci.extras.reduce((s, e) => s + e.price, 0)) * ci.quantity).toLocaleString()} ل.س
                      </span>
                      <button onClick={() => removeFromCart(ci.item.id)} className="w-6 h-6 rounded-lg bg-dark-tertiary flex items-center justify-center hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all">
                        <Minus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-400">الإجمالي</span>
                <span className="font-heading font-bold text-lg gradient-text block">
                  {totalCart.toLocaleString()} ل.س
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="btn-secondary !py-2 !px-3 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  ({cart.reduce((s, ci) => s + ci.quantity, 0)})
                </button>
                <button
                  onClick={orderViaWhatsApp}
                  className="btn-primary !py-2 !px-4 text-sm flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  أطلب عبر واتساب
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
