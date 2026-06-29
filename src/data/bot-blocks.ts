export interface BlockDefinition {
  type: string
  nameAr: string
  nameEn: string
  icon: string
  category: 'messaging' | 'interaction' | 'ai' | 'commerce' | 'data' | 'integration' | 'flow' | 'security'
  description: string
  color: string
  defaultConfig: Record<string, unknown>
}

export const blockDefinitions: BlockDefinition[] = [
  // Messaging
  { type: 'text_message', nameAr: 'رسالة نصية', nameEn: 'Text Message', icon: '💬', category: 'messaging', description: 'إرسال رسالة نصية للمستخدم', color: 'from-blue-500 to-cyan-500', defaultConfig: { text: '', buttons: [] } },
  { type: 'image', nameAr: 'صورة', nameEn: 'Image', icon: '🖼️', category: 'messaging', description: 'إرسال صورة مع تعليق', color: 'from-green-500 to-emerald-500', defaultConfig: { url: '', caption: '' } },
  { type: 'video', nameAr: 'فيديو', nameEn: 'Video', icon: '🎥', category: 'messaging', description: 'إرسال فيديو', color: 'from-red-500 to-rose-500', defaultConfig: { url: '', caption: '' } },
  { type: 'voice', nameAr: 'رسالة صوتية', nameEn: 'Voice Message', icon: '🎤', category: 'messaging', description: 'إرسال رسالة صوتية', color: 'from-purple-500 to-violet-500', defaultConfig: { url: '' } },
  { type: 'location', nameAr: 'موقع', nameEn: 'Location', icon: '📍', category: 'messaging', description: 'مشاركة موقع جغرافي', color: 'from-amber-500 to-orange-500', defaultConfig: { lat: 33.5, lng: 36.3, address: 'دمشق' } },

  // Interaction
  { type: 'buttons', nameAr: 'أزرار', nameEn: 'Buttons', icon: '🔘', category: 'interaction', description: 'إضافة أزرار تفاعلية', color: 'from-pink-500 to-rose-500', defaultConfig: { buttons: [{ text: 'خيار 1', value: 'option1' }], columns: 2 } },
  { type: 'menu', nameAr: 'قائمة', nameEn: 'Menu', icon: '📋', category: 'interaction', description: 'عرض قائمة اختيارات', color: 'from-indigo-500 to-purple-500', defaultConfig: { items: [{ text: 'عنصر 1', value: 'item1' }] } },
  { type: 'poll', nameAr: 'استطلاع', nameEn: 'Poll', icon: '📊', category: 'interaction', description: 'إنشاء استطلاع رأي', color: 'from-teal-500 to-cyan-500', defaultConfig: { question: '', options: ['خيار 1', 'خيار 2'] } },
  { type: 'carousel', nameAr: 'معرض منتجات', nameEn: 'Product Carousel', icon: '🎠', category: 'interaction', description: 'عرض منتجات بشكل دائري', color: 'from-yellow-500 to-amber-500', defaultConfig: { products: [] } },

  // AI & Logic
  { type: 'ai_chat', nameAr: 'دردشة ذكية', nameEn: 'AI Chat', icon: '🧠', category: 'ai', description: 'محادثة بالذكاء الاصطناعي', color: 'from-emerald-500 to-teal-500', defaultConfig: { model: 'gemini-flash', prompt: 'كن مساعداً مفيداً', temperature: 0.7 } },
  { type: 'intent', nameAr: 'كشف النية', nameEn: 'Intent Detection', icon: '🎯', category: 'ai', description: 'كشف نية المستخدم', color: 'from-cyan-500 to-blue-500', defaultConfig: { intents: [{ name: 'استفسار', examples: ['ما هو', 'كيف'] }] } },
  { type: 'sentiment', nameAr: 'تحليل المشاعر', nameEn: 'Sentiment Analysis', icon: '😊', category: 'ai', description: 'تحليل مشاعر المستخدم', color: 'from-rose-500 to-pink-500', defaultConfig: { actions: { positive: '', negative: '', neutral: '' } } },
  { type: 'condition', nameAr: 'شرط', nameEn: 'Condition', icon: '🔀', category: 'flow', description: 'تفرع بناءً على شرط', color: 'from-orange-500 to-red-500', defaultConfig: { field: '', operator: 'equals', value: '' } },

  // Commerce
  { type: 'products', nameAr: 'عرض منتجات', nameEn: 'Show Products', icon: '🛍️', category: 'commerce', description: 'عرض كتالوج المنتجات', color: 'from-amber-500 to-yellow-500', defaultConfig: { category: '', limit: 10 } },
  { type: 'cart', nameAr: 'سلة الشراء', nameEn: 'Shopping Cart', icon: '🛒', category: 'commerce', description: 'عرض سلة المشتريات', color: 'from-green-500 to-emerald-500', defaultConfig: { editable: true } },
  { type: 'checkout', nameAr: 'إتمام الشراء', nameEn: 'Checkout', icon: '💳', category: 'commerce', description: 'إتمام عملية الشراء', color: 'from-blue-500 to-indigo-500', defaultConfig: { paymentMethods: ['cash', 'wallet'] } },
  { type: 'invoice', nameAr: 'فاتورة', nameEn: 'Invoice', icon: '📄', category: 'commerce', description: 'إرسال فاتورة', color: 'from-purple-500 to-violet-500', defaultConfig: { includeQR: true } },

  // Data
  { type: 'form', nameAr: 'نموذج', nameEn: 'Form', icon: '📝', category: 'data', description: 'جمع بيانات من المستخدم', color: 'from-sky-500 to-blue-500', defaultConfig: { fields: [{ name: '', type: 'text', label: '', required: true }] } },
  { type: 'database', nameAr: 'قاعدة بيانات', nameEn: 'Database', icon: '🗄️', category: 'data', description: 'بحث أو حفظ في قاعدة البيانات', color: 'from-gray-500 to-slate-500', defaultConfig: { action: 'save', collection: '' } },

  // Integration
  { type: 'api_call', nameAr: 'استدعاء API', nameEn: 'API Call', icon: '🔗', category: 'integration', description: 'استدعاء API خارجي', color: 'from-violet-500 to-purple-500', defaultConfig: { method: 'GET', url: '', headers: {} } },
  { type: 'webhook', nameAr: 'Webhook', nameEn: 'Webhook', icon: '🪝', category: 'integration', description: 'إرسال Webhook', color: 'from-fuchsia-500 to-pink-500', defaultConfig: { url: '', event: '' } },

  // Flow
  { type: 'delay', nameAr: 'تأخير', nameEn: 'Delay', icon: '⏱️', category: 'flow', description: 'انتظار مدة زمنية', color: 'from-stone-500 to-neutral-500', defaultConfig: { seconds: 5 } },
  { type: 'schedule', nameAr: 'مجدول', nameEn: 'Schedule', icon: '⏰', category: 'flow', description: 'إرسال في وقت محدد', color: 'from-red-500 to-rose-500', defaultConfig: { cron: '0 9 * * *', message: '' } },
  { type: 'loop', nameAr: 'تكرار', nameEn: 'Loop', icon: '🔄', category: 'flow', description: 'تكرار مجموعة بلوكات', color: 'from-cyan-500 to-teal-500', defaultConfig: { count: 3 } },
]

export const blockCategories = [
  { id: 'messaging', nameAr: 'الرسائل', icon: '💬', color: 'text-blue-400' },
  { id: 'interaction', nameAr: 'التفاعل', icon: '🎯', color: 'text-pink-400' },
  { id: 'ai', nameAr: 'الذكاء الاصطناعي', icon: '🧠', color: 'text-emerald-400' },
  { id: 'commerce', nameAr: 'التجارة', icon: '🛍️', color: 'text-amber-400' },
  { id: 'data', nameAr: 'البيانات', icon: '📊', color: 'text-sky-400' },
  { id: 'integration', nameAr: 'التكامل', icon: '🔗', color: 'text-violet-400' },
  { id: 'flow', nameAr: 'التحكم', icon: '⚙️', color: 'text-orange-400' },
]

export function getBlockDef(type: string): BlockDefinition | undefined {
  return blockDefinitions.find(b => b.type === type)
}

export function getBlocksByCategory(category: string): BlockDefinition[] {
  return blockDefinitions.filter(b => b.category === category)
}
