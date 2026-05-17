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
      <body className="bg-stone-950 text-stone-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
