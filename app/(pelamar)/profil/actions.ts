'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Anda harus login untuk memperbarui profil.' };
    }

    const nama = formData.get('nama') as string;
    const no_hp = formData.get('no_hp') as string;
    const pendidikan = formData.get('pendidikan') as string;
    const pengalaman = formData.get('pengalaman') as string;
    const cvFile = formData.get('cv') as File;

    let cv_url = formData.get('current_cv_url') as string || null;

    if (cvFile && cvFile.size > 0) {
        const filePath = `${user.id}/${Date.now()}-${cvFile.name}`;
        const { error: uploadError } = await supabase.storage
            .from('cvs')
            .upload(filePath, cvFile);

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return { error: 'Gagal mengunggah CV.' };
        }

        const { data: { publicUrl } } = supabase.storage.from('cvs').getPublicUrl(filePath);
        cv_url = publicUrl;
    }
    
    const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            nama,
            no_hp,
            pendidikan,
            pengalaman,

            cv_url,
            updated_at: new Date(),
        });

    if (updateError) {
        console.error('Update error:', updateError);
        return { error: 'Gagal memperbarui profil.' };
    }

    revalidatePath('/profil');
    return { success: 'Profil berhasil diperbarui.' };
} 