const { execSync } = require('child_process')
const path = require('path')

const prismaBin = path.join(__dirname, '..', 'node_modules', '.bin', 'prisma')

try {
  console.log('[DB_PUSH] Pushing schema...')
  execSync(`"${prismaBin}" db push --skip-generate --accept-data-loss`, { stdio: 'inherit' })
  console.log('[DB_PUSH] Schema push successful')
} catch (e) {
  console.error('[DB_PUSH] Failed to push schema, trying npx fallback...')
  try {
    execSync('npx prisma db push --skip-generate --accept-data-loss', { stdio: 'inherit', shell: true })
    console.log('[DB_PUSH] Schema push successful (npx fallback)')
  } catch (e2) {
    console.error('[DB_PUSH] Schema push failed with both methods:', e2.message)
    console.error('[DB_PUSH] Continuing anyway - app may have limited functionality')
  }
}
