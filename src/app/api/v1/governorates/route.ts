import { NextResponse } from 'next/server'
import { governorates, districts, exchangeRates, getDistrictsByGovernorateId, getExchangeRate } from '@/data/governorates'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const code = searchParams.get('code')
  const includeDistricts = searchParams.get('districts') === 'true'
  const includeRate = searchParams.get('rate') === 'true'

  if (id) {
    const gov = governorates.find(g => g.id === id)
    if (!gov) return NextResponse.json({ success: false, error: 'Governorate not found' }, { status: 404 })
    return NextResponse.json({
      success: true,
      data: {
        ...gov,
        ...(includeDistricts && { districts: getDistrictsByGovernorateId(id) }),
        ...(includeRate && { exchangeRate: getExchangeRate(id) }),
      },
    })
  }

  if (code) {
    const gov = governorates.find(g => g.code.toLowerCase() === code.toLowerCase())
    if (!gov) return NextResponse.json({ success: false, error: 'Governorate not found' }, { status: 404 })
    return NextResponse.json({
      success: true,
      data: {
        ...gov,
        ...(includeDistricts && { districts: getDistrictsByGovernorateId(gov.id) }),
        ...(includeRate && { exchangeRate: getExchangeRate(gov.id) }),
      },
    })
  }

  return NextResponse.json({
    success: true,
    data: governorates.map(g => ({
      ...g,
      ...(includeRate && { exchangeRate: getExchangeRate(g.id) }),
    })),
  })
}
