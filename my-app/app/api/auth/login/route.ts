import { NextResponse } from 'next/server'
import { signSession, COOKIE_NAME } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    // simple credential check - set ADMIN_USER / ADMIN_PASS in env
    const ADMIN_USER = process.env.ADMIN_USER || 'admin'
    const ADMIN_PASS = process.env.ADMIN_PASS || 'password'

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signSession({ user: username, role: 'staff' })
    const res = NextResponse.json({ success: true })
    res.cookies.set({ name: COOKIE_NAME, value: token, httpOnly: true, path: '/', maxAge: 60 * 60 * 8 })
    return res
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 })
  }
}
