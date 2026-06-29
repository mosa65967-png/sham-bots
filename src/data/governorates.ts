import { Governorate, District } from '@/types'

export const governorates: Governorate[] = [
  { id: '1', nameAr: 'دمشق', nameEn: 'Damascus', code: 'DM', region: 'الشام', isActive: true, sortOrder: 1 },
  { id: '2', nameAr: 'ريف دمشق', nameEn: 'Rif Dimashq', code: 'RD', region: 'الشام', isActive: true, sortOrder: 2 },
  { id: '3', nameAr: 'حلب', nameEn: 'Aleppo', code: 'HL', region: 'الشمال', isActive: true, sortOrder: 3 },
  { id: '4', nameAr: 'حمص', nameEn: 'Homs', code: 'HM', region: 'الوسط', isActive: true, sortOrder: 4 },
  { id: '5', nameAr: 'حماة', nameEn: 'Hama', code: 'HA', region: 'الوسط', isActive: true, sortOrder: 5 },
  { id: '6', nameAr: 'اللاذقية', nameEn: 'Latakia', code: 'LA', region: 'الساحل', isActive: true, sortOrder: 6 },
  { id: '7', nameAr: 'طرطوس', nameEn: 'Tartus', code: 'TA', region: 'الساحل', isActive: true, sortOrder: 7 },
  { id: '8', nameAr: 'إدلب', nameEn: 'Idlib', code: 'ID', region: 'الشمال', isActive: true, sortOrder: 8 },
  { id: '9', nameAr: 'دير الزور', nameEn: 'Deir ez-Zor', code: 'DZ', region: 'الشرق', isActive: true, sortOrder: 9 },
  { id: '10', nameAr: 'الرقة', nameEn: 'Raqqa', code: 'RQ', region: 'الشرق', isActive: true, sortOrder: 10 },
  { id: '11', nameAr: 'الحسكة', nameEn: 'Hasakah', code: 'HS', region: 'الشرق', isActive: true, sortOrder: 11 },
  { id: '12', nameAr: 'درعا', nameEn: 'Daraa', code: 'DR', region: 'الجنوب', isActive: true, sortOrder: 12 },
  { id: '13', nameAr: 'السويداء', nameEn: 'Suwayda', code: 'SW', region: 'الجنوب', isActive: true, sortOrder: 13 },
  { id: '14', nameAr: 'القنيطرة', nameEn: 'Quneitra', code: 'QU', region: 'الجنوب', isActive: true, sortOrder: 14 },
]

export const districts: Record<string, District[]> = {
  '1': [
    { id: 'd1-1', governorateId: '1', nameAr: 'المزة', deliveryFee: 5000, isActive: true },
    { id: 'd1-2', governorateId: '1', nameAr: 'البرامكة', deliveryFee: 5000, isActive: true },
    { id: 'd1-3', governorateId: '1', nameAr: 'باب توما', deliveryFee: 6000, isActive: true },
    { id: 'd1-4', governorateId: '1', nameAr: 'الشعلان', deliveryFee: 5000, isActive: true },
    { id: 'd1-5', governorateId: '1', nameAr: 'القدم', deliveryFee: 8000, isActive: true },
    { id: 'd1-6', governorateId: '1', nameAr: 'دمر', deliveryFee: 7000, isActive: true },
    { id: 'd1-7', governorateId: '1', nameAr: 'الميدان', deliveryFee: 5000, isActive: true },
    { id: 'd1-8', governorateId: '1', nameAr: 'الصالحية', deliveryFee: 5000, isActive: true },
  ],
  '3': [
    { id: 'd3-1', governorateId: '3', nameAr: 'الجميلية', deliveryFee: 5000, isActive: true },
    { id: 'd3-2', governorateId: '3', nameAr: 'العزيزية', deliveryFee: 5000, isActive: true },
    { id: 'd3-3', governorateId: '3', nameAr: 'بستان الباشا', deliveryFee: 6000, isActive: true },
    { id: 'd3-4', governorateId: '3', nameAr: 'الشيخ مقصود', deliveryFee: 7000, isActive: true },
  ],
}

export const exchangeRates: Record<string, number> = {
  '1': 15000,
  '2': 15000,
  '3': 15200,
  '4': 14800,
  '5': 14900,
  '6': 15100,
  '7': 15000,
  '8': 15300,
  '9': 15500,
  '10': 15500,
  '11': 15600,
  '12': 14900,
  '13': 14800,
  '14': 14900,
}

export function getGovernorateById(id: string): Governorate | undefined {
  return governorates.find(g => g.id === id)
}

export function getGovernorateByCode(code: string): Governorate | undefined {
  return governorates.find(g => g.code === code)
}

export function getDistrictsByGovernorateId(id: string): District[] {
  return districts[id] || []
}

export function getExchangeRate(governorateId: string): number {
  return exchangeRates[governorateId] || 15000
}

export function convertPrice(amountUsd: number, governorateId: string): number {
  const rate = getExchangeRate(governorateId)
  return amountUsd * rate
}
