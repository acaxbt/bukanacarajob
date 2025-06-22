import Link from "next/link";
import { companies, Company } from "@/lib/data";

export default function PerusahaanPage() {
    return (
        <>
            <h1>Daftar Perusahaan</h1>
            <p>Telusuri perusahaan yang sedang membuka lowongan.</p>
            
            <div className="grid">
                {companies.map((company: Company) => (
                    <article key={company.id}>
                        <header>
                            <h4>{company.name}</h4>
                        </header>
                        <footer>
                            <Link href={`/perusahaan/${company.id}`} role="button" className="outline">
                                Lihat Lowongan
                            </Link>
                        </footer>
                    </article>
                ))}
            </div>
        </>
    )
} 