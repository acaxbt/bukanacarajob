import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Sistem Event",
  description: "Sistem Event Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
        <style>{`
          :root {
            --font-sans: ${GeistSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          }
          body {
            font-family: var(--font-sans);
          }
          main.container {
            padding: 2rem;
          }
        `}</style>
      </head>
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
