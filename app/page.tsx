import dynamic from 'next/dynamic'
import Link from 'next/link'

const PublicMap = dynamic(() => import('@/components/PublicMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-stone-900 rounded-lg flex items-center justify-center">
      <span className="text-stone-400 text-sm">Loading map...</span>
    </div>
  ),
})

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold text-green-500 tracking-tight">
              NVFFF
            </span>
            <span className="hidden sm:block text-stone-500 text-xs tracking-widest uppercase">
              Northern Virginia Fly Fishing Fanatics
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-stone-300 hover:text-green-400 transition-colors"
            >
              Home
            </Link>
            <a
              href="#the-map"
              className="text-stone-300 hover:text-green-400 transition-colors"
            >
              The Map
            </a>
            <Link
              href="/login"
              className="bg-green-700 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
            >
              Join the Fanatics
            </Link>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Woodsy gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-stone-950 via-green-950/40 to-stone-900"
          aria-hidden="true"
        />
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-44">
          <div className="max-w-3xl">
            <p className="text-green-500 text-sm font-medium tracking-widest uppercase mb-4">
              Est. Northern Virginia
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-100 leading-tight mb-6">
              Cold Water.{' '}
              <span className="text-amber-500">Cold Beer.</span>{' '}
              Good Company.
            </h1>
            <p className="text-stone-400 text-lg sm:text-xl mb-10 leading-relaxed">
              NVFFF — Northern Virginia's fly fishing collective
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded transition-colors text-center"
              >
                Join the Fanatics
              </Link>
              <a
                href="#the-map"
                className="inline-block border border-stone-600 hover:border-green-600 text-stone-300 hover:text-green-400 font-semibold px-8 py-3 rounded transition-colors text-center"
              >
                See the Map
              </a>
            </div>
          </div>
        </div>
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-950 to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 bg-stone-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-green-700 pl-6">
            <p className="text-stone-300 text-lg sm:text-xl leading-relaxed italic">
              We are the Northern Virginia Fly Fishing Fanatics. A loose crew of
              people who love cold water, dry flies, and cold beer — not
              necessarily in that order. We fish because it does something for
              the soul that nothing else can. We take care of the rivers because
              we want them here when we bring our kids back. No gatekeeping, no
              gear snobbery, no lectures. Just good water, good company, and
              whatever's on tap after.{' '}
              <span className="text-green-500 not-italic font-bold">
                NVFFF.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── PUBLIC MAP ── */}
      <section id="the-map" className="py-20 bg-stone-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 mb-2">
              Where We've Been
            </h2>
            <p className="text-stone-400 text-lg">
              Public catches from the NVFFF crew
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border border-stone-700 shadow-2xl h-[480px]">
            <PublicMap />
          </div>
          <p className="mt-4 text-stone-500 text-sm text-center">
            Members can log private spots — only public catches show here.
          </p>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="py-24 bg-stone-950">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 mb-4">
            Ready to wade in?
          </h2>
          <p className="text-stone-400 text-lg mb-8">
            Log your catches, save your honey holes, and join the crew.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-10 py-3 rounded transition-colors text-lg"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-stone-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-stone-500 text-sm">
          NVFFF &copy; 2026 | Northern Virginia Fly Fishing Fanatics | Tight lines.
        </div>
      </footer>
    </div>
  )
}
