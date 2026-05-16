"use client"

import React from "react"
import { useOrder } from "@/components/order/OrderProvider"
import { Button } from "@/components/ui/button"

export default function OrderButton({ item }: { item: any }) {
  const { addToCart } = useOrder()
  return (
    <Button
      onClick={() => addToCart(item)}
      className="w-full"
      size="default"
    >
      注文リストへ追加
    </Button>
  )
}
