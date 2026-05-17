import Link from 'next/link'

// Stub layout — auth check will be added once Supabase is wired
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Top bar */}
      <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-green-500 hover:text-green-400 transition-colors"
          >
            NVFFF
          </Link>
          <div className="flex items-center gap-3">
            {/* User avatar placeholder */}
            <div
              className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-sm font-bold"
              title="User avatar"
            >
              ?
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-stone-900/60 border-r border-stone-800 shrink-0 hidden md:block">
          <nav className="p-4 space-y-1">
            <p className="text-stone-500 text-xs uppercase tracking-widest font-medium px-3 pb-2 pt-2">
              My Stuff
            </p>
            <Link
              href="/gear"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors text-sm font-medium"
            >
              <span>My Gear</span>
            </Link>
            <Link
              href="/honey-holes"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors text-sm font-medium"
            >
              <span>Honey Holes</span>
            </Link>
          </nav>
        </aside>

        {/* Mobile nav strip */}
        <div className="md:hidden w-full border-b border-stone-800 bg-stone-900/60">
          <nav className="flex gap-4 px-4 py-2">
            <Link
              href="/gear"
              className="text-stone-300 hover:text-green-400 text-sm font-medium py-1"
            >
              My Gear
            </Link>
            <Link
              href="/honey-holes"
              className="text-stone-300 hover:text-green-400 text-sm font-medium py-1"
            >
              Honey Holes
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
