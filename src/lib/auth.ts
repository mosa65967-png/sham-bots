const encoder = new TextEncoder()

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    throw new Error('NEXTAUTH_SECRET environment variable is required')
  }
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(secret))
  return crypto.subtle.importKey('raw', hash, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'])
}

export async function createSession(payload: Record<string, unknown>): Promise<string> {
  const key = await getKey()
  const data = { ...payload, exp: Math.floor(Date.now() / 1000) + 86400 }
  const jsonStr = JSON.stringify(data)
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(jsonStr))
  const sigArr = Array.from(new Uint8Array(sig))
  const sigStr = sigArr.map(b => String.fromCharCode(b)).join('')
  const b64Payload = btoa(jsonStr).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  const b64Sig = btoa(sigStr).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return `${b64Payload}.${b64Sig}`
}

function base64UrlDecode(str: string): string {
  let s = str.replace(/-/g, '+').replace(/_/g, '/')
  while (s.length % 4) s += '='
  return atob(s)
}

export async function verifySession(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return null
    const jsonStr = base64UrlDecode(parts[0])
    const sigStr = base64UrlDecode(parts[1])
    const payload = JSON.parse(jsonStr)
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    const sigBytes = new Uint8Array(sigStr.split('').map(c => c.charCodeAt(0)))
    const key = await getKey()
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(jsonStr))
    return valid ? payload : null
  } catch {
    return null
  }
}

export const PROTECTED_ROUTES = ['/dashboard', '/admin', '/agent']
export const AUTH_ROUTES = ['/auth/login', '/auth/register']
