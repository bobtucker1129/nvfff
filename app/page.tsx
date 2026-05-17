import dynamic from 'next/dynamic'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

const PublicMap = dynamic(() => import('@/components/PublicMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-stone-200 dark:bg-stone-900 rounded-lg flex items-center justify-center animate-pulse">
      <span className="text-stone-400 text-sm">Loading map...</span>
    </div>
  ),
})

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-stone-950/90 backdrop-blur border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold text-green-700 dark:text-green-500 tracking-tight">
              NVFFF
            </span>
            <span className="hidden sm:block text-stone-500 text-xs tracking-widest uppercase">
              Northern Virginia Fly Fishing Fanatics
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-stone-600 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200"
            >
              Home
            </Link>
            <a
              href="#the-map"
              className="text-stone-600 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200"
            >
              The Map
            </a>
            <Link
              href="/login"
              className="bg-green-700 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-green-900/20"
            >
              Join the Fanatics
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Nature-inspired gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-[#f5f3ef] to-amber-50 dark:from-stone-950 dark:via-stone-950 dark:to-stone-900 transition-colors duration-300" aria-hidden="true" />
        
        {/* Subtle water texture */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div>
              <p className="text-green-700 dark:text-green-500 text-sm font-medium tracking-[0.2em] uppercase mb-6">
                Est. Northern Virginia
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 dark:text-stone-100 leading-[1.05] mb-8">
                Cold Water.<br />
                <span className="text-amber-600 dark:text-amber-500 italic">Cold Beer.</span><br />
                Good Company.
              </h1>
              <p className="text-stone-600 dark:text-stone-400 text-lg sm:text-xl mb-12 leading-relaxed max-w-lg">
                Northern Virginia&apos;s fly fishing collective. We log catches, share spots, and argue about flies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-green-900/30 text-center"
                >
                  Join the Fanatics
                </Link>
                <a
                  href="#the-map"
                  className="inline-block border border-stone-300 dark:border-stone-600 hover:border-green-600 text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 font-semibold px-8 py-3.5 rounded transition-all duration-200 hover:bg-stone-100 dark:hover:bg-stone-900/50 text-center"
                >
                  See the Map
                </a>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-green-100 to-amber-100 dark:from-green-900/20 dark:to-amber-900/20 border border-stone-200 dark:border-stone-700 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎣</div>
                  <p className="text-stone-500 dark:text-stone-400 text-sm">Trout photo coming soon</p>
                  <p className="text-stone-400 dark:text-stone-500 text-xs mt-2">Add your catch photos to see them here</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-200 dark:bg-green-800/30 rounded-full blur-2xl" aria-hidden="true" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-amber-200 dark:bg-amber-800/20 rounded-full blur-3xl" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-amber-600 dark:text-amber-500">47</div>
              <div className="text-stone-500 text-xs uppercase tracking-wider mt-1">Members</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-green-700 dark:text-green-500">128</div>
              <div className="text-stone-500 text-xs uppercase tracking-wider mt-1">Catches Logged</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-stone-700 dark:text-stone-300">12</div>
              <div className="text-stone-500 text-xs uppercase tracking-wider mt-1">Rivers Mapped</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-28 bg-white dark:bg-stone-950 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pl-10">
            <span className="absolute left-0 top-0 text-green-600/40 dark:text-green-700/60 text-6xl font-serif leading-none select-none" aria-hidden="true">
              &ldquo;
            </span>
            <p className="text-stone-700 dark:text-stone-300 text-xl sm:text-2xl leading-relaxed italic font-serif">
              We are the Northern Virginia Fly Fishing Fanatics. A loose crew of
              people who love cold water, dry flies, and cold beer — not
              necessarily in that order. We fish because it does something for
              the soul that nothing else can. We take care of the rivers because
              we want them here when we bring our kids back. No gatekeeping, no
              gear snobbery, no lectures. Just good water, good company, and
              whatever&apos;s on tap after.
            </p>
            <p className="text-green-700 dark:text-green-500 font-bold mt-6 text-lg tracking-wide">
              NVFFF.
            </p>
          </div>
        </div>
      </section>

      {/* ── PUBLIC MAP ── */}
      <section id="the-map" className="py-28 bg-stone-100 dark:bg-stone-900/30 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Where We&apos;ve Been
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg">
              Public catches from the NVFFF crew
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 shadow-2xl h-[480px]">
            <PublicMap />
          </div>
          <p className="mt-4 text-stone-500 text-sm text-center">
            Members can log private spots — only public catches show here.
          </p>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="py-28 bg-white dark:bg-stone-950 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Ready to wade in?
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-lg mb-8">
            Log your catches, save your honey holes, and join the crew.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-10 py-3.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-green-900/30 text-lg"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-stone-200 dark:border-stone-800 py-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 text-center text-stone-500 text-sm">
          NVFFF &copy; 2026 | Northern Virginia Fly Fishing Fanatics | Tight lines.
        </div>
      </footer>
    </div>
  )
}
