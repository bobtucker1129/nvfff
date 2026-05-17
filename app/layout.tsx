import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NVFFF | Northern Virginia Fly Fishing Fanatics',
  description:
    'Northern Virginia\'s fly fishing collective. Cold water, dry flies, and cold beer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const saved = localStorage.getItem('nvfff-theme');
              if (saved === 'light') {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
              }
            })();
          `
        }} />
      </head>
      <body className="bg-[#f5f3ef] dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen antialiased font-sans transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
