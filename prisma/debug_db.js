const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()
;(async () => {
  try {
    const dbs = await p.$queryRawUnsafe("SELECT datname FROM pg_database WHERE datistemplate = false")
    console.log('Databases:', dbs.map(d => d.datname).join(', '))
    
    const tables = await p.$queryRawUnsafe("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name")
    console.log('Tables:', tables.map(t => t.table_name).join(', '))
  } catch(e) {
    console.error('Error:', e.message)
  }
  await p.$disconnect()
})()
