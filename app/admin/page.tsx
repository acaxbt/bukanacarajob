'use client'

import { loginAdmin } from "./actions"
import { useSearchParams } from "next/navigation"
import { Suspense } from 'react';

function AdminLoginForm() {
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
                    <h2>Masuk sebagai Admin</h2>
                </header>
                <p>Gunakan akun admin untuk masuk ke dashboard.</p>
                <form action={loginAdmin}>
                    {message && (
                        <p style={{ color: 'var(--pico-color-red-500)' }}>
                            {message}
                        </p>
                    )}
                    <label htmlFor="email">Email</label>
                    <input name="email" id="email" type="email" placeholder="admin@contoh.com" defaultValue="admin@example.com" required />

                    <label htmlFor="password">Password</label>
                    <input name="password" id="password" type="password" placeholder="******" defaultValue="admin123" required />

                    <button type="submit">Login</button>
                </form>
            </article>
        </div>
    )
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminLoginForm />
        </Suspense>
    )
} 