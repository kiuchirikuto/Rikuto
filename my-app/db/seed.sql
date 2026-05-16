-- Seed SQL for Neon / PostgreSQL
-- Run this against your Neon database (psql or the Neon SQL editor).

CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER,
  image TEXT,
  category TEXT
);

TRUNCATE TABLE menu_items;

INSERT INTO menu_items (id, title, description, price, image, category) VALUES
('t1', '天ぷら定食', 'えび・野菜の天ぷらとご飯セット', 1200, 'https://images.unsplash.com/photo-1604908177522-3f7a3a7d4c7f?auto=format&fit=crop&w=1200&q=90', '主菜'),
('o1', 'お好み焼き', 'ふわふわキャベツ入りの定番お好み焼き', 980, '/menus/okonomiyaki.jpg', '主菜'),
('s1', '刺身盛り合わせ', '新鮮な魚介をたっぷりどうぞ', 1580, 'https://images.unsplash.com/photo-1564758866812-7a8b7b6d9a8f?auto=format&fit=crop&w=1200&q=90', '主菜'),
('d1', '緑茶', '温かい日本茶でほっと一息', 220, 'https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=1200&q=90', '飲み物'),
('d2', '生ビール', 'キンキンに冷えた1杯', 550, 'https://images.unsplash.com/photo-1564758866812-0a1f4f4f2f4b?auto=format&fit=crop&w=1200&q=90', '飲み物'),
('ds1', '抹茶アイス', '濃厚な抹茶の和風アイスクリーム', 380, 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=90', 'デザート');

-- After running this, set DATABASE_URL in your environment to the Neon connection string.

-- Orders tables
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  total INTEGER,
  metadata JSONB
);

CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id TEXT,
  title TEXT,
  qty INTEGER,
  price INTEGER
);
