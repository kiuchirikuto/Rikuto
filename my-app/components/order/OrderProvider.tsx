"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import type { MenuItem } from "@/data/menu"

export type CartItem = {
  item: MenuItem
  qty: number
}

type Order = {
  id: number
  items: (MenuItem & { qty: number })[]
  date: string
}

type OrderContextType = {
  cart: CartItem[]
  orders: Order[]
  addToCart: (item: MenuItem) => { success: boolean; message?: string }
  removeFromCart: (index: number) => void
  updateQty: (index: number, qty: number) => void
  placeOrder: () => void
  clearCart: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    try {
      const s = localStorage.getItem("osaki_cart")
      const o = localStorage.getItem("osaki_orders")
      if (s) setCart(JSON.parse(s))
      if (o) setOrders(JSON.parse(o))
    } catch (e) {
      console.warn(e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("osaki_cart", JSON.stringify(cart))
    } catch (e) {}
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem("osaki_orders", JSON.stringify(orders))
    } catch (e) {}
  }, [orders])

  function addToCart(item: MenuItem) {
    if (item.available === false) {
      return { success: false, message: "申し訳ありません。このメニューは品切れです。" }
    }

    setCart((p) => {
      const idx = p.findIndex((c) => c.item.id === item.id)
      if (idx > -1) {
        const copy = [...p]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
        return copy
      }
      return [...p, { item, qty: 1 }]
    })

    return { success: true }
  }

  function removeFromCart(index: number) {
    setCart((p) => p.filter((_, i) => i !== index))
  }

  function updateQty(index: number, qty: number) {
    setCart((p) => {
      if (qty <= 0) return p.filter((_, i) => i !== index)
      const copy = [...p]
      copy[index] = { ...copy[index], qty }
      return copy
    })
  }

  function clearCart() {
    setCart([])
  }

  function placeOrder() {
    if (cart.length === 0) return
    const order: Order = {
      id: Date.now(),
      items: cart.map((c) => ({ ...c.item, qty: c.qty })),
      date: new Date().toISOString(),
    }
    setOrders((p) => [order, ...p])
    setCart([])
  }

  return (
    <OrderContext.Provider value={{ cart, orders, addToCart, removeFromCart, updateQty, placeOrder, clearCart }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error("useOrder must be used within OrderProvider")
  return ctx
}
