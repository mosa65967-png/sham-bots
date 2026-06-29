'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Headphones, MessageCircle, Send, Bot, Search, Plus, X, Clock, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Ticket {
  id: string
  subject: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  createdAt: string
  lastMessage: string
}

const sampleTickets: Ticket[] = [
  { id: 't1', subject: 'مشكلة في تسجيل الدخول', status: 'open', priority: 'high', category: 'technical', createdAt: '2026-06-29T10:00', lastMessage: 'قبل 30 دقيقة' },
  { id: 't2', subject: 'استفسار عن الباقة الفضية', status: 'in_progress', priority: 'medium', category: 'inquiry', createdAt: '2026-06-28T15:00', lastMessage: 'قبل ساعتين' },
  { id: 't3', subject: 'طلب تصميم بوت مخصص', status: 'resolved', priority: 'low', category: 'other', createdAt: '2026-06-27T09:00', lastMessage: 'أمس' },
]

const priorityColors = {
  low: 'bg-gray-500/20 text-gray-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-orange-500/20 text-orange-400',
  urgent: 'bg-red-500/20 text-red-400',
}

const statusIcons = {
  open: Clock,
  in_progress: MessageCircle,
  resolved: CheckCircle2,
  closed: X,
}

export default function SupportPage() {
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [activeTicket, setActiveTicket] = useState<string | null>(null)
  const [newTicket, setNewTicket] = useState({ subject: '', category: 'technical', description: '' })
  const [chatMessage, setChatMessage] = useState('')
  const [chat, setChat] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'مرحباً بك في دعم شام بوتس! كيف يمكنني مساعدتك؟ 😊' },
  ])

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return
    setChat(prev => [...prev, { sender: 'user', text: chatMessage }])
    setChatMessage('')
    setTimeout(() => {
      setChat(prev => [...prev, {
        sender: 'ai',
        text: 'شكراً لتواصلك! تم استلام رسالتك. أحد فريق الدعم سيرد عليك قريباً. أو يمكنك إنشاء تذكرة للمتابعة.'
      }])
    }, 1000)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">
            <span className="gradient-text">خدمة العملاء</span>
          </h1>
          <p className="text-gray-400 text-lg">نظام دعم متكامل مع رد آلي بالذكاء الاصطناعي</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tickets Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg text-white">تذاكري</h2>
              <button onClick={() => setShowNewTicket(!showNewTicket)} className="btn-primary !py-1.5 !px-3 text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" />
                جديدة
              </button>
            </div>

            {showNewTicket && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass-card">
                <h3 className="font-heading font-bold text-sm text-white mb-3">تذكرة جديدة</h3>
                <div className="space-y-3">
                  <input type="text" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} placeholder="عنوان التذكرة" className="input-field text-sm" />
                  <select value={newTicket.category} onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })} className="input-field text-sm">
                    <option value="technical">مشكلة تقنية</option>
                    <option value="inquiry">استفسار</option>
                    <option value="complaint">شكوى</option>
                    <option value="sales">مبيعات</option>
                    <option value="other">أخرى</option>
                  </select>
                  <textarea value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} placeholder="وصف المشكلة..." className="input-field h-20 resize-none text-sm" />
                  <button className="btn-primary w-full text-sm">إرسال التذكرة</button>
                </div>
              </motion.div>
            )}

            <div className="space-y-3">
              {sampleTickets.map((ticket) => {
                const StatusIcon = statusIcons[ticket.status]
                return (
                  <button
                    key={ticket.id}
                    onClick={() => setActiveTicket(ticket.id)}
                    className={cn('w-full glass-card !p-4 text-right card-hover', activeTicket === ticket.id && 'border-primary-500/50')}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-heading font-bold text-sm text-white">{ticket.subject}</h4>
                      <StatusIcon className={cn('w-4 h-4', ticket.status === 'resolved' ? 'text-green-400' : 'text-gray-500')} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('px-2 py-0.5 rounded text-[10px]', priorityColors[ticket.priority])}>{ticket.priority === 'urgent' ? 'عاجل' : ticket.priority === 'high' ? 'مهم' : ticket.priority === 'medium' ? 'متوسط' : 'عادي'}</span>
                      <span className="text-[10px] text-gray-500">{ticket.lastMessage}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-2 glass-card !p-0 flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-4 border-b border-dark-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">AI Assistant</p>
                <p className="text-[10px] text-green-400">نشط</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chat.map((msg, i) => (
                <div key={i} className={cn('flex', msg.sender === 'user' ? 'justify-start' : 'justify-end')}>
                  <div className={cn(
                    'max-w-[80%] p-3 rounded-2xl text-sm',
                    msg.sender === 'user'
                      ? 'bg-dark-tertiary text-gray-300 rounded-br-sm'
                      : 'bg-primary-500/20 text-gray-200 rounded-bl-sm'
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-dark-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="اكتب رسالتك..."
                  className="input-field flex-1"
                />
                <button onClick={handleSendMessage} className="btn-primary !py-0 !px-4">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-gray-600 mt-2">مدعوم بالذكاء الاصطناعي · قد يحدث خطأ، تحقق من المعلومات المهمة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
