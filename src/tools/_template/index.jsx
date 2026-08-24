// index.jsx — your tool's React component.
//
// Rules of a Trellis tool:
//   1. It's self-contained: your own `useState`, no reading or writing
//      global state, no importing from other tools.
//   2. It renders its own full page — use the shared <ToolPage> wrapper
//      below for a consistent title/description header, or build your
//      own layout if your tool needs something different (e.g. a
//      full-bleed canvas).
//   3. It can import anything from `src/components/` (shared UI, like
//      <CopyButton>) and any npm package you've added to package.json.
//
// Delete these comments once you've read them — they're here to help,
// not to ship.

import { useState } from 'react'
import ToolPage from '../../components/ToolPage'
import CopyButton from '../../components/CopyButton'
import meta from './meta'

export default function MyNewTool() {
  const [input, setInput] = useState('')

  return (
    <ToolPage name={meta.name} description={meta.description}>
      <div>
        <label
          htmlFor="my-new-tool-input"
          className="mb-1.5 block text-sm font-medium text-ink dark:text-dark-ink"
        >
          Input
        </label>
        <textarea
          id="my-new-tool-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder="Type or paste something…"
          className="w-full rounded-md border border-line bg-paper-raised p-3 font-mono text-sm text-ink outline-none ring-pine-500 focus:ring-2 dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink"
        />
      </div>

      <div className="flex items-center gap-2">
        <CopyButton getText={() => input} label="Copy input" />
      </div>

      {/* Replace everything above with your tool's real UI and logic. */}
    </ToolPage>
  )
}
