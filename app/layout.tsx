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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-stone-950 text-stone-100 min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
