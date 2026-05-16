import { Pool } from 'pg'

let pool: Pool | undefined

export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 })
  }
  return pool
}

export async function query(text: string, params?: any[]) {
  const p = getPool()
  if (!p) throw new Error('DATABASE_URL is not configured')
  return p.query(text, params)
}
