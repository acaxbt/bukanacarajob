import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from './profil-form'

type Company = {
  name: string
}

type Job = {
  title: string
  companies: Company[]
}

type Recommendation = {
  jobs: Job[]
}

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

  // Map jobs and companies to match expected type
  const mappedRecommendations = (recommendations || []).map((rec: Recommendation) => {
    const job = rec.jobs?.[0]
    if (!job) {
      return { jobs: null }
    }
    return {
      jobs: {
        title: job.title,
        companies: job.companies?.[0] || null,
      },
    }
  })

  return <ProfileForm user={user} profile={profile} recommendations={mappedRecommendations} />
} 