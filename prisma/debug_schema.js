const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()
;(async () => {
  try {
    // Check verification_tokens table structure
    const cols = await p.$queryRawUnsafe(
      "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'verification_tokens' ORDER BY ordinal_position"
    )
    console.log('verification_tokens columns:')
    cols.forEach(c => console.log(`  ${c.column_name} (${c.data_type}, nullable=${c.is_nullable})`))
    
    // Also check users table for otp fields
    const ucols = await p.$queryRawUnsafe(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND column_name LIKE '%otp%' ORDER BY ordinal_position"
    )
    console.log('\nUser otp columns:', ucols.map(c => c.column_name).join(', ') || 'NONE')
    
    // Also check for name column
    const ncol = await p.$queryRawUnsafe(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'name'"
    )
    console.log('User name column:', ncol.length ? 'EXISTS' : 'MISSING')
    
  } catch(e) {
    console.error('Error:', e.message)
  }
  await p.$disconnect()
})()
