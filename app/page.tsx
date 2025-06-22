import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-4xl font-bold">Sistem Event</h1>
      <p>Silakan pilih peran Anda:</p>
      <div className="flex gap-4">
        <Link href="/admin" className="p-2 bg-blue-500 text-white rounded">
          Masuk sebagai Admin
        </Link>
        <Link href="/login" className="p-2 bg-green-500 text-white rounded">
          Masuk sebagai Pelamar
        </Link>
      </div>
    </main>
  );
}
