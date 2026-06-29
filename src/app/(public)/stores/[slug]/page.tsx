'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Star, ShoppingBag, MapPin, Phone, MessageCircle, Plus, Minus, ArrowLeft } from 'lucide-react'

const storesData: Record<string, { id: string; name: string; slug: string; description: string; phone: string; whatsapp: string; governorate: string; rating: number }> = {
  'electronics': { id: 's1', name: 'متجر الإلكترونيات', slug: 'electronics', description: 'أجهزة إلكترونية، جوالات، لابتوبات، واكسسوارات', phone: '011-2345678', whatsapp: '963933456789', governorate: 'دمشق', rating: 4.6 },
  'damascus-fashion': { id: 's2', name: 'موضة دمشق', slug: 'damascus-fashion', description: 'أزياء عصرية وتقليدية، ماركات عالمية', phone: '011-8765432', whatsapp: '963933567890', governorate: 'دمشق', rating: 4.3 },
  'aleppo-market': { id: 's3', name: 'سوق حلب الإلكتروني', slug: 'aleppo-market', description: 'منتجات متنوعة بأسعار الجملة', phone: '021-3456789', whatsapp: '963934567890', governorate: 'حلب', rating: 4.7 },
}

const productsData: Record<string, { id: string; name: string; price: number; image: string; storeId: string }[]> = {
  's1': [
    { id: 'p1', name: 'هاتف ذكي Samsung', price: 350000, image: '', storeId: 's1' },
    { id: 'p2', name: 'لابتوب Lenovo', price: 850000, image: '', storeId: 's1' },
    { id: 'p3', name: 'سماعات Bluetooth', price: 45000, image: '', storeId: 's1' },
    { id: 'p4', name: 'شاحن متنقل 20000mAh', price: 35000, image: '', storeId: 's1' },
  ],
  's2': [
    { id: 'p5', name: 'فستان سهرة', price: 120000, image: '', storeId: 's2' },
    { id: 'p6', name: 'بدلة رجالية', price: 250000, image: '', storeId: 's2' },
  ],
  's3': [
    { id: 'p7', name: 'طقم أواني منزلية', price: 65000, image: '', storeId: 's3' },
    { id: 'p8', name: 'مفارش سرير فاخرة', price: 45000, image: '', storeId: 's3' },
    { id: 'p9', name: 'منتجات عناية بالبشرة', price: 25000, image: '', storeId: 's3' },
  ],
}

export default function StoreDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const store = storesData[slug]
  const [cart, setCart] = useState<Record<string, number>>({})
  const [showCart, setShowCart] = useState(false)

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-white mb-4">المتجر غير موجود</h1>
          <Link href="/stores" className="text-primary-400 hover:underline">عودة للمتاجر</Link>
        </div>
      </div>
    )
  }

  const products = productsData[store.id] || []
  const cartItems = Object.entries(cart).filter(([, qty]) => qty > 0)
  const totalPrice = cartItems.reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === id)
    return sum + (product?.price || 0) * qty
  }, 0)

  const toggleCart = (id: string, delta: number) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }))
  }

  const orderMessage = cartItems.map(([id, qty]) => {
    const p = products.find(pr => pr.id === id)
    return `${p?.name} x${qty}`
  }).join('\n')

  const whatsappUrl = `https://wa.me/${store.whatsapp}?text=طلب جديد من ${store.name}:\n${orderMessage}\n\nالمجموع: ${totalPrice.toLocaleString()} ل.س`

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/stores" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          عودة للمتاجر
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass-card mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold text-white">{store.name}</h1>
                  <p className="text-sm text-gray-400 mb-1">{store.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{store.governorate}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" />{store.rating}</span>
                    <span className="flex items-center gap-1"><ShoppingBag className="w-3 h-3" />{products.length} منتج</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${store.phone}`} className="btn-secondary !py-2 !px-3 text-xs"><Phone className="w-4 h-4" /></a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !py-2 !px-3 text-xs"><MessageCircle className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-xl text-white">المنتجات</h2>
            {cartItems.length > 0 && (
              <button onClick={() => setShowCart(!showCart)} className="text-sm text-primary-400 hover:text-primary-300">
                السلة ({cartItems.length})
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {products.map((product) => (
              <div key={product.id} className="glass-card">
                <div className="h-32 rounded-xl bg-gradient-to-br from-dark-tertiary to-dark-border flex items-center justify-center mb-3">
                  <ShoppingBag className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="font-heading font-bold text-sm text-white mb-1">{product.name}</h3>
                <p className="text-sm gradient-text font-bold mb-3">{product.price.toLocaleString()} ل.س</p>
                <div className="flex items-center gap-2">
                  {cart[product.id] ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleCart(product.id, -1)} className="w-8 h-8 rounded-lg bg-dark-tertiary flex items-center justify-center text-gray-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm text-white w-6 text-center">{cart[product.id]}</span>
                      <button onClick={() => toggleCart(product.id, 1)} className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white"><Plus className="w-3 h-3" /></button>
                    </div>
                  ) : (
                    <button onClick={() => toggleCart(product.id, 1)} className="btn-primary flex-1 text-xs !py-2">أضف للسلة</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {showCart && cartItems.length > 0 && (
            <div className="glass-card">
              <h3 className="font-heading font-bold text-lg text-white mb-4">سلة المشتريات</h3>
              <div className="space-y-3 mb-4">
                {cartItems.map(([id, qty]) => {
                  const p = products.find(pr => pr.id === id)
                  if (!p) return null
                  return (
                    <div key={id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{p.name} × {qty}</span>
                      <span className="text-white">{(p.price * qty).toLocaleString()} ل.س</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-dark-border pt-3 flex items-center justify-between mb-4">
                <span className="font-heading font-bold text-white">المجموع</span>
                <span className="font-heading font-bold gradient-text text-lg">{totalPrice.toLocaleString()} ل.س</span>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                أرسل الطلب عبر واتساب
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
