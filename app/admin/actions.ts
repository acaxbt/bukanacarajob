'use server'

import { redirect } from 'next/navigation'

export async function loginAdmin(formData: FormData) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bukanacarajob.vercel.app';
  const res = await fetch(`${baseUrl}/api/admin/login`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    return redirect(`/admin?message=${encodeURIComponent(data.error || 'Login gagal')}`);
  }

  return redirect('/admin/dashboard');
} 