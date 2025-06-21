import Link from "next/link";

export default function PelamarHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-4xl font-bold">Selamat Datang Pelamar</h1>
      <div className="flex gap-4">
        <Link href="/admin" className="p-2 bg-gray-200 rounded">
          Ke Halaman Admin (untuk testing)
        </Link>
      </div>
    </main>
  );
} 