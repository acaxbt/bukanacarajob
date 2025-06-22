'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { updateProfile } from "./actions"
import { logout } from "../auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UserCircle2, Phone, GraduationCap, Briefcase, QrCode, CheckCircle2, XCircle } from "lucide-react"
import QRCode from "react-qr-code"

const profileSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong." }),
  no_hp: z.string().min(1, { message: "No. HP tidak boleh kosong." }),
  pendidikan: z.string().min(1, { message: "Pendidikan tidak boleh kosong." }),
  pengalaman: z.string().min(1, { message: "Pengalaman tidak boleh kosong." }),
})

type ProfileFormValues = z.infer<typeof profileSchema>

type Recommendation = {
  jobs: {
    title: string;
    companies: {
      name: string;
    } | null;
  } | null;
}

type User = {
  id: string;
  email?: string;
}

type Profile = {
  nama?: string;
  no_hp?: string;
  pendidikan?: string;
  pengalaman?: string;
  cv_url?: string | null;
}

export default function ProfileForm({ user, profile, recommendations }: { user: User | null, profile: Profile | null, recommendations: Recommendation[] }) {
  const [feedback, setFeedback] = useState<{ type?: 'success' | 'error', message?: string }>({})
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nama: profile?.nama || '',
      no_hp: profile?.no_hp || '',
      pendidikan: profile?.pendidikan || '',
      pengalaman: profile?.pengalaman || '',
    },
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    const formData = new FormData()
    formData.append('nama', data.nama)
    formData.append('no_hp', data.no_hp)
    formData.append('pendidikan', data.pendidikan)
    formData.append('pengalaman', data.pengalaman)

    setFeedback({ type: undefined, message: 'Menyimpan...'})
    const result = await updateProfile(formData)
    if (result.error) {
      setFeedback({ type: 'error', message: result.error })
    } else {
      setFeedback({ type: 'success', message: 'Profil berhasil diperbarui!' })
    }
  }

  return (
    <div style={{
      backgroundColor: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '42rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>

        {/* 1. Greeting */}
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          letterSpacing: '-0.025em',
          color: 'inherit'
        }}>
          Halo, {profile?.nama || 'Pelamar'}!
        </h1>
        
        {/* New "Job Assigned" Section */}
        {recommendations && recommendations.length > 0 && (
          <Card style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Briefcase style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.75rem', color: '#171717' }} />
                  <div>
                    <CardTitle>Rekomendasi Pekerjaan</CardTitle>
                    <CardDescription>Pekerjaan berikut telah direkomendasikan untuk Anda.</CardDescription>
                  </div>
              </div>
            </CardHeader>
            <CardContent>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {recommendations.map((rec, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '0.375rem'
                        }}>
                           <span style={{ fontWeight: '600', color: 'inherit' }}>{rec.jobs?.title || 'Unknown Job'}</span>
                           <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{rec.jobs?.companies?.name || 'Unknown Company'}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
        )}

        {/* 2. QR Code Section */}
        <Card style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <QrCode style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.75rem', color: '#171717' }} />
              <div>
                <CardTitle>Kode QR Verifikasi</CardTitle>
                <CardDescription>Tunjukkan kode ini untuk verifikasi instan.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
              maxWidth: '200px',
              margin: '0 auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {user?.id && <QRCode value={user.id} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. & 4. Profile Form Section */}
        <Card style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <UserCircle2 style={{ height: '2rem', width: '2rem', marginRight: '0.75rem', color: '#171717' }} />
              <div>
                  <CardTitle>Profil Pelamar</CardTitle>
                  <CardDescription>Perbarui data diri Anda di sini.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <FormField
                      control={form.control}
                      name="nama"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                              <UserCircle2 style={{ position: 'absolute', left: '0.75rem', height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
                              <FormControl>
                                  <Input placeholder="Nama Anda" {...field} style={{ paddingLeft: '2.5rem', height: '3rem' }} />
                              </FormControl>
                          </div>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="no_hp"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>No. Handphone</FormLabel>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                              <Phone style={{ position: 'absolute', left: '0.75rem', height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
                              <FormControl>
                                  <Input placeholder="08123456789" {...field} style={{ paddingLeft: '2.5rem', height: '3rem' }} />
                              </FormControl>
                          </div>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="pendidikan"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Pendidikan Terakhir</FormLabel>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                              <GraduationCap style={{ position: 'absolute', left: '0.75rem', height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
                              <FormControl>
                                  <Input placeholder="Contoh: S1 Teknik Informatika" {...field} style={{ paddingLeft: '2.5rem', height: '3rem' }} />
                              </FormControl>
                          </div>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="pengalaman"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Pengalaman</FormLabel>
                          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                              <Briefcase style={{ position: 'absolute', left: '0.75rem', height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
                              <FormControl>
                                  <Input placeholder="Contoh: 2 tahun sebagai..." {...field} style={{ paddingLeft: '2.5rem', height: '3rem' }} />
                              </FormControl>
                          </div>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <Button type="submit" style={{ width: '100%', height: '3rem' }} disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
              </form>
            </Form>
            {feedback.message && (
              <Alert style={{
                marginTop: '1rem',
                border: feedback.type === 'success' ? '1px solid #10b981' : '1px solid #ef4444',
                color: feedback.type === 'success' ? '#065f46' : '#991b1b',
                backgroundColor: feedback.type === 'success' ? '#d1fae5' : '#fee2e2'
              }}>
                {feedback.type === 'success' ? <CheckCircle2 style={{ height: '1rem', width: '1rem' }} /> : <XCircle style={{ height: '1rem', width: '1rem' }} />}
                <AlertTitle>{feedback.type === 'success' ? 'Berhasil' : 'Gagal'}</AlertTitle>
                <AlertDescription>
                  {feedback.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 5. Logout */}
        <Card style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader>
                <CardTitle>Sesi</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={logout}>
                    <Button type="submit" variant="destructive" style={{ width: '100%' }}>Logout</Button>
                </form>
            </CardContent>
        </Card>

      </div>
    </div>
  )
} 