import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Phone } from 'lucide-react';

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: company, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !company) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="md:w-1/3 w-full flex flex-col items-center">
            <div className="relative h-48 w-48 mb-4">
            <Image
                src={company.logo_url || '/placeholder.svg'}
                alt={`${company.name} logo`}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
            />
            </div>
            <h1 className="text-3xl font-bold text-center">{company.name}</h1>
            <Badge variant="secondary" className="mt-2">{company.sector || 'Umum'}</Badge>
        </div>

        <div className="md:w-2/3 w-full">
          <div className="prose max-w-none">
            <p>{company.description || 'Tidak ada deskripsi.'}</p>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-gray-500" />
              <span>Booth: {company.booth_location || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>{company.address || 'Alamat tidak tersedia.'}</span>
            </div>
             <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>{company.contact || 'Kontak tidak tersedia.'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Galeri</h2>
        {company.gallery_urls && company.gallery_urls.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {company.gallery_urls.map((url: string, index: number) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt={`Galeri ${company.name} ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Tidak ada gambar di galeri.</p>
        )}
      </div>
    </div>
  );
} 