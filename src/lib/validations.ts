import { z } from 'zod'

export const phoneSchema = z.string().regex(/^0[0-9]{9}$/, 'رقم هاتف غير صحيح')

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل').optional(),
})

export const registerSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(6, 'كلمة المرور قصيرة جداً').max(128, 'كلمة المرور طويلة جداً'),
  nameAr: z.string().min(2, 'الاسم قصير جداً').max(100),
})

export const orderSchema = z.object({
  storeId: z.string().uuid('معرف المتجر غير صحيح'),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().min(1),
    priceSyp: z.number().positive(),
    priceUsd: z.number().positive().optional(),
  })).min(1, 'يجب إضافة منتج واحد على الأقل'),
  totalSyp: z.number().positive('المبلغ الإجمالي يجب أن يكون موجباً'),
  totalUsd: z.number().positive().optional(),
  governorateId: z.string().optional(),
  notes: z.string().max(500).optional(),
})

export const botSchema = z.object({
  name: z.string().min(2, 'اسم البوت قصير جداً').max(100),
  botType: z.enum(['custom', 'telegram', 'whatsapp', 'store', 'support', 'booking']),
  templateId: z.string().uuid().optional(),
  description: z.string().max(1000).optional(),
  governorateId: z.string().optional(),
  isAiEnabled: z.boolean().optional(),
})

export const storeSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'slug must be lowercase letters, numbers, and hyphens'),
  governorateId: z.string(),
  phone: phoneSchema,
  whatsappNumber: z.string(),
  description: z.string().max(1000).optional(),
})

export const restaurantSchema = z.object({
  nameAr: z.string().min(2).max(100),
  governorateId: z.string(),
  phone: phoneSchema,
  whatsappNumber: z.string(),
  description: z.string().max(1000).optional(),
})

export const ticketSchema = z.object({
  subject: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  category: z.enum(['technical', 'billing', 'feature', 'other']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
})

export const ticketMessageSchema = z.object({
  message: z.string().min(1, 'الرسالة مطلوبة').max(5000),
  attachments: z.array(z.string()).optional(),
})

export const walletTopupSchema = z.object({
  amountSyp: z.number().positive(),
  method: z.enum(['cash', 'card', 'wallet']),
})

export const telegramListingSchema = z.object({
  type: z.enum(['channel', 'group', 'bot']),
  telegramId: z.string().min(1),
  title: z.string().min(2).max(200),
  category: z.string().min(1),
  governorateId: z.string().optional(),
  description: z.string().max(2000).optional(),
})
