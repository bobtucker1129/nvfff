'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const name = user.user_metadata?.name || user.email || ''
        setUserName(name)
      }
    })
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const initial = userName ? userName.charAt(0).toUpperCase() : '?'

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      {/* Top bar */}
      <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-green-500 hover:text-green-400 transition-colors">
            <span className="text-xl sm:hidden">NVFFF</span>
            <span className="hidden sm:block text-lg">Northern Virginia Fly Fishing Fanatics</span>
          </Link>

          {/* Avatar + dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="w-8 h-8 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center text-white text-sm font-bold transition-colors"
              title={userName || 'Account'}
            >
              {initial}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-10 w-48 bg-stone-900 border border-stone-700 rounded-lg shadow-xl py-1 z-50">
                {userName && (
                  <div className="px-4 py-2 border-b border-stone-700">
                    <p className="text-stone-300 text-sm font-medium truncate">{userName}</p>
                    <p className="text-stone-500 text-xs">Member</p>
                  </div>
                )}
                <button
                  onClick={signOut}
                  className="w-full text-left px-4 py-2 text-sm text-stone-300 hover:text-red-400 hover:bg-stone-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile tab nav */}
      <nav className="md:hidden bg-stone-900/80 border-b border-stone-800 flex">
        <Link href="/" className="px-4 py-3 text-sm font-medium text-stone-400 hover:text-green-400 hover:bg-stone-800 transition-colors border-r border-stone-800">
          ← Home
        </Link>
        <Link href="/gear" className="flex-1 text-center py-3 text-sm font-medium text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors">
          🎣 My Gear
        </Link>
        <Link href="/honey-holes" className="flex-1 text-center py-3 text-sm font-medium text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors border-l border-stone-800">
          📍 Honey Holes
        </Link>
      </nav>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="w-56 bg-stone-900/60 border-r border-stone-800 shrink-0 hidden md:flex md:flex-col">
          <nav className="p-4 space-y-1 pt-6 flex-1">
            <p className="text-stone-500 text-xs uppercase tracking-widest font-medium px-3 pb-3">My Stuff</p>
            <Link href="/gear" className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors text-sm font-medium">
              My Gear
            </Link>
            <Link href="/honey-holes" className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-300 hover:text-green-400 hover:bg-stone-800 transition-colors text-sm font-medium">
              Honey Holes
            </Link>
          </nav>
          <div className="p-4 border-t border-stone-800">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-stone-500 hover:text-green-400 hover:bg-stone-800 transition-colors text-sm">
              ← Home
            </Link>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
