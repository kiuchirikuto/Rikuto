import jwt from 'jsonwebtoken'

const SECRET = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'dev_secret'
const COOKIE_NAME = 'osaki_token'

function parseCookies(cookieHeader?: string | null) {
  const out: Record<string,string> = {}
  if (!cookieHeader) return out
  for (const part of cookieHeader.split(';')) {
    const [k, ...v] = part.split('=')
    out[k.trim()] = decodeURIComponent((v || []).join('=').trim())
  }
  return out
}

export function signSession(payload: any) {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' })
}

export function verifySession(token: string) {
  try {
    return jwt.verify(token, SECRET) as any
  } catch (e) {
    return null
  }
}

export function getTokenFromRequest(req: Request | { headers?: any }) {
  const headers = (req as any).headers
  let cookieHeader: string | null = null
  if (headers?.get) {
    cookieHeader = headers.get('cookie')
  } else if (headers?.cookie) {
    cookieHeader = headers.cookie
  }
  const cookies = parseCookies(cookieHeader)
  return cookies[COOKIE_NAME]
}

export function getSessionFromRequest(req: Request | { headers?: any }) {
  const token = getTokenFromRequest(req)
  if (!token) return null
  return verifySession(token)
}

export { COOKIE_NAME }
