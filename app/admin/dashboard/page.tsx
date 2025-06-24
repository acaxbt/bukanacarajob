'use client'
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCompanyById, getApplicantsByCompany, getUserById, Job, Company, companies, assignUserToJob } from '@/lib/data';
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
  const [assignJobId, setAssignJobId] = useState('');
  const [assignMessage, setAssignMessage] = useState<string | null>(null);

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

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifiedUser && assignJobId) {
      const result = assignUserToJob(verifiedUser.profile.id, assignJobId);
      if (result.success) {
        setAssignMessage('Pelamar berhasil diassign ke job!');
        setAssignJobId('');
        // Refresh applicants
        if (company) {
          const companyApplicants = getApplicantsByCompany(company.id);
          const applicantsWithDetails = companyApplicants.map((applicant: { id: string, user_id: string, job_id: string, status: 'pending' | 'approved' | 'rejected' }) => {
            const user = getUserById(applicant.user_id);
            const job = company.jobs.find((j: Job) => j.id === applicant.job_id);
            return { ...applicant, user, job };
          });
          setApplicants(applicantsWithDetails);
        }
        setVerifiedUser(null);
      } else {
        setAssignMessage(result.error || 'Gagal assign pelamar');
      }
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
          {verifiedUser && (
            <section style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
              <h4>Assign Pelamar ke Job</h4>
              <form onSubmit={handleAssign} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span><strong>{verifiedUser.profile.nama}</strong> ({verifiedUser.profile.email})</span>
                <select value={assignJobId} onChange={e => setAssignJobId(e.target.value)} required disabled={!company}>
                  <option value="">Pilih Job</option>
                  {company?.jobs.map(j => (
                    <option key={j.id} value={j.id}>{j.title}</option>
                  ))}
                </select>
                <button type="submit">Assign</button>
              </form>
              {assignMessage && <p style={{ color: 'green' }}>{assignMessage}</p>}
            </section>
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