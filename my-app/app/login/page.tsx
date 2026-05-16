"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (!res.ok) setError(data?.error || 'ログインに失敗しました')
    else router.push('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <form onSubmit={submit} className="w-full max-w-md rounded p-6 bg-white shadow">
        <h2 className="mb-4 text-lg font-semibold">従業員ログイン</h2>
        {error && <div className="mb-2 text-sm text-red-600">{error}</div>}
        <label className="block mb-2">
          <div className="text-xs mb-1">ユーザー名</div>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded border px-2 py-1" />
        </label>
        <label className="block mb-4">
          <div className="text-xs mb-1">パスワード</div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded border px-2 py-1" />
        </label>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded bg-primary text-white" type="submit">ログイン</button>
        </div>
      </form>
    </div>
  )
}
