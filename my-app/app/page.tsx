import { Button } from "@/components/ui/button";
import { OrderProvider } from "@/components/order/OrderProvider";
import OrderButton from "@/components/order/OrderButton";
import OrderList from "@/components/order/OrderList";
import menuCategories from "@/data/menu"
import getMenuCategoriesFromDB from '@/lib/menu'

export default async function Home() {
  const dbMenu = await getMenuCategoriesFromDB().catch(() => null)
  const menu = dbMenu ?? menuCategories

  return (
    <OrderProvider>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col px-4 py-5">
        <header className="mb-5 rounded-[32px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-primary">OSAKI 亭</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">人気メニュー</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            ジャンル別にメニューをチェックし、注文リストに追加してください。
          </p>
        </header>

        <main className="space-y-5">
          {menu.map((category) => (
            <section
              key={category.key}
              className="rounded-[32px] border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold">{category.name}</h2>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {category.items.length} 品
                </span>
              </div>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-[32px] border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <div className="h-40 overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
                        </div>
                        <p className="text-sm font-semibold">{item.priceText ?? `¥${item.price}`}</p>
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
  );
}
import os
import requests

def download_image(url, save_dir, file_name):
    # 保存先のフォルダが存在しない場合は作成
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
        print(f"フォルダを作成しました: {save_dir}")

    # 保存するファイルのフルパスを作成
    save_path = os.path.join(save_dir, file_name)

    try:
        # 画像データを取得（Streamモードで効率的にダウンロード）
        response = requests.get(url, stream=True, timeout=10)
        
        # ステータスコードが200（成功）か確認
        if response.status_code == 200:
            with open(save_path, 'wb') as file:
                for chunk in response.iter_content(chunk_size=1024):
                    file.write(chunk)
            print(f"ダウンロード成功: {save_path}")
        else:
            print(f"ダウンロード失敗（ステータスコード）: {response.status_code}")

    except Exception as e:
        print(f"エラーが発生しました: {e}")

# --- 実行部分 ---
if __name__ == "__main__":
    # 1. 取得したい画像のURL
    target_url = "https://example.com/image.jpg"  # ここに実際の画像URLを入れてください
    
    # 2. 保存したいフォルダ名
    output_folder = "downloaded_images"
    
    # 3. 保存するファイル名
    file_title = "downloaded_image.jpg"

    # 関数の実行
    download_image(target_url, output_folder, file_title)