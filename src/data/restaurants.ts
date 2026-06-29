import { Restaurant, MenuCategory, MenuItem } from '@/types'

export const sampleRestaurants: Restaurant[] = [
  {
    id: 'r1', userId: 'u1', nameAr: 'مطعم الشام', nameEn: 'Al Sham Restaurant',
    description: 'مطعم سوري تقليدي يقدم أشهى المأكولات الدمشقية. دجاج على الفحم، مناقيش، ومقبلات.',
    logoUrl: '', coverUrl: '',
    governorateId: '1', districtId: 'd1-1', address: 'المزة، شارع بغداد',
    phone: '011-1234567', whatsappNumber: '963933456789', telegramUsername: 'AlShamRestaurant',
    workingHours: { 'sat': { start: '09:00', end: '23:00' }, 'sun': { start: '09:00', end: '23:00' } },
    isOpen: true, deliveryAvailable: true, deliveryFee: 5000, minOrder: 25000,
    rating: 4.7, subscriptionTier: 'premium', qrCodeUrl: '',
  },
  {
    id: 'r2', userId: 'u2', nameAr: 'بيتزا حلب', nameEn: 'Aleppo Pizza',
    description: 'بيتزا إيطالية بجودة عالمية. عجينة طازجة، جبنة موتزاريلا، وأفضل المكونات.',
    logoUrl: '', coverUrl: '',
    governorateId: '3', districtId: 'd3-1', address: 'حلب، الجميلية',
    phone: '021-7654321', whatsappNumber: '963933567890', telegramUsername: 'AleppoPizza',
    workingHours: { 'all': { start: '10:00', end: '00:00' }, },
    isOpen: true, deliveryAvailable: true, deliveryFee: 7000, minOrder: 30000,
    rating: 4.5, subscriptionTier: 'pro', qrCodeUrl: '',
  },
  {
    id: 'r3', userId: 'u3', nameAr: 'مشاوي اللاذقية', nameEn: 'Latakia Grill',
    description: 'مشاوي بحرية ولحوم طازجة. إطلالة على البحر، أكل صحي ولذيذ.',
    logoUrl: '', coverUrl: '',
    governorateId: '6', address: 'اللاذقية، الكورنيش',
    phone: '041-9876543', whatsappNumber: '963944567890', telegramUsername: '',
    workingHours: { 'all': { start: '12:00', end: '23:00' } },
    isOpen: true, deliveryAvailable: false, deliveryFee: 0, minOrder: 0,
    rating: 4.8, subscriptionTier: 'basic', qrCodeUrl: '',
  },
]

export const sampleCategories: Record<string, MenuCategory[]> = {
  'r1': [
    { id: 'mc1', restaurantId: 'r1', nameAr: 'مقبلات', nameEn: 'Appetizers', icon: '🥗', sortOrder: 1, isActive: true },
    { id: 'mc2', restaurantId: 'r1', nameAr: 'أطباق رئيسية', nameEn: 'Main Dishes', icon: '🍗', sortOrder: 2, isActive: true },
    { id: 'mc3', restaurantId: 'r1', nameAr: 'مشروبات', nameEn: 'Drinks', icon: '🥤', sortOrder: 3, isActive: true },
    { id: 'mc4', restaurantId: 'r1', nameAr: 'حلويات', nameEn: 'Desserts', icon: '🍰', sortOrder: 4, isActive: true },
  ],
  'r2': [
    { id: 'mc5', restaurantId: 'r2', nameAr: 'بيتزا', nameEn: 'Pizza', icon: '🍕', sortOrder: 1, isActive: true },
    { id: 'mc6', restaurantId: 'r2', nameAr: 'مقبلات', nameEn: 'Appetizers', icon: '🥖', sortOrder: 2, isActive: true },
    { id: 'mc7', restaurantId: 'r2', nameAr: 'مشروبات', nameEn: 'Drinks', icon: '🥤', sortOrder: 3, isActive: true },
  ],
}

