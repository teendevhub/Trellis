import { useState } from 'react'
import ToolPage from '../../components/ToolPage'
import CopyButton from '../../components/CopyButton'
import meta from './meta'

function generateUuidV4() {
  // Prefer the native, cryptographically strong generator when available.
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older browsers without crypto.randomUUID.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState(() => Array.from({ length: 5 }, generateUuidV4))
  const [uppercase, setUppercase] = useState(false)

  function regenerate(n = count) {
    setUuids(Array.from({ length: n }, generateUuidV4))
  }

  const displayList = uuids.map((id) => (uppercase ? id.toUpperCase() : id))

  return (
    <ToolPage name={meta.name} description={meta.description}>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="uuid-count" className="mb-1.5 block text-sm font-medium text-ink dark:text-dark-ink">
            How many
          </label>
          <input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value) || 1)))}
            className="w-24 rounded-md border border-line bg-paper-raised px-2.5 py-1.5 text-sm text-ink outline-none ring-pine-500 focus:ring-2 dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink"
          />
        </div>

        <label className="mb-2 flex items-center gap-2 text-sm text-ink dark:text-dark-ink">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="h-4 w-4 rounded border-line accent-pine-600"
          />
          Uppercase
        </label>

        <button
          type="button"
          onClick={() => regenerate(count)}
          className="mb-0.5 inline-flex items-center gap-1.5 rounded-md bg-pine-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-pine-700"
        >
          <RefreshIcon /> Generate
        </button>

        <CopyButton
          className="mb-0.5"
          getText={() => displayList.join('\n')}
          label="Copy all"
        />
      </div>

      <ul className="divide-y divide-line overflow-hidden rounded-md border border-line bg-paper-raised dark:divide-dark-line dark:border-dark-line dark:bg-dark-surface">
        {displayList.map((id, i) => (
          <li key={i} className="flex items-center justify-between gap-3 px-3 py-2">
            <code className="truncate font-mono text-sm text-ink dark:text-dark-ink">{id}</code>
            <CopyButton getText={() => id} label="" className="shrink-0 px-2" />
          </li>
        ))}
      </ul>
    </ToolPage>
  )
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.3 6.4L3 16M3 21v-5h5" />
    </svg>
  )
}
