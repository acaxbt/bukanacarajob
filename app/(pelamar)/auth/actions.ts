'use server'

import { findUserByEmail } from '@/lib/data'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const FAKE_PASSWORD = 'password123' // In a real app, do not do this!

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/login?message=Email and password are required')
  }

  const user = findUserByEmail(email)

  // NOTE: This is a highly insecure way to check passwords.
  // This is for demonstration purposes only in a full-local setup.
  if (user && password === FAKE_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    return redirect('/profil')
  }

  return redirect('/login?message=Invalid email or password')
}

export async function signup() {
  // Signup is disabled in local mode.
  return redirect('/register?message=Registration is disabled in local mode.')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('user_id')
  redirect('/login')
} 