import { notFound } from "next/navigation";
import { companies } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = companies.find(c => c.id === id);

  if (!company) {
    notFound();
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/perusahaan">
              <ArrowLeft size={16} /> Kembali
            </Link>
          </li>
        </ul>
      </nav>

      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>{company.name}</h1>
        <p>Perusahaan teknologi yang berfokus pada pengembangan aplikasi web dan mobile.</p>
      </header>

      <div className="grid">
        <article>
          <header>
            <h4>Informasi Perusahaan</h4>
          </header>
          <ul>
            <li><strong>Booth:</strong> A-12</li>
            <li><strong>Lokasi:</strong> Jakarta, Indonesia</li>
            <li><strong>Telepon:</strong> +62 21 1234 5678</li>
          </ul>
        </article>

        <article>
          <header>
            <h4>Lowongan Tersedia</h4>
          </header>
          <div className="grid">
            {company.jobs.map((job) => (
              <article key={job.id}>
                <header>
                  <h5>{job.title}</h5>
                </header>
                <p>{job.description}</p>
                <footer>
                  <small>Kategori: {job.job_category}</small>
                </footer>
              </article>
            ))}
          </div>
        </article>
      </div>
    </>
  );
} 