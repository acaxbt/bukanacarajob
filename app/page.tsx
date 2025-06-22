import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem',
      gap: '1rem'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: 'inherit'
      }}>
        Sistem Event
      </h1>
      <p style={{ 
        marginBottom: '2rem',
        color: 'inherit'
      }}>
        Silakan pilih peran Anda:
      </p>
      <div style={{
        display: 'flex',
        gap: '1rem'
      }}>
        <Link href="/admin" style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}>
          Masuk sebagai Admin
        </Link>
        <Link href="/login" style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#10b981',
          color: '#ffffff',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}>
          Masuk sebagai Pelamar
        </Link>
      </div>
    </main>
  );
}
