import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sistem Event</h1>
      <p>Silakan pilih peran Anda:</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <Link href="/admin" role="button" className="secondary">
          Masuk sebagai Admin
        </Link>
        <Link href="/login" role="button">
          Masuk sebagai Pelamar
        </Link>
      </div>
    </div>
  );
}
