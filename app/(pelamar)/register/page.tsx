'use client'

import { signup } from "../auth/actions"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function RegisterForm() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh'
    }}>
      <article style={{ width: '100%', maxWidth: '450px' }}>
        <header>
          <h2>Daftar Akun Baru</h2>
        </header>
        <p>Buat akun pelamar untuk melanjutkan.</p>

        <form action={signup}>
          {message && (
            <p style={{ color: 'var(--pico-color-red-500)' }}>
              {message}
            </p>
          )}

          <label htmlFor="email">Email</label>
          <input name="email" id="email" type="email" placeholder="email@contoh.com" required />

          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" placeholder="******" required />
          <small>Gunakan password: password123</small>

          <button type="submit">Daftar</button>
        </form>

        <footer>
          <small>
            Sudah punya akun? <Link href="/login">Login</Link>
          </small>
        </footer>
      </article>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  )
} 