'use client'

import { useAppStore } from '@/lib/store/app-store'
import { cn } from '@/lib/utils'

export function CurrencyToggle() {
  const { currency, setCurrency } = useAppStore()

  return (
    <div className="flex items-center bg-dark-tertiary rounded-lg p-0.5 border border-dark-border">
      <button
        onClick={() => setCurrency('syp')}
        className={cn(
          'px-2.5 py-1.5 text-xs rounded-md font-medium transition-all',
          currency === 'syp'
            ? 'bg-primary-500 text-white shadow-sm'
            : 'text-gray-400 hover:text-white'
        )}
      >
        ل.س
      </button>
      <button
        onClick={() => setCurrency('usd')}
        className={cn(
          'px-2.5 py-1.5 text-xs rounded-md font-medium transition-all',
          currency === 'usd'
            ? 'bg-primary-500 text-white shadow-sm'
            : 'text-gray-400 hover:text-white'
        )}
      >
        $
      </button>
    </div>
  )
}
