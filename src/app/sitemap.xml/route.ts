import { NextResponse } from 'next/server'

const SITE_URL = 'https://sham-bots-production.up.railway.app'

const staticPages = [
  '', '/directory', '/restaurants', '/stores', '/pricing',
  '/support', '/contact', '/faq', '/terms', '/privacy',
]

export async function GET() {
  const urls = staticPages.map(
    (page) => `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
  ).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
