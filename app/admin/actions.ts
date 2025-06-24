'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAdminByEmail } from '@/lib/data'

export async function loginAdmin(formData: FormData) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    return redirect(`/admin?message=${encodeURIComponent(data.error || 'Login gagal')}`);
  }

  return redirect('/admin/dashboard');
} 