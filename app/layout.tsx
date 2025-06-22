import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

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
    <html lang="en">
      <head>
        <style>{`
          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }
          
          html,
          body {
            max-width: 100vw;
            overflow-x: hidden;
            font-family: ${GeistSans.style.fontFamily}, system-ui, sans-serif;
          }
          
          body {
            color: rgb(var(--foreground-rgb));
            background: linear-gradient(
                to bottom,
                transparent,
                rgb(var(--background-end-rgb))
              )
              rgb(var(--background-start-rgb));
          }
          
          a {
            color: inherit;
            text-decoration: none;
          }
          
          @media (prefers-color-scheme: dark) {
            html {
              color-scheme: dark;
            }
          }
        `}</style>
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
