import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'; // Senha padrão é 'admin'

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    cookies().set('auth', 'true', { httpOnly: true, maxAge: 60 * 60 * 24 }); // Expira em 1 dia
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}