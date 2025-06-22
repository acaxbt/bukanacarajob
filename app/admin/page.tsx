import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { companies } from "@/lib/data";

export default async function AdminPage() {
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
                    return (
                    <Link href={`/admin/dashboard?companyId=${company.id}`} key={company.id}>
                        <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4">
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