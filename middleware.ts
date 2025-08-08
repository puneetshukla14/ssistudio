import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get('token')?.value ||
    req.headers.get('cookie')?.match(/token=([^;]+)/)?.[1] || null

  const isProtectedRoute = [
    '/dashboard',

  ].some((route) => req.nextUrl.pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',

  ],
}