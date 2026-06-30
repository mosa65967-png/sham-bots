const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.findUnique({ where: { phone: '0995508724' } })
  if (!user) { console.log('User not found'); return }
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: '$2a$10$U4.gqetOjWU.VhFlwC3Do.Y7S7.bUTIT1yOzDjJMZrR0TxioHHWle' }
  })
  console.log('OK: password set for', user.phone, user.id)
}
main().catch(e => console.error('ERR:', e.message)).finally(() => prisma.$disconnect())
