import { NextResponse } from 'next/server'
import { governorates, getDistrictsByGovernorateId } from '@/data/governorates'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const governorateId = searchParams.get('governorateId')
  const districtId = searchParams.get('districtId')

  return NextResponse.json({
    success: true,
    data: [],
    filters: { governorateId, districtId },
    message: 'نظام المندوبين قيد التطوير',
  })
}
