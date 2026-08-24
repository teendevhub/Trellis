import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useDarkMode } from '../lib/useDarkMode'

export default function Layout() {
  const [search, setSearch] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isDark, setIsDark] = useDarkMode()

  return (
    <div className="flex h-screen flex-col bg-paper dark:bg-dark-bg">
      <header className="relative shrink-0 border-b border-line dark:border-dark-line">
        <div className="trellis-lattice absolute inset-0" aria-hidden />
        <div className="relative flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="mr-1 rounded-md p-1.5 text-ink hover:bg-pine-500/10 md:hidden dark:text-dark-ink dark:hover:bg-white/10"
              aria-label="Toggle tool list"
            >
              <MenuIcon />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-pine-600 text-paper-raised">
                <LatticeMark />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-ink dark:text-dark-ink">
                Trellis
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsDark((v) => !v)}
            className="rounded-md p-2 text-ink-soft transition hover:bg-pine-500/10 hover:text-ink dark:text-dark-ink-soft dark:hover:bg-white/10 dark:hover:text-dark-ink"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <Sidebar search={search} onSearchChange={setSearch} />
        </div>

        {/* Mobile sidebar (drawer) */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden
            />
            <div className="absolute inset-y-0 left-0">
              <Sidebar
                search={search}
                onSearchChange={setSearch}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function LatticeMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20 20 4M4 4l16 16" />
      <rect x="2" y="2" width="20" height="20" rx="3" strokeOpacity="0" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  )
}
