import { NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { query, getPool } from '@/lib/db'

export async function GET(req: Request) {
  const sess = getSessionFromRequest(req)
  if (!sess || sess.role !== 'staff') return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const pool = getPool()
  if (!pool) return NextResponse.json({ error: 'DATABASE_URL not configured' }, { status: 500 })

  const res = await query('SELECT id, created_at, total FROM orders ORDER BY created_at DESC LIMIT 50')
  return NextResponse.json({ orders: res.rows })
}
