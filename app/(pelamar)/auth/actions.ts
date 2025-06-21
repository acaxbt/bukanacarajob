'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Supabase login error:', error.message);
    return { error: 'Email atau password salah.' }
  }

  revalidatePath('/', 'layout')
  redirect('/profil')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    if (error.message.includes('User already registered')) {
        return { error: 'Email ini sudah terdaftar.'}
    }
    return { error: 'Gagal membuat akun. Silakan coba lagi.' }
  }

  revalidatePath('/', 'layout')
  redirect('/profil')
} 