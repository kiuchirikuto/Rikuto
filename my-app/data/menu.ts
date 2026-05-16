export type MenuItem = {
  id: string
  title: string
  description?: string
  price: number
  priceText?: string
  image?: string
  tags?: string[]
  available?: boolean
  calories?: number
  category?: string
  options?: Array<{ name: string; choices: { label: string; priceDelta?: number }[] }>
}

export type MenuCategory = {
  key: string
  name: string
  items: MenuItem[]
}

// Sample menu data separated from UI code. Prices are stored as numbers (in yen).
export const menuCategories: MenuCategory[] = [
  {
    key: "main",
    name: "主菜",
    items: [
      {
        id: "t1",
        title: "天ぷら定食",
        description: "えび・野菜の天ぷらとご飯セット",
        price: 1200,
        priceText: "¥1,200",
        image: "https://images.unsplash.com/photo-1604908177522-3f7a3a7d4c7f?auto=format&fit=crop&w=1200&q=90",
        tags: ["set", "signature"],
        available: true,
        calories: 850,
        category: "主菜",
      },
      {
        id: "o1",
        title: "お好み焼き",
        description: "ふわふわキャベツ入りの定番お好み焼き",
        price: 980,
        priceText: "¥980",
        image: "https://images.unsplash.com/photo-1605475124555-1f2b9b6c5d3b?auto=format&fit=crop&w=1200&q=90",
        tags: ["grill"],
        available: true,
        calories: 650,
        category: "主菜",
      },
      {
        id: "s1",
        title: "刺身盛り合わせ",
        description: "新鮮な魚介をたっぷりどうぞ",
        price: 1580,
        priceText: "¥1,580",
        image: "https://images.unsplash.com/photo-1564758866812-7a8b7b6d9a8f?auto=format&fit=crop&w=1200&q=90",
        tags: ["seafood"],
        available: true,
        calories: 420,
        category: "主菜",
      },
    ],
  },
  {
    key: "drinks",
    name: "飲み物",
    items: [
      {
        id: "d1",
        title: "緑茶",
        description: "温かい日本茶でほっと一息",
        price: 220,
        priceText: "¥220",
        image: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=1200&q=90",
        tags: ["non-alcohol"],
        available: true,
        category: "飲み物",
      },
      {
        id: "d2",
        title: "生ビール",
        description: "キンキンに冷えた1杯",
        price: 550,
        priceText: "¥550",
        image: "https://images.unsplash.com/photo-1564758866812-0a1f4f4f2f4b?auto=format&fit=crop&w=1200&q=90",
        tags: ["alcohol"],
        available: true,
        category: "飲み物",
      },
      {
        id: "d3",
        title: "ほうじ茶ラテ",
        description: "香ばしいほうじ茶のミルクラテ",
        price: 420,
        priceText: "¥420",
        image: "https://images.unsplash.com/photo-1452948491233-97e1a9f6a2d2?auto=format&fit=crop&w=1200&q=90",
        available: true,
        category: "飲み物",
      },
    ],
  },
  {
    key: "dessert",
    name: "デザート",
    items: [
      {
        id: "ds1",
        title: "抹茶アイス",
        description: "濃厚な抹茶の和風アイスクリーム",
        price: 380,
        priceText: "¥380",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=90",
        available: true,
        category: "デザート",
      },
      {
        id: "ds2",
        title: "みたらし団子",
        description: "甘辛いタレが香ばしい",
        price: 360,
        priceText: "¥360",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=90",
        available: true,
        category: "デザート",
      },
    ],
  },
]

export default menuCategories
