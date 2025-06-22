'use server'

import { updateProfile as updateUserProfile } from "@/lib/data"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const cookieStore = await cookies()
  const userId = cookieStore.get('user_id')?.value

  if (!userId) {
    return { error: 'Authentication required.' }
  }

  const result = updateUserProfile(userId, formData)

  if (result.success) {
    revalidatePath('/profil')
    return { success: true }
  } else {
    return { error: result.error }
  }
} 