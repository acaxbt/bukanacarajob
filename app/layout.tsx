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
            color: #171717;
            background: #ffffff;
          }
          
          a {
            color: inherit;
            text-decoration: none;
          }
          
          /* Dark theme styles */
          @media (prefers-color-scheme: dark) {
            html {
              color-scheme: dark;
            }
            body {
              color: #ffffff !important;
              background: #0a0a0a !important;
            }
            
            /* Ensure all text elements are visible in dark mode */
            h1, h2, h3, h4, h5, h6, p, span, div, label, input, textarea, select {
              color: #ffffff !important;
            }
            
            /* Card backgrounds in dark mode */
            .card, [data-card] {
              background-color: #1a1a1a !important;
              border-color: #333333 !important;
              color: #ffffff !important;
            }
            
            /* Input fields in dark mode */
            input, textarea, select {
              background-color: #1a1a1a !important;
              border-color: #333333 !important;
              color: #ffffff !important;
            }
            
            /* Button text in dark mode */
            button {
              color: #ffffff !important;
            }
            
            /* Links in dark mode */
            a {
              color: #60a5fa !important;
            }
            
            a:hover {
              color: #93c5fd !important;
            }
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
