const encoder = new TextEncoder()
const decoder = new TextDecoder()

function toBase64Url(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  return atob(str)
}

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.NEXTAUTH_SECRET || 'sham-bots-fallback-secret-key'
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(secret))
  return crypto.subtle.importKey('raw', hash, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'])
}

export async function createSession(payload: Record<string, unknown>): Promise<string> {
  const key = await getKey()
  const data = { ...payload, exp: Math.floor(Date.now() / 1000) + 86400 }
  const bytes = encoder.encode(JSON.stringify(data))
  const sig = await crypto.subtle.sign('HMAC', key, bytes)
  const sigArr = Array.from(new Uint8Array(sig))
  const sigStr = sigArr.map(b => String.fromCharCode(b)).join('')
  return `${toBase64Url(JSON.stringify(data))}.${toBase64Url(sigStr)}`
}

export async function verifySession(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return null
    const payloadStr = fromBase64Url(parts[0])
    const payload = JSON.parse(payloadStr)
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    const sigStr = fromBase64Url(parts[1])
    const sigBytes = new Uint8Array(sigStr.split('').map(c => c.charCodeAt(0)))
    const key = await getKey()
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(payloadStr))
    return valid ? payload : null
  } catch {
    return null
  }
}

export const PROTECTED_ROUTES = ['/dashboard', '/admin', '/agent']
export const AUTH_ROUTES = ['/auth/login', '/auth/register']
