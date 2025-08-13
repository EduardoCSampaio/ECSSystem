import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (pathname === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};