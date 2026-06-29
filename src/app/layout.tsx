import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/shared/Providers'
import AuthProvider from '@/components/auth-provider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'شام بوتس - المنصة الرقمية السورية المتكاملة', template: '%s | شام بوتس' },
  description: 'منصة سورية متكاملة لبوتات الذكاء الاصطناعي، دليل تليجرام، QR Menu للمطاعم، متجر إلكتروني، ونظام خدمة عملاء - تدعم 14 محافظة سورية',
  keywords: ['بوتات', 'تليجرام', 'واتساب', 'ذكاء اصطناعي', 'سوريا', 'QR Menu', 'متجر إلكتروني', 'دمشق', 'حلب', 'شام بوتس'],
  authors: [{ name: 'شام بوتس' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'شام بوتس - المنصة الرقمية السورية',
    description: 'منصة سورية متكاملة للخدمات الرقمية - بوتات، دليل تليجرام، QR Menu، متجر إلكتروني',
    locale: 'ar_SY',
    type: 'website',
    siteName: 'شام بوتس',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شام بوتس - المنصة الرقمية السورية',
    description: 'منصة سورية متكاملة للخدمات الرقمية',
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a1a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="min-h-screen bg-dark-primary">
        <AuthProvider>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
