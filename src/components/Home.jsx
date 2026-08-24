import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tools_list } from '../tools/registry'

export default function Home() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const filtered = q
    ? tools_list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q)
      )
    : tools_list

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line dark:border-dark-line">
        <div className="trellis-lattice absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-14">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-dark-ink">
            The dev toolbox that grows with you.
          </h1>
          <p className="mt-3 max-w-xl text-ink-soft dark:text-dark-ink-soft">
            Trellis is an open-source, client-side collection of everyday dev
            utilities. Everything runs in your browser — nothing you paste
            here ever leaves it. Missing a tool? Bolt one on in an afternoon.
          </p>

          <div className="mt-6 max-w-md">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft dark:text-dark-ink-soft" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all tools…"
                className="w-full rounded-lg border border-line bg-paper-raised py-2.5 pl-9 pr-4 text-sm text-ink shadow-sm outline-none ring-pine-500 focus:ring-2 dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-ink-soft dark:text-dark-ink-soft">
            No tools match "{query}" yet — maybe it's your next contribution.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.id}`}
                className="group rounded-lg border border-line bg-paper-raised p-4 transition hover:-translate-y-0.5 hover:border-pine-300 hover:shadow-md dark:border-dark-line dark:bg-dark-surface dark:hover:border-pine-500"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-pine-500/10 text-lg dark:bg-pine-500/15">
                    {tool.icon || '🔧'}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display font-medium text-ink dark:text-dark-ink">
                      {tool.name}
                    </h3>
                    <span className="text-xs text-pine-600 dark:text-pine-300">
                      {tool.category}
                    </span>
                  </div>
                </div>
                {tool.description && (
                  <p className="mt-3 text-sm text-ink-soft dark:text-dark-ink-soft">
                    {tool.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function SearchIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
