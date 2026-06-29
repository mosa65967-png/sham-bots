import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/shared/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'شام بوتس - المنصة الرقمية السورية المتكاملة',
  description: 'منصة سورية متكاملة لبوتات الذكاء الاصطناعي، دليل تليجرام، QR Menu للمطاعم، متجر إلكتروني، ونظام خدمة عملاء',
  keywords: ['بوتات', 'تليجرام', 'واتساب', 'ذكاء اصطناعي', 'سوريا', 'QR Menu', 'متجر إلكتروني', 'دمشق'],
  openGraph: {
    title: 'شام بوتس - المنصة الرقمية السورية',
    description: 'منصة سورية متكاملة للخدمات الرقمية',
    locale: 'ar_SY',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="min-h-screen bg-dark-primary">
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
