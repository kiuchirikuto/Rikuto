"use client"

import React, { useState } from "react"
import { useOrder } from "@/components/order/OrderProvider"
import { Button } from "@/components/ui/button"

export default function OrderList() {
  const { cart, orders, removeFromCart, placeOrder, clearCart } = useOrder()
  const [showHistory, setShowHistory] = useState(false)

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-32px)] max-w-[375px] -translate-x-1/2">
      <div className="rounded-xl bg-white p-3 shadow-lg dark:bg-zinc-900">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">カート ({cart.length})</h3>
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
                    <p className="text-sm">{it.title}</p>
                    <p className="text-xs text-zinc-500">{it.price}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeFromCart(idx)}>
                    削除
                  </Button>
                </div>
              ))
            )}

            <div className="mt-2 flex gap-2">
              <Button className="flex-1" onClick={() => placeOrder()}>
                注文確定
              </Button>
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
