// ========== Core ==========
export interface User {
  id: string
  telegramId?: bigint
  whatsappId?: string
  email?: string
  phone?: string
  nameAr: string
  governorateId?: string
  districtId?: string
  role: UserRole
  avatarUrl?: string
  isVerified: boolean
  isActive: boolean
  createdAt: string
}

export type UserRole = 'super_admin' | 'admin' | 'agent' | 'merchant' | 'user'

export interface Session {
  id: string
  userId: string
  token: string
  expiresAt: string
}

export interface Subscription {
  id: string
  userId: string
  plan: PlanType
  status: SubscriptionStatus
  startedAt: string
  expiresAt?: string
  autoRenew: boolean
}

export type PlanType = 'free' | 'bronze' | 'silver' | 'gold' | 'black'
export type SubscriptionStatus = 'active' | 'inactive' | 'cancelled' | 'expired'

// ========== Governorates ==========
export interface Governorate {
  id: string
  nameAr: string
  nameEn: string
  code: string
  region: string
  isActive: boolean
  sortOrder: number
}

export interface District {
  id: string
  governorateId: string
  nameAr: string
  deliveryFee: number
  isActive: boolean
}

export interface CollectionAgent {
  id: string
  userId: string
  governorateId: string
  districtId?: string
  phone: string
  commissionPercent: number
  maxCollectionLimit: number
  isVerified: boolean
  isAvailable: boolean
  workingHours: WorkingHours
  location?: GeoLocation
  rating: number
}

export interface WorkingHours {
  [day: string]: { start: string; end: string } | null
}

export interface GeoLocation {
  lat: number
  lng: number
}

// ========== Bots ==========
export interface Bot {
  id: string
  userId: string
  name: string
  botType: BotType
  templateId?: string
  status: BotStatus
  platformConfig: PlatformConfig
  avatarUrl?: string
  description?: string
  language: string
  governorateId?: string
  isAiEnabled: boolean
  aiModel: string
  createdAt: string
}

export type BotType = 'telegram' | 'whatsapp' | 'facebook' | 'instagram' | 'multi'
export type BotStatus = 'draft' | 'active' | 'inactive' | 'paused' | 'error'

export interface PlatformConfig {
  token?: string
  webhook?: string
  businessId?: string
  appSecret?: string
}

export interface BotFlow {
  id: string
  botId: string
  name: string
  triggerType: TriggerType
  triggerConfig: Record<string, unknown>
  blocks: BotBlock[]
  isActive: boolean
  version: number
}

export type TriggerType = 'message' | 'button' | 'command' | 'schedule' | 'webhook'

export interface BotBlock {
  id: string
  type: BlockType
  position: { x: number; y: number }
  config: Record<string, unknown>
  connections: string[]
}

export type BlockType =
  | 'text_message'
  | 'image'
  | 'button'
  | 'menu'
  | 'form'
  | 'payment'
  | 'ai_chat'
  | 'condition'
  | 'api_call'
  | 'delay'
  | 'webhook'
  | 'email'
  | 'notification'

export interface BotConversation {
  id: string
  botId: string
  platform: string
  platformUserId: string
  userName: string
  status: ConversationStatus
  context: Record<string, unknown>
  startedAt: string
  updatedAt: string
}

export type ConversationStatus = 'open' | 'closed' | 'pending'

export interface BotMessage {
  id: string
  conversationId: string
  direction: 'incoming' | 'outgoing'
  messageType: string
  content: Record<string, unknown>
  isAiGenerated: boolean
  aiModelUsed?: string
  tokensUsed?: number
  createdAt: string
}

export interface BotTemplate {
  id: string
  name: string
  description: string
  category: string
  thumbnailUrl?: string
  flowData: BotBlock[]
  isPremium: boolean
  priceSyp?: number
  priceUsd?: number
  downloadsCount: number
  rating: number
}

// ========== Telegram Directory ==========
export interface TelegramListing {
  id: string
  userId: string
  type: 'channel' | 'group' | 'bot'
  telegramId: string
  title: string
  description?: string
  category: string
  subcategory?: string
  governorateId?: string
  membersCount: number
  language: string
  isVerified: boolean
  isFeatured: boolean
  tags: string[]
  website?: string
  contactPhone?: string
  avatarUrl?: string
  rating: number
  viewsCount: number
  status: 'pending' | 'approved' | 'rejected'
}

// ========== Restaurants ==========
export interface Restaurant {
  id: string
  userId: string
  nameAr: string
  nameEn?: string
  description?: string
  logoUrl?: string
  coverUrl?: string
  governorateId: string
  districtId?: string
  address?: string
  phone: string
  whatsappNumber: string
  telegramUsername?: string
  workingHours: WorkingHours
  isOpen: boolean
  deliveryAvailable: boolean
  deliveryFee: number
  minOrder: number
  rating: number
  subscriptionTier: SubscriptionTier
  qrCodeUrl?: string
}

