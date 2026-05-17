import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
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
            <Link href="/" className="text-stone-600 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200">
              Home
            </Link>
            <a href="#the-map" className="text-stone-600 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200">
              The Map
            </a>
            <Link href="/login" className="bg-green-700 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-green-900/20">
              Join the Fanatics
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/optimized/AdobeStock_221837860-1920.jpg"
            alt="Autumn sunrise on a river"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 dark:from-stone-950/95 dark:via-stone-950/80 dark:to-stone-950/40 transition-colors duration-300" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <p className="text-green-700 dark:text-green-500 text-sm font-medium tracking-[0.2em] uppercase mb-6">
              Est. Northern Virginia
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 dark:text-stone-100 leading-[1.05] mb-8">
              Cold Water.<br />
              <span className="text-amber-600 dark:text-amber-500 italic">Cold Beer.</span><br />
              Good Company.
            </h1>
            <p className="text-stone-700 dark:text-stone-300 text-lg sm:text-xl mb-12 leading-relaxed max-w-lg">
              Northern Virginia&apos;s fly fishing collective. We log catches, share spots, and argue about flies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-green-900/30 text-center">
                Join the Fanatics
              </Link>
              <a href="#the-map" className="inline-block bg-white/80 dark:bg-stone-800/80 backdrop-blur border border-stone-300 dark:border-stone-600 hover:border-green-600 text-stone-800 dark:text-stone-200 hover:text-green-700 dark:hover:text-green-400 font-semibold px-8 py-3.5 rounded transition-all duration-200 text-center">
                See the Map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/50 backdrop-blur transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-amber-600 dark:text-amber-500">47</div>
              <div className="text-stone-500 text-xs uppercase tracking-wider mt-2">Members</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-green-700 dark:text-green-500">128</div>
              <div className="text-stone-500 text-xs uppercase tracking-wider mt-2">Catches Logged</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-stone-700 dark:text-stone-300">12</div>
              <div className="text-stone-500 text-xs uppercase tracking-wider mt-2">Rivers Mapped</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED CATCH ── */}
      <section className="py-20 bg-white dark:bg-stone-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/optimized/AdobeStock_247260614-1200.jpg"
                alt="Rainbow trout caught on a mountain river"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-green-700 dark:text-green-500 text-sm font-medium tracking-[0.2em] uppercase mb-4">Featured Catch</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                Winter Rainbow on the Thornton
              </h2>
              <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed mb-6">
                Beautiful 16-inch rainbow caught on a size 18 Adams during a late February hatch. 
                Water temp was 42°F and the fish took aggressively on the third drift.
              </p>
              <div className="flex items-center gap-4 text-sm text-stone-500">
                <span>Caught by: Mike R.</span>
                <span>•</span>
                <span>Feb 14, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-28 relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/optimized/AdobeStock_110154202-1920.jpg"
            alt="Fly fisherman in river"
            fill
            className="object-cover opacity-10 dark:opacity-5"
          />
          <div className="absolute inset-0 bg-[#f5f3ef] dark:bg-stone-950 transition-colors duration-300" />
        </div>
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-20 bg-white dark:bg-stone-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              From the Water
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg">
              Moments from our crew
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square relative rounded-xl overflow-hidden">
              <Image src="/images/optimized/AdobeStock_276261522-800.jpg" alt="Fly fishing scene" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square relative rounded-xl overflow-hidden">
              <Image src="/images/optimized/AdobeStock_370869805-800.jpg" alt="Salmon fishing" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square relative rounded-xl overflow-hidden">
              <Image src="/images/optimized/AdobeStock_372181001-800.jpg" alt="Trout fishing" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square relative rounded-xl overflow-hidden">
              <Image src="/images/optimized/AdobeStock_614780292-800.jpg" alt="Fishing scene" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/optimized/AdobeStock_963552908-1920.jpg"
            alt="Fly fishing background"
            fill
            className="object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f3ef] via-[#f5f3ef]/90 to-[#f5f3ef] dark:from-stone-950 dark:via-stone-950/90 dark:to-stone-950 transition-colors duration-300" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Ready to wade in?
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-lg mb-8">
            Log your catches, save your honey holes, and join the crew.
          </p>
          <Link href="/signup" className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-10 py-3.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-green-900/30 text-lg">
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
