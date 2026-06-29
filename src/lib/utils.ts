import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency: 'syp' | 'usd' = 'syp'): string {
  if (currency === 'usd') {
    return `$${amount.toFixed(2)}`
  }
  return `${amount.toLocaleString('ar-SY')} ل.س`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ar-SY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('ar-SY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}${timestamp}${random}`
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `SHAM-${timestamp}-${random}`
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'text-green-400 bg-green-500/10',
    inactive: 'text-gray-400 bg-gray-500/10',
    pending: 'text-yellow-400 bg-yellow-500/10',
    completed: 'text-green-400 bg-green-500/10',
    cancelled: 'text-red-400 bg-red-500/10',
    draft: 'text-gray-400 bg-gray-500/10',
    error: 'text-red-400 bg-red-500/10',
    paid: 'text-green-400 bg-green-500/10',
    unpaid: 'text-yellow-400 bg-yellow-500/10',
    open: 'text-blue-400 bg-blue-500/10',
    closed: 'text-gray-400 bg-gray-500/10',
  }
  return colors[status] || 'text-gray-400 bg-gray-500/10'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function validatePhone(phone: string): boolean {
  return /^0[0-9]{9}$/.test(phone)
}

export function validateSyrianPhone(phone: string): boolean {
  return /^(09[3-4]\d{7}|09[5-6]\d{7})$/.test(phone)
}
