'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAdminByEmail } from '@/lib/data'

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/admin?message=Email dan password harus diisi')
  }

  const admin = getAdminByEmail(email)

  if (!admin) {
    return redirect('/admin?message=Email atau password salah')
  }

  const isPasswordValid = password === admin.password

  if (!isPasswordValid) {
    return redirect('/admin?message=Email atau password salah')
  }

  cookies().set('session', admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })

  return redirect('/admin/dashboard')
} 