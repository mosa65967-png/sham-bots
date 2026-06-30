const attemptCounts = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60_000
const MAX_ATTEMPTS = 5

export function checkRateLimit(key: string, maxAttempts = MAX_ATTEMPTS, windowMs = WINDOW_MS): boolean {
  const now = Date.now()
  const entry = attemptCounts.get(key)

  if (!entry || now > entry.resetAt) {
    attemptCounts.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= maxAttempts) {
    return false
  }

  entry.count++
  return true
}

setInterval(() => {
  const now = Date.now()
  Array.from(attemptCounts.entries()).forEach(([key, entry]) => {
    if (now > entry.resetAt) {
      attemptCounts.delete(key)
    }
  })
}, 60_000)