export type SubscriptionTier = 'basic' | 'pro' | 'premium' | 'enterprise'

export interface MenuCategory {
  id: string
  restaurantId: string
  nameAr: string
  nameEn?: string
  icon?: string
  sortOrder: number
  isActive: boolean
}

export interface MenuItem {
  id: string
  restaurantId: string
  categoryId: string
  nameAr: string
  nameEn?: string
  descriptionAr?: string
  descriptionEn?: string
  priceSyp: number
  priceUsd?: number
  images: string[]
  isAvailable: boolean
  hasExtras: boolean
  extras: MenuExtra[]
  prepTime?: number
  tags: string[]
}

export interface MenuExtra {
  name: string
  price: number
}

// ========== E-commerce ==========
export interface Store {
  id: string
  userId: string
  name: string
  description?: string
  slug: string
  logoUrl?: string
  coverUrl?: string
  governorateId: string
  phone: string
  whatsappNumber: string
  deliveryAvailable: boolean
  deliveryFee: number
  freeDeliveryMin: number
  isActive: boolean
}

export interface Product {
  id: string
  storeId: string
  nameAr: string
  nameEn?: string
  descriptionAr?: string
  descriptionEn?: string
  priceSyp: number
  priceUsd?: number
  compareAtPrice?: number
  stock: number
  images: string[]
  categoryId?: string
  tags: string[]
  variants: ProductVariant[]
  isFeatured: boolean
  isActive: boolean
  rating: number
  reviewsCount: number
}

export interface ProductVariant {
  name: string
  options: string[]
}

export interface Order {
  id: string
  userId: string
  storeId: string
  orderNumber: string
  items: OrderItem[]
  totalSyp: number
  totalUsd?: number
  status: OrderStatus
  paymentMethod: string
  paymentStatus: PaymentStatus
  collectionAgentId?: string
  shippingAddress?: string
  governorateId: string
  notes?: string
  createdAt: string
}

export interface OrderItem {
  productId: string
  variant?: string
  quantity: number
  price: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'partial'

// ========== Customer Service ==========
export interface Ticket {
  id: string
  botId?: string
  userId: string
  assignedTo?: string
  subject: string
  description?: string
  category: TicketCategory
  priority: TicketPriority
  source: TicketSource
  status: TicketStatus
  firstResponseAt?: string
  resolvedAt?: string
  satisfactionScore?: number
  createdAt: string
}

export type TicketCategory = 'complaint' | 'inquiry' | 'technical' | 'sales' | 'other'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TicketSource = 'telegram' | 'whatsapp' | 'facebook' | 'instagram' | 'email' | 'website'
export type TicketStatus = 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed'

export interface TicketMessage {
  id: string
  ticketId: string
  senderId: string
  senderType: 'customer' | 'agent' | 'ai' | 'system'
  message: string
  attachments: string[]
  isInternal: boolean
  createdAt: string
}

// ========== Payments ==========
export interface Invoice {
  id: string
  invoiceNumber: string
  userId: string
  orderId?: string
  totalSyp: number
  totalUsd?: number
  status: InvoiceStatus
  dueDate?: string
  paidAt?: string
  qrCodeUrl?: string
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

export interface Payment {
  id: string
  orderId: string
  userId: string
  agentId?: string
  method: PaymentMethod
  amountSyp: number
  amountUsd?: number
  exchangeRate: number
  status: PaymentTransactionStatus
}

export type PaymentMethod = 'cash_hand' | 'cash_delivery' | 'bank_transfer' | 'stripe' | 'paypal' | 'wallet'
export type PaymentTransactionStatus = 'pending' | 'collected' | 'confirmed' | 'cancelled' | 'refunded'

export interface Wallet {
  id: string
  userId: string
  balanceSyp: number
  balanceUsd: number
  isFrozen: boolean
}

export interface WalletTransaction {
  id: string
  walletId: string
  type: 'credit' | 'debit'
  amountSyp: number
  amountUsd?: number
  referenceType: string
  status: 'pending' | 'completed' | 'failed'
  description?: string
  createdAt: string
}

export interface Commission {
  id: string
  agentId: string
  orderId: string
  amountSyp: number
  amountUsd?: number
  percent: number
  status: 'pending' | 'paid' | 'cancelled'
}

// ========== Analytics ==========
export interface AnalyticsEvent {
  id: string
  eventType: string
  userId?: string
  governorateId?: string
  botId?: string
  metadata: Record<string, unknown>
  createdAt: string
}

export interface DailyMetric {
  date: string
  governorateId?: string
  metricName: string
  metricValue: number
}

// ========== AI ==========
export interface AIResponse {
  text: string
  model: string
  tokensUsed: number
  latency: number
}

export interface IntentAnalysis {
  intent: string
  confidence: number
  entities: Record<string, string>
  sentiment: 'positive' | 'neutral' | 'negative'
  language: string
}

// ========== API ==========
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
  totalPages: number
}
