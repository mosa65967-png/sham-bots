import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const governorateId = searchParams.get('governorateId')
  const category = searchParams.get('category')
  const search = searchParams.get('q')

  return NextResponse.json({
    success: true,
    data: [],
    filters: { type, governorateId, category, search },
    total: 0,
  })
}
