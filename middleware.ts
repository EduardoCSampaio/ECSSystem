import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth');
  const { pathname } = request.nextUrl;

  // Se o usuário não está autenticado e tenta acessar qualquer rota /admin (exceto /admin/login)
  if (!isAuthenticated && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Se o usuário já está autenticado e tenta acessar a página de login
  if (isAuthenticated && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // O matcher agora cobre /admin e qualquer rota aninhada como /admin/projects, etc.
  matcher: ['/admin/:path*', '/admin'],
};
