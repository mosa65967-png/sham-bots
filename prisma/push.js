const { execSync } = require('child_process')
try {
  execSync('npx prisma db push --skip-generate --accept-data-loss', { stdio: 'inherit' })
} catch (e) {
  console.error('[DB_PUSH] Failed to push schema:', e.message)
  console.error('[DB_PUSH] Continuing anyway...')
}
