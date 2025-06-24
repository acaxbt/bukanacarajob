import { NextRequest, NextResponse } from 'next/server';
import { getAdminByEmail } from '@/lib/data';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password harus diisi' }, { status: 400 });
  }

  const admin = getAdminByEmail(email);

  if (!admin || password !== admin.password) {
    return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('session', admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return response;
} 