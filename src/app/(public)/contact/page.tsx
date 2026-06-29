'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">
            <span className="gradient-text">تواصل معنا</span>
          </h1>
          <p className="text-gray-400">نحن هنا لمساعدتك. اختر الطريقة الأنسب لك.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass-card">
              <h2 className="font-heading font-bold text-xl text-white mb-6">أرسل رسالة</h2>
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-secondary-500/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-secondary-400" />
                  </div>
                  <p className="text-white font-medium mb-2">تم إرسال رسالتك!</p>
                  <p className="text-sm text-gray-400">سنرد عليك في أقرب وقت ممكن.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="الاسم الكامل" className="input-field" />
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="رقم الهاتف" className="input-field" />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="البريد الإلكتروني (اختياري)" className="input-field" />
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="رسالتك..." className="input-field h-32 resize-none" />
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    إرسال
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="glass-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">هاتف</p>
                <p className="text-white font-medium">+963 9XX XXX XXX</p>
              </div>
            </div>
            <div className="glass-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">تليجرام / واتساب</p>
                <p className="text-white font-medium">@sham_bots</p>
              </div>
            </div>
            <div className="glass-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">بريد إلكتروني</p>
                <p className="text-white font-medium">info@sham-bots.com</p>
              </div>
            </div>
            <div className="glass-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">المقر الرئيسي</p>
                <p className="text-white font-medium">دمشق، سوريا</p>
              </div>
            </div>
            <div className="glass-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">أوقات الدعم</p>
                <p className="text-white font-medium">9 صباحاً - 11 مساءً (بتوقيت دمشق)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
