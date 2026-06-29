import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-heading font-black gradient-text mb-6">404</div>
        <h1 className="font-heading text-3xl font-bold text-white mb-4">الصفحة غير موجودة</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            العودة للرئيسية
          </Link>
          <Link href="/directory" className="btn-secondary">
            استعرض الخدمات
          </Link>
        </div>
      </div>
    </div>
  )
}
