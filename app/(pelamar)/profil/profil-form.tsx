'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { updateProfile } from "./actions"
import { logout } from "../auth/actions"
import { useState } from "react"
import QRCode from "react-qr-code"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Briefcase, CheckCircle2, GraduationCap, Phone, QrCode, UserCircle2, XCircle } from "lucide-react"

const profileSchema = z.object({
  nama: z.string().min(1, { message: "Nama harus diisi." }),
  no_hp: z.string().min(1, { message: "No. HP harus diisi." }),
  pendidikan: z.string().min(1, { message: "Pendidikan terakhir harus diisi." }),
  pengalaman: z.string().min(1, { message: "Pengalaman harus diisi." }),
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
    <div className="bg-gray-50 dark:bg-gray-950 flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl space-y-8">

        {/* 1. Greeting */}
        <h1 className="text-3xl font-bold text-center tracking-tight">
          Halo, {profile?.nama || 'Pelamar'}!
        </h1>
        
        {/* New "Job Assigned" Section */}
        {recommendations && recommendations.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center">
                  <Briefcase className="h-6 w-6 mr-3 text-primary"/>
                  <div>
                    <CardTitle>Rekomendasi Pekerjaan</CardTitle>
                    <CardDescription>Pekerjaan berikut telah direkomendasikan untuk Anda.</CardDescription>
                  </div>
              </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                           <span className="font-semibold">{rec.jobs?.title || 'Unknown Job'}</span>
                           <span className="text-sm text-gray-500 dark:text-gray-400">{rec.jobs?.companies?.name || 'Unknown Company'}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
        )}

        {/* 2. QR Code Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center">
              <QrCode className="h-6 w-6 mr-3 text-primary"/>
              <div>
                <CardTitle>Kode QR Verifikasi</CardTitle>
                <CardDescription>Tunjukkan kode ini untuk verifikasi instan.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded-lg shadow-inner max-w-[200px] mx-auto">
              <div className="flex justify-center">
                  {user?.id && <QRCode value={user.id} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. & 4. Profile Form Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center">
              <UserCircle2 className="h-8 w-8 mr-3 text-primary"/>
              <div>
                  <CardTitle>Profil Pelamar</CardTitle>
                  <CardDescription>Perbarui data diri Anda di sini.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                      control={form.control}
                      name="nama"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <div className="relative flex items-center">
                              <UserCircle2 className="absolute left-3 h-5 w-5 text-gray-400" />
                              <FormControl>
                                  <Input placeholder="Nama Anda" {...field} className="pl-10 h-12"/>
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
                          <div className="relative flex items-center">
                              <Phone className="absolute left-3 h-5 w-5 text-gray-400" />
                              <FormControl>
                                  <Input placeholder="08123456789" {...field} className="pl-10 h-12"/>
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
                          <div className="relative flex items-center">
                              <GraduationCap className="absolute left-3 h-5 w-5 text-gray-400" />
                              <FormControl>
                                  <Input placeholder="Contoh: S1 Teknik Informatika" {...field} className="pl-10 h-12"/>
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
                          <div className="relative flex items-center">
                              <Briefcase className="absolute left-3 h-5 w-5 text-gray-400" />
                              <FormControl>
                                  <Input placeholder="Contoh: 2 tahun sebagai..." {...field} className="pl-10 h-12"/>
                              </FormControl>
                          </div>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <Button type="submit" className="w-full h-12" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
              </form>
            </Form>
            {feedback.message && (
              <Alert className={`mt-4 ${feedback.type === 'success' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'}`}>
                {feedback.type === 'success' ? <CheckCircle2 className="h-4 w-4"/> : <XCircle className="h-4 w-4"/>}
                <AlertTitle>{feedback.type === 'success' ? 'Berhasil' : 'Gagal'}</AlertTitle>
                <AlertDescription>
                  {feedback.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 5. Logout */}
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Sesi</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={logout}>
                    <Button type="submit" variant="destructive" className="w-full">Logout</Button>
                </form>
            </CardContent>
        </Card>

      </div>
    </div>
  )
} 