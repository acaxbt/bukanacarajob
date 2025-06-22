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
            color: #171717;
            background: #ffffff;
          }
          
          a {
            color: inherit;
            text-decoration: none;
          }
          
          @media (prefers-color-scheme: dark) {
            html {
              color-scheme: dark;
            }
            body {
              color: #ededed;
              background: #0a0a0a;
            }
          }
        `}</style>
      </head>
      <body style={{
        fontFamily: `${GeistSans.style.fontFamily}, system-ui, sans-serif`,
        fontFeatureSettings: GeistSans.style.fontFeatureSettings,
        fontVariationSettings: GeistSans.style.fontVariationSettings,
      }}>
        {children}
      </body>
    </html>
  );
}
