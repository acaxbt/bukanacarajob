import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from './profil-form'

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profilePromise = supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const recommendationsPromise = supabase
    .from('recommendations')
    .select(`
      jobs (
        title,
        companies (
          name
        )
      )
    `)
    .eq('user_id', user.id);

  const [{ data: profile }, { data: recommendations }] = await Promise.all([
    profilePromise,
    recommendationsPromise
  ]);


  return <ProfileForm user={user} profile={profile} recommendations={recommendations || []} />
} 