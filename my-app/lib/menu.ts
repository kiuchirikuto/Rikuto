import { query, getPool } from './db'

export async function getMenuCategoriesFromDB() {
  const pool = getPool()
  if (!pool) return null

  const res = await query(
    `SELECT id, title, description, price, image, category
     FROM menu_items
     ORDER BY category, title`
  )

  const rows = res.rows || []
  const groups = new Map<string, any[]>()

  for (const r of rows) {
    const cat = r.category || '未分類'
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push({
      id: r.id,
      title: r.title,
      description: r.description,
      price: r.price,
      priceText: r.price ? `¥${r.price}` : undefined,
      image: r.image,
      category: r.category,
    })
  }

  const categories = Array.from(groups.entries()).map(([name, items]) => ({
    key: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    items,
  }))

  return categories
}

export default getMenuCategoriesFromDB
