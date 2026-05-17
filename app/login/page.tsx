'use client'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Mini nav */}
      <header className="border-b border-stone-800 px-4 py-4">
        <Link
          href="/"
          className="font-serif text-xl font-bold text-green-500 hover:text-green-400 transition-colors"
        >
          NVFFF
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-stone-900 border border-stone-700 rounded-xl p-8 shadow-2xl">
            <h1 className="font-serif text-3xl font-bold text-stone-100 mb-1">
              Sign In
            </h1>
            <p className="text-stone-400 text-sm mb-8">
              Welcome back to the crew.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-300 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-300 mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-stone-800 border border-stone-600 rounded-lg px-4 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled
                className="w-full bg-stone-700 text-stone-400 font-semibold py-3 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                title="Supabase not yet configured"
              >
                <span>Sign In</span>
                <span className="text-xs font-normal text-stone-500">
                  — Coming soon (Supabase setup required)
                </span>
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-green-500 hover:text-green-400 font-medium transition-colors"
              >
                Join the Fanatics
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-800 py-6 text-center text-stone-600 text-xs">
        NVFFF &copy; 2026 | Tight lines.
      </footer>
    </div>
  )
}
