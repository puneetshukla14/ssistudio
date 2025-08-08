// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login']; // Bas login hi allowed hai public

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Agar public route hai, allow kar do
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Token check karo
  const token = req.cookies.get('token');
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
