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
    <html lang="en">
      <head>
        <style>{`
          :root {
            --background: #ffffff;
            --foreground: #171717;
            --card: #ffffff;
            --card-foreground: #171717;
            --card-border: #e5e5e5;
            --input-background: #ffffff;
            --input-border: #e5e5e5;
            --input-foreground: #171717;
            --primary: #171717;
            --primary-foreground: #fafafa;
            --secondary: #f5f5f5;
            --secondary-foreground: #171717;
            --muted-foreground: #737373;
            --destructive: #ef4444;
            --ring: #60a5fa;
            --link: #3b82f6;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --background: #0a0a0a;
              --foreground: #f5f5f5;
              --card: #1a1a1a;
              --card-foreground: #f5f5f5;
              --card-border: #262626;
              --input-background: #262626;
              --input-border: #404040;
              --input-foreground: #f5f5f5;
              --primary: #fafafa;
              --primary-foreground: #171717;
              --secondary: #262626;
              --secondary-foreground: #fafafa;
              --muted-foreground: #a3a3a3;
              --destructive: #b91c1c;
              --ring: #60a5fa;
              --link: #60a5fa;
            }
          }
        
          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            border-color: var(--card-border);
          }
          
          html,
          body {
            max-width: 100vw;
            overflow-x: hidden;
            font-family: ${GeistSans.style.fontFamily}, system-ui, sans-serif;
          }
          
          body {
            color: var(--foreground);
            background: var(--background);
          }

          h1, h2, h3, h4, h5, h6, p, span, div, label, small {
            color: inherit;
          }
          
          a {
            color: var(--link);
            text-decoration: none;
            transition: color 0.2s;
          }

          a:hover {
            opacity: 0.8;
          }
        `}</style>
      </head>
      <body style={{
        fontFamily: `${GeistSans.style.fontFamily}, system-ui, sans-serif`
      }}>
        {children}
      </body>
    </html>
  );
}
