import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminCompanyListPage() {
  const supabase = createClient();

  const { data: companies, error } = await supabase
    .from('companies')
    .select('id, name, logo_url');

  if (error) {
    console.error("Error fetching companies:", error);
    return <p className="text-center text-red-500">Gagal memuat data perusahaan.</p>;
  }

  if (!companies || companies.length === 0) {
    return <p className="text-center">Belum ada perusahaan yang terdaftar.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-2xl">
            <div className="flex justify-center items-center mb-6">
                <h1 className="text-2xl font-bold">Pilih Perusahaan untuk Dikelola</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.map((company) => {
                    if (!company) return null;
                    return (
                    <Link href={`/admin/dashboard?companyId=${company.id}`} key={company.id}>
                        <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={company.logo_url || '/placeholder.svg'} alt="logo" className="h-10 w-10 rounded-full object-contain" />
                            <span>{company.name}</span>
                            </CardTitle>
                        </CardHeader>
                        </Card>
                    </Link>
                    );
                })}
            </div>
        </div>
    </div>
  );
} 