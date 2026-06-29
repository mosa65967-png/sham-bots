import { randomBytes } from 'crypto'

const encoder = new TextEncoder()

async function getCsrfKey(): Promise<CryptoKey> {
  const secret = process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('CSRF_SECRET or NEXTAUTH_SECRET must be set')
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(secret))
  return crypto.subtle.importKey('raw', hash, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
}

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex')
}

export async function signCsrfToken(token: string): Promise<string> {
  const key = await getCsrfKey()
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(token))
  const sigStr = Array.from(new Uint8Array(sig)).map(b => String.fromCharCode(b)).join('')
  return `${token}.${btoa(sigStr).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}`
}

export async function verifyCsrfToken(signed: string): Promise<boolean> {
  try {
    const parts = signed.split('.')
    if (parts.length !== 2) return false
    const key = await getCsrfKey()
    const sigBytes = new Uint8Array(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')).split('').map(c => c.charCodeAt(0)))
    return crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(parts[0]))
  } catch {
    return false
  }
}
