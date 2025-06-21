'use client'

import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import QrScanner from "./QrScanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Define types for our data
type Profile = {
  nama: string;
  pendidikan: string;
  pengalaman: string;
  cv_url: string;
};

type Job = {
  id: string;
  title: string;
};

type ScannedUser = {
  id: string;
  profile: Profile | null;
  jobs: Job[];
};

export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const [scannedUser, setScannedUser] = useState<ScannedUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isScannerVisible, setScannerVisible] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const fetchUserData = async (userId: string) => {
    setError(null);
    setScannedUser(null);
    setScannerVisible(false);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('nama, pendidikan, pengalaman, cv_url')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      setError("Profil pelamar tidak ditemukan.");
      return;
    }

    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('id, title')
      .eq('company_id', companyId);
    
    if (jobsError) {
      setError("Gagal mengambil data pekerjaan.");
      return;
    }

    setScannedUser({ id: userId, profile, jobs: jobs || [] });
  };
  
  const handleRecommendation = async () => {
    if (selectedJobs.length === 0 || !scannedUser) {
      setError("Pilih setidaknya satu pekerjaan untuk direkomendasikan.");
      return;
    }
    setError(null);
    setSuccess(null);

    // Since there is no admin login, we can either use a placeholder ID or null
    // Let's use null, as the database schema allows it.
    const adminId = null; 

    const recommendations = selectedJobs.map(jobId => ({
      admin_id: adminId,
      user_id: scannedUser.id,
      job_id: jobId,
    }));

    startTransition(async () => {
        const { error: recommendationError } = await supabase
            .from('recommendations')
            .insert(recommendations);
        
        if (recommendationError) {
            setError(`Gagal menyimpan rekomendasi: ${recommendationError.message}`);
        } else {
            setSuccess("Rekomendasi berhasil dikirim!");
            setSelectedJobs([]); // Reset selection
        }
    });
  }

  const resetScanner = () => {
    setScannedUser(null);
    setError(null);
    setSuccess(null);
    setScannerVisible(true);
    setSelectedJobs([]);
  };

  if (!companyId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">ID Perusahaan tidak ditemukan.</p>
        <Link href="/admin/select-company">
          <Button variant="link">Kembali ke pemilihan perusahaan</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Dasbor Admin</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Kolom Kiri: Scanner atau Info */}
        <Card>
          <CardHeader>
            <CardTitle>Pemindai QR Pelamar</CardTitle>
          </CardHeader>
          <CardContent>
            {isScannerVisible ? (
              <QrScanner
                onScanSuccess={(decodedText) => {
                  fetchUserData(decodedText);
                }}
                onScanFailure={() => {
                  // Ignore "No QR code found" errors
                }}
              />
            ) : (
                <div className="text-center">
                    <p className="text-green-600 font-semibold">Pemindaian Berhasil!</p>
                    <p className="text-sm text-gray-500">Data pelamar ditampilkan di sebelah kanan.</p>
                    <Button onClick={resetScanner} className="mt-4">
                        Pindai Lagi
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Kolom Kanan: Hasil Scan dan Aksi */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pelamar</CardTitle>
            <CardDescription>
              Data akan muncul di sini setelah QR berhasil dipindai.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {scannedUser?.profile ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{scannedUser.profile.nama}</h3>
                  <p className="text-sm">Pendidikan: {scannedUser.profile.pendidikan}</p>
                  <p className="text-sm">Pengalaman: {scannedUser.profile.pengalaman}</p>
                  {scannedUser.profile.cv_url && (
                    <Link href={scannedUser.profile.cv_url} target="_blank">
                      <Button variant="link" className="p-0 h-auto">Lihat CV</Button>
                    </Link>
                  )}
                </div>
                <hr/>
                <div>
                  <h4 className="font-semibold mb-2">Rekomendasikan Pekerjaan:</h4>
                  {scannedUser.jobs.length > 0 ? (
                    <div className="space-y-2">
                      {scannedUser.jobs.map(job => (
                        <div key={job.id} className="flex items-center space-x-2">
                           <Checkbox
                            id={job.id}
                            checked={selectedJobs.includes(job.id)}
                            onCheckedChange={(checked) => {
                                return checked
                                ? setSelectedJobs([...selectedJobs, job.id])
                                : setSelectedJobs(selectedJobs.filter((id) => id !== job.id));
                            }}
                            />
                          <Label htmlFor={job.id}>{job.title}</Label>
                        </div>
                      ))}
                       <Button onClick={handleRecommendation} disabled={isPending || selectedJobs.length === 0} className="mt-4 w-full">
                         {isPending ? "Mengirim..." : "Kirim Rekomendasi"}
                       </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Tidak ada lowongan untuk perusahaan ini.</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Arahkan kamera ke QR code pelamar untuk memulai.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 