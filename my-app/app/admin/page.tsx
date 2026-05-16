import { getSessionFromRequest } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminPage() {
  const hdrs = headers()
  const sess = getSessionFromRequest({ headers: { get: (k: string) => hdrs.get(k) } })
  if (!sess) redirect('/login')

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">従業員ダッシュボード</h1>
      <p className="mt-2">ログインユーザー: {sess.user}</p>
      <p className="mt-4">API や注文の管理をここで行えます。</p>
    </div>
  )
}
