"use client"

import React, { useState } from "react"
import { useOrder } from "@/components/order/OrderProvider"
import { Button } from "@/components/ui/button"

export default function OrderList() {
  const { cart, orders, removeFromCart, updateQty, placeOrder, clearCart } = useOrder()
  const [showHistory, setShowHistory] = useState(false)
  const [people, setPeople] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const total = cart.reduce((s, c) => s + (c.item.price || 0) * c.qty, 0)
  const totalText = total.toLocaleString()
  const perPerson = people > 0 ? Math.ceil(total / people) : total

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-32px)] max-w-[375px] -translate-x-1/2">
      <div className="rounded-xl bg-white p-3 shadow-lg dark:bg-zinc-900">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">カート ({cart.reduce((s, c) => s + c.qty, 0)})</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowHistory((s) => !s)}>
              {showHistory ? "カート表示" : "注文履歴"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => clearCart()}>
              クリア
            </Button>
          </div>
        </div>

        {!showHistory ? (
          <div className="space-y-2 max-h-40 overflow-auto">
            {cart.length === 0 ? (
              <p className="text-xs text-zinc-500">カートは空です</p>
            ) : (
              cart.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-md border p-2">
                  <div>
                    <p className="text-sm">{it.item.title}</p>
                    <p className="text-xs text-zinc-500">{it.item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => updateQty(idx, it.qty - 1)}>-</Button>
                    <div className="text-sm">{it.qty}</div>
                    <Button variant="outline" size="sm" onClick={() => updateQty(idx, it.qty + 1)}>+</Button>
                    <Button variant="outline" size="sm" onClick={() => removeFromCart(idx)}>
                      削除
                    </Button>
                  </div>
                </div>
              ))
            )}

            <div className="mt-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm">合計</div>
                <div className="text-sm font-semibold">¥{totalText}</div>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <label className="text-xs">人数</label>
                <input
                  type="number"
                  min={1}
                  value={people}
                  onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))}
                  className="w-16 rounded border px-2 py-1 text-sm"
                />
                <div className="text-xs">一人あたり: <span className="font-semibold">¥{perPerson.toLocaleString()}</span></div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={async () => {
                    setLoading(true)
                    setMessage(null)
                    const res = await placeOrder()
                    setLoading(false)
                    if (res?.success) {
                      setMessage('注文が送信されました')
                    } else {
                      setMessage(res?.message || '送信に失敗しました')
                    }
                    setTimeout(() => setMessage(null), 4000)
                  }}
                >
                  {loading ? '送信中…' : '注文確定'}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-40 overflow-auto">
            {orders.length === 0 ? (
              <p className="text-xs text-zinc-500">注文履歴はありません</p>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="rounded-md border p-2">
                  <p className="text-xs text-zinc-500">{new Date(o.date).toLocaleString()}</p>
                  <p className="text-sm font-semibold">{o.items.length} 品</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
