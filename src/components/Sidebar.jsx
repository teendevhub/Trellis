import { NavLink } from 'react-router-dom'
import { getToolsByCategory } from '../tools/registry'

export default function Sidebar({ search, onSearchChange, onNavigate }) {
  const groups = getToolsByCategory()
  const query = search.trim().toLowerCase()

  const filteredGroups = Object.entries(groups)
    .map(([category, tools]) => [
      category,
      query
        ? tools.filter(
            (t) =>
              t.name.toLowerCase().includes(query) ||
              t.description?.toLowerCase().includes(query)
          )
        : tools,
    ])
    .filter(([, tools]) => tools.length > 0)

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-line bg-paper dark:border-dark-line dark:bg-dark-bg">
      <div className="p-4">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-soft dark:text-dark-ink-soft" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tools…"
            className="w-full rounded-md border border-line bg-paper-raised py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink-soft/70 outline-none ring-pine-500 focus:ring-2 dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink dark:placeholder:text-dark-ink-soft/70"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {filteredGroups.length === 0 && (
          <p className="px-2 py-4 text-sm text-ink-soft dark:text-dark-ink-soft">
            No tools match "{search}".
          </p>
        )}

        {filteredGroups.map(([category, tools]) => (
          <div key={category} className="mb-4">
            <h3 className="px-2 pb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-dark-ink-soft">
              {category}
            </h3>
            <ul className="space-y-0.5">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <NavLink
                    to={`/tools/${tool.id}`}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition ${
                        isActive
                          ? 'bg-pine-500/10 font-medium text-pine-700 dark:bg-pine-500/15 dark:text-pine-300'
                          : 'text-ink-soft hover:bg-pine-500/5 hover:text-ink dark:text-dark-ink-soft dark:hover:bg-white/5 dark:hover:text-dark-ink'
                      }`
                    }
                  >
                    <span aria-hidden className="text-base leading-none">
                      {tool.icon || '🔧'}
                    </span>
                    {tool.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

function SearchIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
