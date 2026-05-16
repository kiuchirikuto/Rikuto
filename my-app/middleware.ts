import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/admin', '/api/admin']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // if path starts with protected paths and no cookie, redirect to /login
  for (const p of PROTECTED_PATHS) {
    if (pathname.startsWith(p)) {
      const cookie = req.cookies.get('osaki_token')
      if (!cookie) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
