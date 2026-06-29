'use client'

import { MessageCircle, Users, Bot, Star, MapPin, Eye, ExternalLink, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TelegramListing } from '@/types'
import { governorates } from '@/data/governorates'

interface ListingCardProps {
  listing: TelegramListing
  featured?: boolean
}

const typeIcons = {
  channel: MessageCircle,
  group: Users,
  bot: Bot,
}

const typeColors = {
  channel: 'from-blue-500 to-cyan-500',
  group: 'from-green-500 to-emerald-500',
  bot: 'from-purple-500 to-pink-500',
}

export function ListingCard({ listing, featured }: ListingCardProps) {
  const Icon = typeIcons[listing.type]
  const gov = governorates.find(g => g.id === listing.governorateId)

  return (
    <div className={cn(
      'glass-card card-hover group',
      featured && 'border-primary-500/30 shadow-lg shadow-primary-500/5'
    )}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform',
          typeColors[listing.type]
        )}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading font-bold text-white truncate group-hover:text-primary-400 transition-colors">
              {listing.title}
            </h3>
            {listing.isVerified && (
              <BadgeCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
            )}
            {featured && (
              <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400 text-[10px] font-bold">
                مميز
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              @{listing.telegramId}
            </span>
            {gov && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {gov.nameAr}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {listing.viewsCount.toLocaleString()}
            </span>
          </div>

          {listing.description && (
            <p className="text-sm text-gray-400 line-clamp-2 mb-3 leading-relaxed">
              {listing.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {listing.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-lg bg-dark-tertiary text-[11px] text-gray-500">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                {listing.membersCount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-yellow-500 font-medium">{listing.rating}</span>
              </span>
            </div>
            <a
              href={`https://t.me/${listing.telegramId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors"
            >
              زيارة
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
