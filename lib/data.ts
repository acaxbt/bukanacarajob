export type Company = {
  id: string;
  name: string;
  jobs: Job[];
};

export type Job = {
  id: string;
  title: string;
  description: string;
  job_category: string;
};

export const companies: Company[] = [
    {
        id: 'company-a',
        name: 'Perusahaan A',
        jobs: [
            { id: 'job-a1', title: 'Frontend Developer', description: 'Membangun antarmuka pengguna yang responsif.', job_category: 'Teknik' },
            { id: 'job-a2', title: 'Backend Developer', description: 'Mengelola logika sisi server dan database.', job_category: 'Teknik' },
            { id: 'job-a3', title: 'QA Engineer', description: 'Menjamin kualitas aplikasi melalui pengujian.', job_category: 'Teknik' },
        ]
    },
    {
        id: 'company-b',
        name: 'Perusahaan B',
        jobs: [
            { id: 'job-b1', title: 'UI/UX Designer', description: 'Merancang pengalaman pengguna yang intuitif.', job_category: 'Desain' },
            { id: 'job-b2', title: 'Graphic Designer', description: 'Membuat materi visual untuk promosi.', job_category: 'Desain' },
        ]
    },
    {
        id: 'company-c',
        name: 'Perusahaan C',
        jobs: [
            { id: 'job-c1', title: 'Marketing Specialist', description: 'Mengelola strategi pemasaran dan kampanye.', job_category: 'Pemasaran' },
            { id: 'job-c2', title: 'Content Writer', description: 'Menulis konten untuk blog dan media sosial.', job_category: 'Pemasaran' },
        ]
    },
    {
        id: 'company-d',
        name: 'Perusahaan D',
        jobs: [
            { id: 'job-d1', title: 'HR Generalist', description: 'Mengelola administrasi dan proses HR.', job_category: 'SDM' },
            { id: 'job-d2', title: 'Recruiter', description: 'Mencari dan merekrut kandidat terbaik.', job_category: 'SDM' },
        ]
    }
];

export const users = [
    {
        id: 'user-1',
        email: 'user@nextmail.com',
        password: 'password123',
        profile: {
            nama: 'Ahmad Subarjo',
            no_hp: '081234567890',
            pendidikan: 'S1 Teknik Informatika',
            pengalaman: '5 tahun sebagai software engineer'
        }
    },
    {
        id: 'user-2',
        email: 'user2@nextmail.com',
        password: 'password123',
        profile: {
            nama: 'Budi Santoso',
            no_hp: '081234567891',
            pendidikan: 'S1 Desain Grafis',
            pengalaman: '3 tahun sebagai UI/UX Designer'
        }
    }
];

export const admins = [
    {
        id: 'admin-1',
        email: 'admin@example.com',
        password: 'admin123'
    }
];

export const applicants = [
    { id: 'app-1', user_id: 'user-1', job_id: 'job-a1', status: 'pending' as const },
    { id: 'app-2', user_id: 'user-2', job_id: 'job-b1', status: 'approved' as const },
];

export const recommendations: { user_id: string, job_id: string }[] = [
    { user_id: 'user-1', job_id: 'job-a2' }
];

export function getCompanyById(id: string) {
    return companies.find(c => c.id === id);
}

export function getJobsByCompanyId(id: string) {
    const company = getCompanyById(id);
    return company ? company.jobs : [];
}

export function getApplicantsByCompany(companyId: string) {
    const companyJobs = getJobsByCompanyId(companyId).map(j => j.id);
    return applicants.filter(app => companyJobs.includes(app.job_id));
}

export function getUserById(id: string) {
    const user = users.find(u => u.id === id);
    if (user) {
        return {
            id: user.id,
            email: user.email,
            ...user.profile
        };
    }
    return undefined;
}

export function getAdminByEmail(email: string) {
    return admins.find(a => a.email === email);
}

export function getProfile(userId: string) {
    const user = users.find(u => u.id === userId);
    return user ? user.profile : null;
}

export function getRecommendationsForUser(userId: string) {
    const recommendedJobIds = recommendations.filter(r => r.user_id === userId).map(r => r.job_id);
    const recommendedJobs = companies.flatMap(c => c.jobs)
        .filter(j => recommendedJobIds.includes(j.id))
        .map(job => {
            const company = companies.find(c => c.jobs.some(j => j.id === job.id));
            return {
                jobs: { ...job, companies: { name: company?.name || 'Unknown' } }
            };
        });
    return recommendedJobs;
}

export function updateProfile(userId: string, formData: FormData) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.profile.nama = formData.get('nama') as string || user.profile.nama;
        user.profile.no_hp = formData.get('no_hp') as string || user.profile.no_hp;
        user.profile.pendidikan = formData.get('pendidikan') as string || user.profile.pendidikan;
        user.profile.pengalaman = formData.get('pengalaman') as string || user.profile.pengalaman;
        return { success: true };
    }
    return { success: false, error: "User not found" };
}

export function addRecommendation(userId: string, jobIds: string[]) {
    jobIds.forEach(jobId => {
        if (!recommendations.some(r => r.user_id === userId && r.job_id === jobId)) {
            recommendations.push({ user_id: userId, job_id: jobId });
        }
    });
}

export function createUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (users.find(u => u.email === email)) {
        return { success: false, error: "User with this email already exists" };
    }

    const newUser = {
        id: `user-${Date.now()}`,
        email,
        password,
        profile: {
            nama: email.split('@')[0],
            no_hp: '',
            pendidikan: '',
            pengalaman: ''
        }
    };

    users.push(newUser);
    return { success: true, user: newUser };
}

export function getUnassignedUsers() {
    // User yang belum ada di applicants
    const assignedUserIds = new Set(applicants.map(a => a.user_id));
    return users.filter(u => !assignedUserIds.has(u.id));
}

export function assignUserToJob(userId: string, jobId: string) {
    if (!applicants.some(a => a.user_id === userId && a.job_id === jobId)) {
        applicants.push({ id: `app-${Date.now()}`, user_id: userId, job_id: jobId, status: 'pending' });
        return { success: true };
    }
    return { success: false, error: 'User already assigned to this job' };
} 