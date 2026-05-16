"use client"

import React, { useState } from "react"
import { useOrder } from "@/components/order/OrderProvider"
import { Button } from "@/components/ui/button"

export default function OrderButton({ item }: { item: any }) {
  const { addToCart } = useOrder()
  const [msg, setMsg] = useState<string | null>(null)

  const handle = () => {
    const res = addToCart(item)
    if (!res || !res.success) {
      setMsg(res?.message ?? "追加に失敗しました")
      setTimeout(() => setMsg(null), 3000)
    } else {
      setMsg("カートに追加しました")
      setTimeout(() => setMsg(null), 1500)
    }
  }

  return (
    <div>
      <Button onClick={handle} className="w-full" size="default">
        注文リストへ追加
      </Button>
      {msg ? <p className="mt-2 text-xs text-center text-red-600 dark:text-red-400">{msg}</p> : null}
    </div>
  )
}
