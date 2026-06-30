const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const p = new PrismaClient()
;(async () => {
  try {
    // Create user with known password
    const hash = await bcrypt.hash('testpass123', 12)
    const user = await p.user.upsert({
      where: { phone: '0999999995' },
      update: { passwordHash: hash, isVerified: true },
      create: { phone: '0999999995', nameAr: 'Test User', passwordHash: hash, role: 'user', isVerified: true }
    })
    console.log('User ID:', user.id)
    
    // Ensure wallet exists
    await p.wallet.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id }
    })
    console.log('User ready for login test')
    console.log('Phone: 0999999995')
    console.log('Password: testpass123')
  } catch(e) {
    console.error('Error:', e.message)
  }
  await p.$disconnect()
})()
