import { NextResponse } from 'next/server'
import getMenuCategoriesFromDB from '@/lib/menu'

export async function GET() {
  try {
    const data = await getMenuCategoriesFromDB()
    if (!data) return NextResponse.json({ error: 'DATABASE_URL not configured' }, { status: 400 })
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
