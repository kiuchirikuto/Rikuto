"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type MenuItem = {
  title: string
  description?: string
  price: string
  image?: string
}

type Order = {
  id: number
  items: MenuItem[]
  date: string
}

type OrderContextType = {
  cart: MenuItem[]
  orders: Order[]
  addToCart: (item: MenuItem) => void
  removeFromCart: (index: number) => void
  placeOrder: () => void
  clearCart: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<MenuItem[]>([])
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
    setCart((p) => [...p, item])
  }

  function removeFromCart(index: number) {
    setCart((p) => p.filter((_, i) => i !== index))
  }

  function clearCart() {
    setCart([])
  }

  function placeOrder() {
    if (cart.length === 0) return
    const order: Order = { id: Date.now(), items: cart, date: new Date().toISOString() }
    setOrders((p) => [order, ...p])
    setCart([])
  }

  return (
    <OrderContext.Provider value={{ cart, orders, addToCart, removeFromCart, placeOrder, clearCart }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error("useOrder must be used within OrderProvider")
  return ctx
}
