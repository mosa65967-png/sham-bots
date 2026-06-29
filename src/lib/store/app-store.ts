'use client'

import { create } from 'zustand'
import { Governorate, User } from '@/types'

interface AppState {
  // User
  user: User | null
  setUser: (user: User | null) => void

  // Governorate
  selectedGovernorate: Governorate | null
  setSelectedGovernorate: (gov: Governorate | null) => void

  // Currency
  currency: 'syp' | 'usd'
  setCurrency: (currency: 'syp' | 'usd') => void

  // Theme
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void

  // UI
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void

  // Bot Builder
  builderMode: boolean
  setBuilderMode: (mode: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  selectedGovernorate: null,
  setSelectedGovernorate: (gov) => set({ selectedGovernorate: gov }),

  currency: 'syp',
  setCurrency: (currency) => set({ currency }),

  theme: 'dark',
  setTheme: (theme) => set({ theme }),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  builderMode: false,
  setBuilderMode: (mode) => set({ builderMode: mode }),
}))
