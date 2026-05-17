import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Top bar */}
      <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-green-500 hover:text-green-400 transition-colors">
            <span className="text-xl sm:hidden">NVFFF</span>
            <span className="hidden sm:block text-lg">Northern Virginia Fly Fishing Fanatics</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-sm font-bold" title="Account">
            ?
          </div>
        </div>
      </header>

      {/* Mobile tab nav — sits below header, full width */}
      <nav className="md:hidden bg-stone-900/80 border-b border-stone-800 flex">
        <Link href="/gear" className="flex-1 text-center py-3 text-sm font-medium text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors">
          🎣 My Gear
        </Link>
        <Link href="/honey-holes" className="flex-1 text-center py-3 text-sm font-medium text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors border-l border-stone-800">
          📍 Honey Holes
        </Link>
      </nav>

      {/* Desktop: sidebar + content side by side */}
      <div className="flex flex-1">
        <aside className="w-56 bg-stone-900/60 border-r border-stone-800 shrink-0 hidden md:block">
          <nav className="p-4 space-y-1 pt-6">
            <p className="text-stone-500 text-xs uppercase tracking-widest font-medium px-3 pb-3">My Stuff</p>
            <Link href="/gear" className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors text-sm font-medium">
              My Gear
            </Link>
            <Link href="/honey-holes" className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors text-sm font-medium">
              Honey Holes
            </Link>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
