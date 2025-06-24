'use client'
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCompanyById, getApplicantsByCompany, getUserById, Job, Company, companies } from '@/lib/data';
import QrScanner from './QrScanner';
import { User, Mail, CheckCircle, XCircle } from 'lucide-react';

type Applicant = {
  id: string;
  user_id: string;
  job_id: string;
  status: 'pending' | 'approved' | 'rejected';
  user?: {
    id: string;
    nama: string;
    email: string;
  };
  job?: Job;
};

type UserProfile = {
  id: string;
  nama: string;
  email: string;
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialCompanyId = searchParams.get('companyId') || companies[0].id;
  const [companyId, setCompanyId] = useState(initialCompanyId);
  const [company, setCompany] = useState<Company | null>(getCompanyById(initialCompanyId) ?? null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [verifiedUser, setVerifiedUser] = useState<{ profile: UserProfile, isApplicant: boolean } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (companyId) {
      const currentCompany = getCompanyById(companyId);
      setCompany(currentCompany ?? null);
      if (currentCompany) {
        const companyApplicants = getApplicantsByCompany(currentCompany.id);
        const applicantsWithDetails = companyApplicants.map((applicant: { id: string, user_id: string, job_id: string, status: 'pending' | 'approved' | 'rejected' }) => {
          const user = getUserById(applicant.user_id);
          const job = currentCompany.jobs.find((j: Job) => j.id === applicant.job_id);
          return { ...applicant, user, job };
        });
        setApplicants(applicantsWithDetails);
      }
    }
  }, [companyId]);

  const handleScan = (result: string | null) => {
    if (result) {
      const user = getUserById(result);
      if (user) {
        const isApplicantOfThisCompany = applicants.some(app => app.user_id === user.id);
        setVerifiedUser({ profile: user, isApplicant: isApplicantOfThisCompany });
      } else {
        const notFoundProfile: UserProfile = { id: 'N/A', nama: 'Tidak Ditemukan', email: 'Pengguna tidak ada di sistem' };
        setVerifiedUser({ profile: notFoundProfile, isApplicant: false });
      }
      setIsScanning(false);
    }
  };

  if (!company) {
    return (
      <article>
        <header>
          <h2>Memuat Data Perusahaan...</h2>
        </header>
        <p aria-busy="true">Mohon tunggu...</p>
      </article>
    );
  }

  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <h1>Dashboard Admin: {company.name || '-'}</h1>
        <div style={{ margin: '1rem 0' }}>
          <label htmlFor="company-select">Pilih Perusahaan: </label>
          <select
            id="company-select"
            value={companyId}
            onChange={e => setCompanyId(e.target.value)}
          >
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </header>
      
      <div className="grid">
        {/* Kolom Kiri */}
        <article>
          <header>
            <h4>Verifikasi Pelamar (Scan QR)</h4>
          </header>
          <button onClick={() => setIsScanning(!isScanning)} aria-busy={isScanning}>
            {isScanning ? 'Tutup Scanner' : 'Buka Scanner'}
          </button>
          
          {isScanning && <div style={{marginTop: '1rem'}}><QrScanner onScan={handleScan} /></div>}

          {verifiedUser && (
            <div style={{ marginTop: '1rem' }}>
              <h5>Hasil Verifikasi:</h5>
              {verifiedUser.isApplicant ? (
                <p style={{ color: 'var(--pico-color-green-500)' }}>
                  <CheckCircle size={16} /> <strong>Terverifikasi!</strong> Pelamar ini terdaftar di {company.name}.
                </p>
              ) : (
                <p style={{ color: 'var(--pico-color-red-500)' }}>
                  <XCircle size={16} /> <strong>Gagal!</strong> Pengguna ini bukan pelamar di {company.name}.
                </p>
              )}
              <p><User size={14} /> <strong>Nama:</strong> {verifiedUser.profile.nama}</p>
              <p><Mail size={14} /> <strong>Email:</strong> {verifiedUser.profile.email}</p>
            </div>
          )}
        </article>

        {/* Kolom Kanan */}
        <article>
          <header>
            <h4>Daftar Pelamar di {company.name}</h4>
          </header>
          <table>
            <thead>
              <tr>
                <th scope="col">Nama</th>
                <th scope="col">Email</th>
                <th scope="col">Posisi</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td>{applicant.user?.nama || 'N/A'}</td>
                  <td>{applicant.user?.email || 'N/A'}</td>
                  <td>{applicant.job?.title || 'N/A'}</td>
                  <td>{applicant.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {applicants.length === 0 && <p>Belum ada pelamar.</p>}
        </article>
      </div>
    </>
  );
}

export default function AdminDashboardPage() {
    return (
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    )
} 