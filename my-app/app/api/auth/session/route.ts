import { NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(req: Request) {
  const sess = getSessionFromRequest(req)
  if (!sess) return NextResponse.json({ authenticated: false })
  return NextResponse.json({ authenticated: true, session: sess })
}
