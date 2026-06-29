'use client'

import { governorates } from '@/data/governorates'
import { cn } from '@/lib/utils'

interface SyriaMapProps {
  selectedId?: string
  onSelect?: (id: string) => void
  className?: string
}

export function SyriaMap({ selectedId, onSelect, className }: SyriaMapProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Simplified Syria Map as colored grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {governorates.map((gov) => (
          <button
            key={gov.id}
            onClick={() => onSelect?.(gov.id)}
            className={cn(
              'p-1.5 rounded-md text-[10px] font-medium transition-all text-center leading-tight',
              selectedId === gov.id
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                : 'bg-dark-tertiary text-gray-400 hover:bg-dark-border hover:text-white'
            )}
            title={gov.nameAr}
          >
            {gov.nameAr.slice(0, 4)}
          </button>
        ))}
      </div>
      <div className="text-center mt-2 text-[10px] text-gray-500">
        اختر محافظتك من الخريطة
      </div>
    </div>
  )
}
