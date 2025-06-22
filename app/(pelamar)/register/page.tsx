'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signup } from "../auth/actions"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function RegisterForm() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <Card style={{ width: '100%', maxWidth: '28rem' }}>
        <CardHeader>
          <CardTitle>Daftar Akun Baru</CardTitle>
          <CardDescription>Buat akun pelamar untuk melanjutkan.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signup} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {message && (
              <div style={{ 
                color: '#ef4444', 
                fontSize: '0.875rem',
                padding: '0.75rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.375rem'
              }}>
                {message}
              </div>
            )}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                color: 'inherit'
              }}>
                Email
              </label>
              <Input name="email" type="email" placeholder="email@contoh.com" required />
            </div>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                color: 'inherit'
              }}>
                Password
              </label>
              <Input name="password" type="password" placeholder="******" required />
              <small style={{ 
                color: 'inherit',
                opacity: 0.7,
                fontSize: '0.75rem',
                marginTop: '0.25rem',
                display: 'block'
              }}>
                Gunakan password: password123
              </small>
            </div>
            <Button type="submit" style={{ width: '100%' }}>
              Daftar
            </Button>
            <div style={{ 
              marginTop: '1rem', 
              textAlign: 'center', 
              fontSize: '0.875rem',
              color: 'inherit'
            }}>
              Sudah punya akun?{" "}
              <Link href="/login" style={{ 
                textDecoration: 'underline',
                color: 'inherit'
              }}>
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
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