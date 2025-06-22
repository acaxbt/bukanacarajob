'use server'

import { updateUserProfile } from "@/lib/data"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const cookieStore = await cookies()
  const userId = cookieStore.get('user_id')?.value

  if (!userId) {
    return { error: 'Authentication required.' }
  }

  const data = {
    nama: formData.get('nama') as string,
    no_hp: formData.get('no_hp') as string,
    pendidikan: formData.get('pendidikan') as string,
    pengalaman: formData.get('pengalaman') as string,
  }

  const result = updateUserProfile(userId, data)

  if (result.success) {
    revalidatePath('/profil')
    return { success: true }
  } else {
    return { error: result.error }
  }
} 