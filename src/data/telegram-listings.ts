import { TelegramListing } from '@/types'

export const telegramCategories = [
  { id: 'tech', nameAr: 'تقنية وبرمجة', icon: '💻', count: 45 },
  { id: 'news', nameAr: 'أخبار ومعلومات', icon: '📰', count: 78 },
  { id: 'edu', nameAr: 'تعليمية', icon: '📚', count: 34 },
  { id: 'business', nameAr: 'أعمال واقتصاد', icon: '💼', count: 23 },
  { id: 'entertainment', nameAr: 'ترفيه', icon: '🎮', count: 56 },
  { id: 'religious', nameAr: 'دينية', icon: '🕌', count: 29 },
  { id: 'health', nameAr: 'صحة وطب', icon: '🏥', count: 18 },
  { id: 'sports', nameAr: 'رياضة', icon: '⚽', count: 22 },
  { id: 'art', nameAr: 'فن وثقافة', icon: '🎨', count: 31 },
  { id: 'jobs', nameAr: 'وظائف وتوظيف', icon: '💼', count: 15 },
  { id: 'services', nameAr: 'خدمات', icon: '🛠️', count: 27 },
  { id: 'social', nameAr: 'اجتماعية', icon: '👥', count: 42 },
]

export const sampleListings: TelegramListing[] = [
  {
    id: '1', userId: 'u1', type: 'channel', telegramId: 'SyriaTechNews',
    title: 'أخبار التقنية سوريا',
    description: 'أحدث أخبار التقنية في سوريا والعالم العربي. أخبار عاجلة، مراجعات، وشروحات تقنية.',
    category: 'tech', subcategory: 'أخبار تقنية',
    governorateId: '1', membersCount: 15200, language: 'ar',
    isVerified: true, isFeatured: true,
    tags: ['تقنية', 'أخبار', 'شروحات', 'سوريا'],
    website: 'https://syriatech.com', contactPhone: '0934567890',
    avatarUrl: '', rating: 4.8, viewsCount: 45200, status: 'approved',
  },
  {
    id: '2', userId: 'u2', type: 'channel', telegramId: 'DamascusNews',
    title: 'أخبار دمشق',
    description: 'كل ما يحدث في دمشق من أخبار وفعاليات ومناسبات. تغطية شاملة للعاصمة.',
    category: 'news', subcategory: 'محلية',
    governorateId: '1', membersCount: 28300, language: 'ar',
    isVerified: true, isFeatured: true,
    tags: ['دمشق', 'أخبار', 'محلية', 'فعاليات'],
    avatarUrl: '', rating: 4.6, viewsCount: 89100, status: 'approved',
  },
  {
    id: '3', userId: 'u3', type: 'group', telegramId: 'DevsSyria',
    title: 'مبرمجي سوريا',
    description: 'مجموعة للمبرمجين والمطورين السوريين. نقاشات تقنية، مشاركة مشاريع، وطلبات عمل.',
    category: 'tech', subcategory: 'مجموعات برمجية',
    governorateId: '1', membersCount: 8900, language: 'ar',
    isVerified: false, isFeatured: false,
    tags: ['برمجة', 'تطوير', 'تقنية', 'مشاريع'],
    avatarUrl: '', rating: 4.5, viewsCount: 23400, status: 'approved',
  },
  {
    id: '4', userId: 'u4', type: 'bot', telegramId: 'SyriaWeatherBot',
    title: 'بوت الطقس سوريا',
    description: 'بوت يعرض حالة الطقس في جميع المدن السورية. تحديث يومي دقيق.',
    category: 'services', subcategory: 'بوتات خدمية',
    governorateId: '1', membersCount: 5600, language: 'ar',
    isVerified: true, isFeatured: false,
    tags: ['طقس', 'خدمة', 'معلومات'],
    website: '', contactPhone: '',
    avatarUrl: '', rating: 4.3, viewsCount: 12100, status: 'approved',
  },
  {
    id: '5', userId: 'u5', type: 'channel', telegramId: 'AleppoMarket',
    title: 'سوق حلب',
    description: 'سوق إلكتروني حلب. بيع وشراء، عقارات، سيارات، وظائف، وخدمات.',
    category: 'business', subcategory: 'تجارة',
    governorateId: '3', membersCount: 34100, language: 'ar',
    isVerified: true, isFeatured: true,
    tags: ['حلب', 'سوق', 'تجارة', 'بيع وشراء'],
    avatarUrl: '', rating: 4.7, viewsCount: 102300, status: 'approved',
  },
  {
    id: '6', userId: 'u6', type: 'group', telegramId: 'HomsChat',
    title: 'حمص تتحدث',
    description: 'مجموعة حوارية لأهالي حمص. نقاشات، فعاليات، وأخبار محلية.',
    category: 'social', subcategory: 'محلية',
    governorateId: '4', membersCount: 12400, language: 'ar',
    isVerified: false, isFeatured: false,
    tags: ['حمص', 'اجتماعي', 'محادثة'],
    avatarUrl: '', rating: 4.2, viewsCount: 35600, status: 'approved',
  },
  {
    id: '7', userId: 'u7', type: 'channel', telegramId: 'SyriaRecipes',
    title: 'وصفات سورية',
    description: 'قناة متخصصة في المطبخ السوري. وصفات تقليدية وعصرية بالصور والفيديو.',
    category: 'entertainment', subcategory: 'طبخ',
    governorateId: '1', membersCount: 21800, language: 'ar',
    isVerified: false, isFeatured: false,
    tags: ['طبخ', 'وصفات', 'مطبخ سوري', 'أكل'],
    avatarUrl: '', rating: 4.9, viewsCount: 67800, status: 'approved',
  },
  {
    id: '8', userId: 'u8', type: 'channel', telegramId: 'SyriaJobs',
    title: 'وظائف سوريا',
    description: 'أحدث فرص العمل في سوريا والخارج. وظائف حكومية، خاصة، وعن بعد.',
    category: 'jobs', subcategory: 'توظيف',
    governorateId: '1', membersCount: 45200, language: 'ar',
    isVerified: true, isFeatured: true,
    tags: ['وظائف', 'توظيف', 'عمل', 'فرص'],
    avatarUrl: '', rating: 4.6, viewsCount: 145000, status: 'approved',
  },
  {
    id: '9', userId: 'u9', type: 'bot', telegramId: 'SyriaDLBot',
    title: 'بوت تحميل',
    description: 'بوت تحميل الفيديو من يوتيوب، فيسبوك، انستغرام، وتويتر بجودة عالية.',
    category: 'services', subcategory: 'بوتات تحميل',
    governorateId: '1', membersCount: 34200, language: 'ar',
    isVerified: false, isFeatured: false,
    tags: ['تحميل', 'فيديو', 'يوتيوب', 'خدمة'],
    avatarUrl: '', rating: 4.1, viewsCount: 89000, status: 'approved',
  },
  {
    id: '10', userId: 'u10', type: 'channel', telegramId: 'LatakiaSea',
    title: 'اللاذقية عاصمة الساحل',
    description: 'قناة مصورة لمناظر اللاذقية الطبيعية والمواقع السياحية. صور عالية الجودة.',
    category: 'art', subcategory: 'تصوير',
    governorateId: '6', membersCount: 8700, language: 'ar',
    isVerified: false, isFeatured: false,
    tags: ['اللاذقية', 'تصوير', 'سياحة', 'طبيعة'],
    avatarUrl: '', rating: 4.8, viewsCount: 28900, status: 'approved',
  },
  {
    id: '11', userId: 'u11', type: 'channel', telegramId: 'QuranSyria',
    title: 'القرآن الكريم سوريا',
    description: 'تلاوات قرآنية، ختمات، وأذكار يومية. قرآن كريم بصوت أشهر القراء.',
    category: 'religious', subcategory: 'قرآن',
    governorateId: '1', membersCount: 76100, language: 'ar',
    isVerified: true, isFeatured: true,
    tags: ['قرآن', 'دين', 'إسلام', 'تلاوات'],
    avatarUrl: '', rating: 4.9, viewsCount: 234000, status: 'approved',
  },
  {
    id: '12', userId: 'u12', type: 'group', telegramId: 'FreeSyrianCourses',
    title: 'دورات مجانية',
    description: 'مجموعة تعلن عن دورات تدريبية مجانية في مختلف المجالات. تطوير مهني وشخصي.',
    category: 'edu', subcategory: 'دورات',
    governorateId: '1', membersCount: 19500, language: 'ar',
    isVerified: false, isFeatured: false,
    tags: ['دورات', 'تعليم', 'تدريب', 'مجاني'],
    avatarUrl: '', rating: 4.4, viewsCount: 45000, status: 'approved',
  },
]

export const featuredListings = sampleListings.filter(l => l.isFeatured)
export const verifiedListings = sampleListings.filter(l => l.isVerified)

export function getCategoryName(id: string): string {
  return telegramCategories.find(c => c.id === id)?.nameAr || id
}

export function getListingByType(type: 'channel' | 'group' | 'bot'): TelegramListing[] {
  return sampleListings.filter(l => l.type === type)
}

export function searchListings(query: string, filters?: {
  type?: string
  category?: string
  governorateId?: string
  minRating?: number
}): TelegramListing[] {
  let results = [...sampleListings]

  if (query) {
    const q = query.toLowerCase()
    results = results.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.description?.toLowerCase().includes(q) ||
      l.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  if (filters?.type) results = results.filter(l => l.type === filters.type)
  if (filters?.category) results = results.filter(l => l.category === filters.category)
  if (filters?.governorateId) results = results.filter(l => l.governorateId === filters.governorateId)
  if (filters?.minRating) results = results.filter(l => l.rating >= filters.minRating!)

  return results
}
