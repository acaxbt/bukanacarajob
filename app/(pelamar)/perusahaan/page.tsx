import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { companies } from "@/lib/data";

export default async function CompanyListPage() {
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
                <CardTitle className="text-center">{company.name}</CardTitle>
                <CardDescription className="text-center">
                  {company.jobs.length} lowongan tersedia
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-center">
                <Badge variant="secondary">Teknologi</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 