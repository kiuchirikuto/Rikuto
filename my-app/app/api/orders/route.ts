import { NextResponse } from 'next/server'
import { query, getPool } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, total, metadata } = body || {}

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'items must be a non-empty array' }, { status: 400 })
    }

    const pool = getPool()
    if (!pool) return NextResponse.json({ error: 'DATABASE_URL not configured or pg unavailable' }, { status: 500 })

    // basic validation
    for (const it of items) {
      if (!it.id || typeof it.qty !== 'number' || it.qty <= 0) {
        return NextResponse.json({ error: 'each item must have id and qty>0' }, { status: 400 })
      }
    }

    // start transaction
    await query('BEGIN')
    try {
      const totalVal = typeof total === 'number' ? total : items.reduce((s: number, i: any) => s + (i.price || 0) * (i.qty || 0), 0)
      const res = await query('INSERT INTO orders (total, metadata) VALUES ($1, $2) RETURNING id, created_at', [totalVal, metadata || null])
      const orderId = res.rows[0].id

      const insertText = 'INSERT INTO order_items (order_id, menu_item_id, title, qty, price) VALUES ($1, $2, $3, $4, $5)'
      for (const it of items) {
        await query(insertText, [orderId, it.id, it.title || null, it.qty, it.price || null])
      }

      await query('COMMIT')
      return NextResponse.json({ success: true, orderId })
    } catch (e) {
      await query('ROLLBACK')
      throw e
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
