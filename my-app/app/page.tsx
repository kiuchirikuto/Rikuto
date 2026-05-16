import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "天ぷら定食", description: "仮の説明文", price: "¥1,200" },
  { title: "お好み焼き", description: "仮の説明文", price: "¥980" },
  { title: "刺身盛り合わせ", description: "仮の説明文", price: "¥1,580" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col px-4 py-5">
        <header className="mb-5 rounded-[32px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-primary">OSAKI 亭</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">本日のメニュー</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            まずは仮のメニューから選んでください。
          </p>
        </header>

        <main className="mb-5 space-y-4">
          <section className="rounded-[32px] border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">メニュー表示エリア</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">以下はダミーのメニューです</p>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                仮表示
              </span>
            </div>
            <div className="space-y-3">
              {menuItems.map((item) => (
                <div key={item.title} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
                    </div>
                    <p className="text-sm font-semibold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
    </div>
  );
}
