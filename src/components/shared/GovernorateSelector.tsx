'use client'

import { useState } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { governorates } from '@/data/governorates'
import { useAppStore } from '@/lib/store/app-store'
import Image from 'next/image'
import { SyriaMap } from '@/components/maps/SyriaMap'

export function GovernorateSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedGovernorate, setSelectedGovernorate } = useAppStore()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all',
          selectedGovernorate
            ? 'border-primary-500/30 text-primary-400 bg-primary-500/10'
            : 'border-dark-border text-gray-400 hover:text-white hover:bg-dark-tertiary'
        )}
      >
        <MapPin className="w-4 h-4" />
        <span className="hidden sm:inline">
          {selectedGovernorate ? selectedGovernorate.nameAr : 'المحافظة'}
        </span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full mt-2 w-72 z-50 glass rounded-2xl p-4 shadow-xl border border-white/10 animate-slide-up">
            <h3 className="font-heading font-bold text-white mb-3 text-sm">
              اختر محافظتك
            </h3>

            {/* Mini Map */}
            <div className="mb-4 bg-dark-tertiary rounded-xl p-3">
              <SyriaMap
                selectedId={selectedGovernorate?.id}
                onSelect={(id) => {
                  const gov = governorates.find(g => g.id === id)
                  if (gov) {
                    setSelectedGovernorate(gov)
                    setIsOpen(false)
                  }
                }}
              />
            </div>

            {/* Region Groups */}
            {['الشام', 'الشمال', 'الوسط', 'الساحل', 'الشرق', 'الجنوب'].map((region) => {
              const govs = governorates.filter(g => g.region === region)
              return (
                <div key={region} className="mb-2">
                  <h4 className="text-xs text-gray-500 mb-1 px-2">{region}</h4>
                  {govs.map((gov) => (
                    <button
                      key={gov.id}
                      onClick={() => {
                        setSelectedGovernorate(gov)
                        setIsOpen(false)
                      }}
                      className={cn(
                        'w-full text-right px-3 py-1.5 rounded-lg text-sm transition-all',
                        selectedGovernorate?.id === gov.id
                          ? 'bg-primary-500/20 text-primary-400'
                          : 'text-gray-300 hover:bg-dark-tertiary'
                      )}
                    >
                      {gov.nameAr}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