export const sampleMenuItems: Record<string, MenuItem[]> = {
  'r1': [
    { id: 'i1', restaurantId: 'r1', categoryId: 'mc1', nameAr: 'حمص', nameEn: 'Hummus', descriptionAr: 'حمص بالطحينة والليمون', priceSyp: 15000, priceUsd: 1, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 10, tags: ['مقبلات', 'نباتي'] },
    { id: 'i2', restaurantId: 'r1', categoryId: 'mc1', nameAr: 'فتوش', nameEn: 'Fattoush', descriptionAr: 'سلطة خضار مع خبز محمص', priceSyp: 12000, priceUsd: 0.8, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 10, tags: ['سلطة', 'صحي'] },
    { id: 'i3', restaurantId: 'r1', categoryId: 'mc1', nameAr: 'ورق عنب', nameEn: 'Stuffed Grape Leaves', descriptionAr: 'ورق عنب محشي أرز ولحم', priceSyp: 25000, priceUsd: 1.7, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 20, tags: ['مقبلات', 'تقليدي'] },
    { id: 'i4', restaurantId: 'r1', categoryId: 'mc2', nameAr: 'دجاج على الفحم', nameEn: 'Grilled Chicken', descriptionAr: 'نصف دجاجة مشوية على الفحم مع أرز', priceSyp: 45000, priceUsd: 3, images: [], isAvailable: true, hasExtras: true, extras: [{ name: 'بطاطا مقلية', price: 5000 }, { name: 'سلطة', price: 3000 }], prepTime: 30, tags: ['دجاج', 'مشاوي'] },
    { id: 'i5', restaurantId: 'r1', categoryId: 'mc2', nameAr: 'كبة مقلية', nameEn: 'Fried Kibbeh', descriptionAr: 'كبة حلبية مقلية 6 حبات', priceSyp: 20000, priceUsd: 1.3, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 15, tags: ['كبة', 'حلب'] },
    { id: 'i6', restaurantId: 'r1', categoryId: 'mc2', nameAr: 'مندي لحم', nameEn: 'Mandi', descriptionAr: 'مندي لحم مع أرز بسمتي', priceSyp: 55000, priceUsd: 3.7, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 40, tags: ['مندي', 'لحم'] },
    { id: 'i7', restaurantId: 'r1', categoryId: 'mc3', nameAr: 'عصير ليمون', nameEn: 'Lemonade', descriptionAr: 'عصير ليمون طازج', priceSyp: 8000, priceUsd: 0.5, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 5, tags: ['عصير'] },
    { id: 'i8', restaurantId: 'r1', categoryId: 'mc3', nameAr: 'عيران', nameEn: 'Ayran', descriptionAr: 'عيران بارد', priceSyp: 5000, priceUsd: 0.3, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 2, tags: ['مشروب'] },
    { id: 'i9', restaurantId: 'r1', categoryId: 'mc3', nameAr: 'شاي', nameEn: 'Tea', descriptionAr: 'شاي أحمر مع نعناع', priceSyp: 3000, priceUsd: 0.2, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 3, tags: ['شاي'] },
    { id: 'i10', restaurantId: 'r1', categoryId: 'mc4', nameAr: 'كنافة', nameEn: 'Kanafeh', descriptionAr: 'كنافة نابلسية بالجبن', priceSyp: 18000, priceUsd: 1.2, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 15, tags: ['حلو', 'كنافة'] },
    { id: 'i11', restaurantId: 'r1', categoryId: 'mc4', nameAr: 'بسبوسة', nameEn: 'Basbousa', descriptionAr: 'بسبوسة بالسميد وجوز الهند', priceSyp: 10000, priceUsd: 0.7, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 10, tags: ['حلو', 'سميد'] },
  ],
  'r2': [
    { id: 'i12', restaurantId: 'r2', categoryId: 'mc5', nameAr: 'بيتزا مارغريتا', nameEn: 'Margherita', descriptionAr: 'صلصة طماطم، جبنة موتزاريلا، ريحان', priceSyp: 30000, priceUsd: 2, images: [], isAvailable: true, hasExtras: true, extras: [{ name: 'جبنة إضافية', price: 5000 }, { name: 'فطر', price: 4000 }], prepTime: 20, tags: ['بيتزا', 'نباتي'] },
    { id: 'i13', restaurantId: 'r2', categoryId: 'mc5', nameAr: 'بيتزا بيبروني', nameEn: 'Pepperoni', descriptionAr: 'صلصة طماطم، جبنة، بيبروني', priceSyp: 35000, priceUsd: 2.3, images: [], isAvailable: true, hasExtras: false, extras: [], prepTime: 20, tags: ['بيتزا', 'لحم'] },
  ],
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return sampleRestaurants.find(r => r.id === id)
}

export function getCategoriesByRestaurant(restaurantId: string): MenuCategory[] {
  return sampleCategories[restaurantId] || []
}

export function getMenuByRestaurant(restaurantId: string): MenuItem[] {
  return sampleMenuItems[restaurantId] || []
}

export function getMenuByCategory(restaurantId: string, categoryId: string): MenuItem[] {
  return (sampleMenuItems[restaurantId] || []).filter(i => i.categoryId === categoryId)
}

export function getRestaurantsByGovernorate(govId: string): Restaurant[] {
  return sampleRestaurants.filter(r => r.governorateId === govId)
}
