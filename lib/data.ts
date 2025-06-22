export type Company = {
  id: string;
  name: string;
  jobs: Job[];
};

export type Job = {
  id: string;
  title: string;
};

export type Profile = {
  id: string;
  email: string;
  nama: string;
  no_hp: string;
  pendidikan: string;
  pengalaman: string;
  cv_url: string | null;
};

export type Recommendation = {
  userId: string;
  jobId: string;
};

const jobsCompanyA: Job[] = [
  { id: 'job-1', title: 'Frontend Developer' },
  { id: 'job-2', title: 'Backend Developer' },
];

const jobsCompanyB: Job[] = [
  { id: 'job-3', title: 'UI/UX Designer' },
  { id: 'job-4', title: 'Product Manager' },
];

export const companies: Company[] = [
    { id: 'company-a', name: 'PT Maju Mundur', jobs: jobsCompanyA },
    { id: 'company-b', name: 'CV Pasti Jaya', jobs: jobsCompanyB },
];

export const profiles: Profile[] = [
  {
    id: 'user-1',
    email: 'pelamar@example.com',
    nama: 'Budi Pelamar',
    no_hp: '081234567890',
    pendidikan: 'S1 Teknik Informatika',
    pengalaman: '2 tahun sebagai web developer',
    cv_url: null,
  },
  {
    id: 'user-2',
    email: 'pelamar2@example.com',
    nama: 'Siti Pelamarwati',
    no_hp: '080987654321',
    pendidikan: 'D3 Manajemen Informatika',
    pengalaman: '1 tahun sebagai QA',
    cv_url: null,
  },
];

export let recommendations: Recommendation[] = [
    // Rekomendasi awal bisa kosong
];

// --- Fungsi untuk berinteraksi dengan data ---

export const findUserByEmail = (email: string) => {
    return profiles.find(p => p.email === email);
}

export const findUserById = (id: string) => {
    return profiles.find(p => p.id === id);
}

export const getJobsByCompany = (companyId: string) => {
    return companies.find(c => c.id === companyId)?.jobs || [];
}

export const getRecommendationsForUser = (userId: string) => {
    const userRecommendations = recommendations.filter(r => r.userId === userId);
    const recommendedJobs: { jobs: (Job & { companies: { name: string } | null }) | null }[] = [];

    userRecommendations.forEach(rec => {
        for (const company of companies) {
            const job = company.jobs.find(j => j.id === rec.jobId);
            if (job) {
                recommendedJobs.push({
                    jobs: {
                        ...job,
                        companies: { name: company.name }
                    }
                });
                break;
            }
        }
    });

    return recommendedJobs;
}

export const addRecommendation = (userId: string, jobIds: string[]) => {
    jobIds.forEach(jobId => {
        recommendations.push({ userId, jobId });
    });
    // Di dunia nyata, ini akan error karena kita memutasi array. 
    // Di lingkungan dev Next.js, ini akan "bekerja" per permintaan, tapi tidak permanen.
    return { success: true };
}

export const updateUserProfile = (userId: string, data: Partial<Omit<Profile, 'id' | 'email' | 'cv_url'>>) => {
    const profileIndex = profiles.findIndex(p => p.id === userId);
    if (profileIndex !== -1) {
        profiles[profileIndex] = { ...profiles[profileIndex], ...data };
        return { success: true, profile: profiles[profileIndex] };
    }
    return { success: false, error: "User not found" };
} 