import { Button } from "@/components/ui/button";
import { OrderProvider } from "@/components/order/OrderProvider";
import OrderButton from "@/components/order/OrderButton";
import OrderList from "@/components/order/OrderList";

const menuCategories = [
  {
    genre: "主菜",
    items: [
      {
        title: "天ぷら定食",
        description: "えび・野菜の天ぷらとご飯セット",
        price: "¥1,200",
        image: "https://nakaya-karasuyama.jp/wp-content/uploads/2021/04/lunch_6.jpg",
      },
      {
        title: "お好み焼き",
        description: "ふわふわキャベツ入りの定番お好み焼き",
        price: "¥980",
        image: "https://nakaya-karasuyama.jp/wp-content/uploads/2021/04/lunch_7.jpg",
      },
      {
        title: "刺身盛り合わせ",
        description: "新鮮な魚介をたっぷりどうぞ",
        price: "¥1,580",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=375&q=80",
      },
    ],
  },
  {
    genre: "飲み物",
    items: [
      {
        title: "緑茶",
        description: "温かい日本茶でほっと一息",
        price: "¥220",
        image: "https://images.unsplash.com/photo-1510626176961-4b37a1b5d8c5?auto=format&fit=crop&w=375&q=80",
      },
      {
        title: "生ビール",
        description: "キンキンに冷えた1杯",
        price: "¥550",
        image: "https://images.unsplash.com/photo-1542444459-db88e6c8f2f2?auto=format&fit=crop&w=375&q=80",
      },
      {
        title: "ほうじ茶ラテ",
        description: "香ばしいほうじ茶のミルクラテ",
        price: "¥420",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=375&q=80",
      },
    ],
  },
  {
    genre: "デザート",
    items: [
      {
        title: "抹茶アイス",
        description: "濃厚な抹茶の和風アイスクリーム",
        price: "¥380",
        image: "https://images.unsplash.com/photo-1599785209707-7d64d4668f1c?auto=format&fit=crop&w=375&q=80",
      },
      {
        title: "みたらし団子",
        description: "甘辛いタレが香ばしい",
        price: "¥360",
        image: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=375&q=80",
      },
    ],
  },
];

export default function Home() {
  return (
    <OrderProvider>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col px-4 py-5">
        <header className="mb-5 rounded-[32px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-primary">OSAKI 亭</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">本日のおすすめ</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            ジャンル別にメニューをチェックし、注文リストに追加してください。
          </p>
        </header>

        <main className="space-y-5">
          {menuCategories.map((category) => (
            <section
              key={category.genre}
              className="rounded-[32px] border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold">{category.genre}</h2>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {category.items.length} 品
                </span>
              </div>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.title}
                    className="overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <div className="h-40 overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
                        </div>
                        <p className="text-sm font-semibold">{item.price}</p>
                      </div>
                      <OrderButton item={item} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-[32px] border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <p className="mb-3 text-sm font-semibold">追加導線</p>
            <Button className="w-full" size="default">
              注文を追加
            </Button>
          </section>
        </main>

        <footer className="mt-auto rounded-[32px] border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="mb-3 text-sm font-semibold">注文リストへ進む</p>
          <Button className="w-full" size="lg">
            注文リストへ進む
          </Button>
        </footer>
      </div>
      <OrderList />
    </div>
  </OrderProvider>
    </div>
  );
}
