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
            
            /* Input fields in dark mode - very specific */
            input, textarea, select {
              background-color: #1a1a1a !important;
              border-color: #333333 !important;
              color: #ffffff !important;
            }
            
            /* Force input text color in dark mode */
            input[type="text"], 
            input[type="email"], 
            input[type="password"], 
            input[type="number"], 
            input[type="tel"], 
            input[type="url"], 
            input[type="search"], 
            input[type="date"], 
            input[type="time"], 
            input[type="datetime-local"], 
            input[type="month"], 
            input[type="week"], 
            textarea, 
            select {
              background-color: #1a1a1a !important;
              border-color: #333333 !important;
              color: #ffffff !important;
            }
            
            /* Even more specific selectors for input text */
            body input,
            body textarea,
            body select,
            div input,
            div textarea,
            div select,
            form input,
            form textarea,
            form select {
              background-color: #1a1a1a !important;
              border-color: #333333 !important;
              color: #ffffff !important;
            }
            
            /* Force text color with maximum specificity */
            html body input,
            html body textarea,
            html body select {
              color: #ffffff !important;
              background-color: #1a1a1a !important;
              border-color: #333333 !important;
            }
            
            /* Input placeholder text in dark mode */
            input::placeholder, textarea::placeholder {
              color: #9ca3af !important;
              opacity: 1 !important;
            }
            
            /* Input focus state in dark mode */
            input:focus, textarea:focus, select:focus {
              background-color: #1a1a1a !important;
              border-color: #60a5fa !important;
              color: #ffffff !important;
              outline: none !important;
              box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2) !important;
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
            
            /* Small text and descriptions in dark mode */
            small, .text-muted {
              color: #9ca3af !important;
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
