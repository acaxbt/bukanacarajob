import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Phone } from 'lucide-react';
import { companies } from "@/lib/data";

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = companies.find(c => c.id === id);

  if (!company) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="md:w-1/3 w-full flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center">{company.name}</h1>
            <Badge variant="secondary" className="mt-2">Teknologi</Badge>
        </div>

        <div className="md:w-2/3 w-full">
          <div className="prose max-w-none">
            <p>Perusahaan teknologi yang berfokus pada pengembangan aplikasi web dan mobile.</p>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-gray-500" />
              <span>Booth: A-12</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>Jakarta, Indonesia</span>
            </div>
             <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>+62 21 1234 5678</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Lowongan Tersedia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {company.jobs.map((job) => (
            <div key={job.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-gray-600 mt-2">Lowongan untuk posisi {job.title.toLowerCase()} di {company.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 