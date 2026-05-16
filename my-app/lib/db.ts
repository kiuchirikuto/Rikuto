let pool: any

export function getPool(): any | null {
  if (!process.env.DATABASE_URL) return null
  if (!pool) {
    let PoolClass: any
    try {
      // dynamic require so bundlers without `pg` installed won't fail at build
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      PoolClass = require('pg').Pool
    } catch (e) {
      return null
    }
    pool = new PoolClass({ connectionString: process.env.DATABASE_URL, max: 5 })
  }
  return pool
}

export async function query(text: string, params?: any[]) {
  const p = getPool()
  if (!p) throw new Error('DATABASE_URL is not configured or pg module is unavailable')
  return p.query(text, params)
}
