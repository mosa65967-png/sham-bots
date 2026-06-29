import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clean existing data
  await prisma.walletTransaction.deleteMany()
  await prisma.wallet.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.store.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.menuCategory.deleteMany()
  await prisma.restaurant.deleteMany()
  await prisma.telegramListing.deleteMany()
  await prisma.botTemplate.deleteMany()
  await prisma.botMessage.deleteMany()
  await prisma.botConversation.deleteMany()
  await prisma.botFlow.deleteMany()
  await prisma.bot.deleteMany()
  await prisma.ticketMessage.deleteMany()
  await prisma.ticket.deleteMany()
  await prisma.user.deleteMany()

  // Create demo user
  const user = await prisma.user.create({
    data: {
      nameAr: 'مستخدم تجريبي',
      phone: '963900000001',
      email: 'demo@sham-bots.com',
      role: 'user',
      isVerified: true,
      governorateId: '1',
    },
  })
  console.log(`Created user: ${user.id}`)

  // Create wallet for user
  await prisma.wallet.create({
    data: { userId: user.id, balanceSyp: 0, balanceUsd: 0 },
  })

  // Create restaurants
  const restaurant1 = await prisma.restaurant.create({
    data: {
      userId: user.id,
      nameAr: 'مطعم الشام',
      nameEn: 'Al Sham Restaurant',
      description: 'مطعم سوري تقليدي يقدم أشهى المأكولات الدمشقية',
      governorateId: '1',
      districtId: 'd1-1',
      address: 'المزة، شارع بغداد',
      phone: '011-1234567',
      whatsappNumber: '963933456789',
      workingHours: { sat: { start: '09:00', end: '23:00' }, sun: { start: '09:00', end: '23:00' } },
      isOpen: true,
      deliveryAvailable: true,
      deliveryFee: 5000,
      minOrder: 25000,
      rating: 4.7,
      subscriptionTier: 'premium',
    },
  })

  const restaurant2 = await prisma.restaurant.create({
    data: {
      userId: user.id,
      nameAr: 'بيتزا حلب',
      nameEn: 'Aleppo Pizza',
      description: 'بيتزا إيطالية بجودة عالمية',
      governorateId: '3',
      districtId: 'd3-1',
      address: 'حلب، الجميلية',
      phone: '021-7654321',
      whatsappNumber: '963933567890',
      workingHours: { all: { start: '10:00', end: '00:00' } },
      isOpen: true,
      deliveryAvailable: true,
      deliveryFee: 7000,
      minOrder: 30000,
      rating: 4.5,
      subscriptionTier: 'pro',
    },
  })
  console.log(`Created ${2} restaurants`)

  // Create menu categories and items for restaurant 1
  const cat1 = await prisma.menuCategory.create({ data: { restaurantId: restaurant1.id, nameAr: 'مقبلات', icon: '🥗', sortOrder: 1, isActive: true } })
  const cat2 = await prisma.menuCategory.create({ data: { restaurantId: restaurant1.id, nameAr: 'أطباق رئيسية', icon: '🍗', sortOrder: 2, isActive: true } })
  const cat3 = await prisma.menuCategory.create({ data: { restaurantId: restaurant1.id, nameAr: 'مشروبات', icon: '🥤', sortOrder: 3, isActive: true } })
  const cat4 = await prisma.menuCategory.create({ data: { restaurantId: restaurant1.id, nameAr: 'حلويات', icon: '🍰', sortOrder: 4, isActive: true } })

  await prisma.menuItem.createMany({
    data: [
      { restaurantId: restaurant1.id, categoryId: cat1.id, nameAr: 'حمص', descriptionAr: 'حمص بالطحينة والليمون', priceSyp: 15000, priceUsd: 1, tags: ['مقبلات', 'نباتي'], prepTime: 10 },
      { restaurantId: restaurant1.id, categoryId: cat1.id, nameAr: 'فتوش', descriptionAr: 'سلطة خضار مع خبز محمص', priceSyp: 12000, priceUsd: 0.8, tags: ['سلطة', 'صحي'], prepTime: 10 },
      { restaurantId: restaurant1.id, categoryId: cat2.id, nameAr: 'دجاج على الفحم', descriptionAr: 'نصف دجاجة مشوية على الفحم مع أرز', priceSyp: 45000, priceUsd: 3, tags: ['دجاج', 'مشاوي'], prepTime: 30, hasExtras: true, extras: [{ name: 'بطاطا مقلية', price: 5000 }, { name: 'سلطة', price: 3000 }] },
      { restaurantId: restaurant1.id, categoryId: cat2.id, nameAr: 'مندي لحم', descriptionAr: 'مندي لحم مع أرز بسمتي', priceSyp: 55000, priceUsd: 3.7, tags: ['مندي', 'لحم'], prepTime: 40 },
      { restaurantId: restaurant1.id, categoryId: cat3.id, nameAr: 'عصير ليمون', descriptionAr: 'عصير ليمون طازج', priceSyp: 8000, priceUsd: 0.5, tags: ['عصير'], prepTime: 5 },
      { restaurantId: restaurant1.id, categoryId: cat3.id, nameAr: 'عيران', descriptionAr: 'عيران بارد', priceSyp: 5000, priceUsd: 0.3, tags: ['مشروب'], prepTime: 2 },
      { restaurantId: restaurant1.id, categoryId: cat4.id, nameAr: 'كنافة', descriptionAr: 'كنافة نابلسية بالجبن', priceSyp: 18000, priceUsd: 1.2, tags: ['حلو'], prepTime: 15 },
      { restaurantId: restaurant1.id, categoryId: cat4.id, nameAr: 'بسبوسة', descriptionAr: 'بسبوسة بالسميد وجوز الهند', priceSyp: 10000, priceUsd: 0.7, tags: ['حلو'], prepTime: 10 },
    ],
  })

  // Create menu for restaurant 2
  const cat5 = await prisma.menuCategory.create({ data: { restaurantId: restaurant2.id, nameAr: 'بيتزا', icon: '🍕', sortOrder: 1, isActive: true } })
  const cat6 = await prisma.menuCategory.create({ data: { restaurantId: restaurant2.id, nameAr: 'مقبلات', icon: '🥖', sortOrder: 2, isActive: true } })

  await prisma.menuItem.createMany({
    data: [
      { restaurantId: restaurant2.id, categoryId: cat5.id, nameAr: 'بيتزا مارغريتا', descriptionAr: 'صلصة طماطم، جبنة موتزاريلا، ريحان', priceSyp: 30000, priceUsd: 2, tags: ['بيتزا', 'نباتي'], prepTime: 20, hasExtras: true, extras: [{ name: 'جبنة إضافية', price: 5000 }, { name: 'فطر', price: 4000 }] },
      { restaurantId: restaurant2.id, categoryId: cat5.id, nameAr: 'بيتزا بيبروني', descriptionAr: 'صلصة طماطم، جبنة، بيبروني', priceSyp: 35000, priceUsd: 2.3, tags: ['بيتزا'], prepTime: 20 },
    ],
  })
  console.log(`Created menu items`)

  // Create stores and products
  const store1 = await prisma.store.create({
    data: {
      userId: user.id,
      name: 'متجر الإلكترونيات',
      slug: 'electronics',
      description: 'أجهزة إلكترونية، جوالات، لابتوبات، واكسسوارات',
      governorateId: '1',
      phone: '011-2345678',
      whatsappNumber: '963933456789',
      deliveryAvailable: true,
    },
  })

  await prisma.product.createMany({
    data: [
      { storeId: store1.id, nameAr: 'هاتف ذكي Samsung', priceSyp: 350000, tags: ['إلكترونيات'], stock: 10, isFeatured: true },
      { storeId: store1.id, nameAr: 'لابتوب Lenovo', priceSyp: 850000, tags: ['إلكترونيات'], stock: 5, isFeatured: true },
      { storeId: store1.id, nameAr: 'سماعات Bluetooth', priceSyp: 45000, tags: ['إكسسوارات'], stock: 30 },
      { storeId: store1.id, nameAr: 'شاحن متنقل 20000mAh', priceSyp: 35000, tags: ['إكسسوارات'], stock: 25 },
    ],
  })

  const store2 = await prisma.store.create({
    data: {
      userId: user.id,
      name: 'موضة دمشق',
      slug: 'damascus-fashion',
      description: 'أزياء عصرية وتقليدية، ماركات عالمية',
      governorateId: '1',
      phone: '011-8765432',
      whatsappNumber: '963933567890',
    },
  })

  await prisma.product.createMany({
    data: [
      { storeId: store2.id, nameAr: 'فستان سهرة', priceSyp: 120000, tags: ['أزياء'], stock: 15 },
      { storeId: store2.id, nameAr: 'بدلة رجالية', priceSyp: 250000, tags: ['أزياء'], stock: 8 },
    ],
  })
  console.log(`Created stores with products`)

  // Create telegram listings
  await prisma.telegramListing.createMany({
    data: [
      { userId: user.id, type: 'channel', telegramId: 'SyriaNews', title: 'أخبار سوريا', description: 'أهم الأخبار السورية والعربية', category: 'news', governorateId: '1', membersCount: 50000, isVerified: true, isFeatured: true, tags: ['أخبار', 'سوريا'], status: 'approved' },
      { userId: user.id, type: 'group', telegramId: 'DamascusDevs', title: 'مبرمجو دمشق', description: 'مجموعة للمبرمجين السوريين', category: 'technology', governorateId: '1', membersCount: 3200, tags: ['برمجة', 'تقنية'], status: 'approved' },
      { userId: user.id, type: 'bot', telegramId: 'SyriaWeatherBot', title: 'بوت الطقس', description: 'بوت يعطي حالة الطقس في سوريا', category: 'tools', governorateId: '1', membersCount: 12000, tags: ['طقس', 'خدمات'], status: 'approved' },
    ],
  })
  console.log(`Created telegram listings`)

  console.log('\nSeeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
