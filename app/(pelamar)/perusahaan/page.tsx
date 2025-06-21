import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function CompaniesPage() {
  const supabase = createClient();
  const { data: companies, error } = await supabase
    .from("companies")
    .select(`id, name, logo_url, booth_location, sector`);

  if (error) {
    console.error("Error fetching companies:", error);
    return <p className="text-center text-red-500">Gagal memuat data perusahaan.</p>;
  }

  if (!companies || companies.length === 0) {
    return <p className="text-center">Belum ada perusahaan yang terdaftar.</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Daftar Perusahaan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {companies.map((company) => (
          <Link href={`/perusahaan/${company.id}`} key={company.id} className="block hover:shadow-lg transition-shadow duration-200 rounded-lg">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="relative h-24 w-24 mx-auto mb-4">
                  <Image
                    src={company.logo_url || '/placeholder.svg'}
                    alt={`${company.name} logo`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-full"
                  />
                </div>
                <CardTitle className="text-center">{company.name}</CardTitle>
                <CardDescription className="text-center">
                  Booth: {company.booth_location || 'N/A'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-center">
                <Badge variant="secondary">{company.sector || 'Umum'}</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 