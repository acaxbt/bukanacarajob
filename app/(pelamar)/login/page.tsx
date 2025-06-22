'use client'

import { signIn } from "../auth/actions"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from 'react';

function LoginForm() {
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
                    <h2>Masuk sebagai Pelamar</h2>
                </header>
                <p>Silakan masuk untuk melanjutkan ke profil Anda.</p>
                <form action={signIn}>
                    {message && (
                        <p style={{ color: 'var(--pico-color-red-500)' }}>
                            {message}
                        </p>
                    )}
                    <label htmlFor="email">Email</label>
                    <input name="email" id="email" type="email" placeholder="email@contoh.com" defaultValue="user@nextmail.com" required />

                    <label htmlFor="password">Password</label>
                    <input name="password" id="password" type="password" placeholder="******" defaultValue="password123" required />

                    <button type="submit">Login</button>
                </form>
                <footer>
                    <small>
                        Belum punya akun? <Link href="/register">Daftar</Link>
                    </small>
                </footer>
            </article>
        </div>
    )
}


export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
} 