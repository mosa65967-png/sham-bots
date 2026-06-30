const { execSync } = require('child_process')
try {
  execSync('npx prisma generate', { stdio: 'inherit' })
  if (process.env.DATABASE_URL) {
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })
  } else {
    console.log('[SKIP] prisma db push: no DATABASE_URL (build phase)')
  }
} catch (e) {
  console.error('[WARN] postinstall error (non-fatal):', e.message)
}
