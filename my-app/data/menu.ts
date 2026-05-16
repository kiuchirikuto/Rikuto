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
        image: "https://nakaya-karasuyama.jp/wp-content/uploads/2021/04/lunch_6.jpg",
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
        image: "https://nakaya-karasuyama.jp/wp-content/uploads/2021/04/lunch_7.jpg",
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
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=375&q=80",
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
        image: "https://images.unsplash.com/photo-1510626176961-4b37a1b5d8c5?auto=format&fit=crop&w=375&q=80",
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
        image: "https://images.unsplash.com/photo-1542444459-db88e6c8f2f2?auto=format&fit=crop&w=375&q=80",
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
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=375&q=80",
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
        image: "https://images.unsplash.com/photo-1599785209707-7d64d4668f1c?auto=format&fit=crop&w=375&q=80",
        available: true,
        category: "デザート",
      },
      {
        id: "ds2",
        title: "みたらし団子",
        description: "甘辛いタレが香ばしい",
        price: 360,
        priceText: "¥360",
        image: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=375&q=80",
        available: true,
        category: "デザート",
      },
    ],
  },
]

export default menuCategories
