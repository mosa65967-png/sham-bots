export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 animate-pulse mx-auto mb-4" />
        <p className="text-gray-400 text-sm">جاري التحميل...</p>
      </div>
    </div>
  )
}
