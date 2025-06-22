'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { updateProfile } from "./actions"
import { logout } from "../auth/actions"
import { Briefcase, QrCode, UserCircle2, Phone, GraduationCap } from "lucide-react"
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
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nama: profile?.nama || '',
      no_hp: profile?.no_hp || '',
      pendidikan: profile?.pendidikan || '',
      pengalaman: profile?.pengalaman || '',
    },
  });

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
    <>
      <h1 style={{ textAlign: 'center' }}>
        Halo, {profile?.nama || 'Pelamar'}!
      </h1>
      
      <div className="grid">
        {/* Kolom Kiri */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {recommendations && recommendations.length > 0 && (
            <article>
              <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Briefcase />
                <h4>Rekomendasi Pekerjaan</h4>
              </header>
              <ul>
                {recommendations.map((rec, index) => (
                  <li key={index}>
                    <strong>{rec.jobs?.title || 'Unknown Job'}</strong> - <small>{rec.jobs?.companies?.name || 'Unknown Company'}</small>
                  </li>
                ))}
              </ul>
            </article>
          )}

          <article>
            <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <QrCode />
              <h4>Kode QR Verifikasi</h4>
            </header>
            <div style={{ background: 'white', padding: '1rem', maxWidth: '200px', margin: 'auto' }}>
              {user?.id && <QRCode value={user.id} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />}
            </div>
            <p><small>Tunjukkan kode ini untuk verifikasi instan.</small></p>
          </article>
        </div>

        {/* Kolom Kanan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <article>
            <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <UserCircle2 />
              <h4>Profil Pelamar</h4>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="nama">Nama Lengkap</label>
              <input type="text" id="nama" {...register("nama")} aria-invalid={errors.nama ? "true" : "false"} />
              {errors.nama && <small style={{ color: 'var(--pico-color-red-500)' }}>{errors.nama.message}</small>}
              
              <label htmlFor="no_hp">No. Handphone</label>
              <input type="tel" id="no_hp" {...register("no_hp")} aria-invalid={errors.no_hp ? "true" : "false"} />
              {errors.no_hp && <small style={{ color: 'var(--pico-color-red-500)' }}>{errors.no_hp.message}</small>}

              <label htmlFor="pendidikan">Pendidikan Terakhir</label>
              <input type="text" id="pendidikan" {...register("pendidikan")} aria-invalid={errors.pendidikan ? "true" : "false"} />
              {errors.pendidikan && <small style={{ color: 'var(--pico-color-red-500)' }}>{errors.pendidikan.message}</small>}
              
              <label htmlFor="pengalaman">Pengalaman</label>
              <input type="text" id="pengalaman" {...register("pengalaman")} aria-invalid={errors.pengalaman ? "true" : "false"} />
              {errors.pengalaman && <small style={{ color: 'var(--pico-color-red-500)' }}>{errors.pengalaman.message}</small>}
              
              <button type="submit" aria-busy={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </form>
            {feedback.message && (
              <p style={{ color: feedback.type === 'success' ? 'var(--pico-color-green-500)' : 'var(--pico-color-red-500)'}}>
                {feedback.message}
              </p>
            )}
          </article>

          <article>
            <header><h4>Sesi</h4></header>
            <form action={logout}>
              <button type="submit" className="secondary outline">Logout</button>
            </form>
          </article>
        </div>
      </div>
    </>
  )
} 