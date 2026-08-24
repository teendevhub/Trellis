import { useMemo, useState } from 'react'
import ToolPage from '../../components/ToolPage'
import CopyButton from '../../components/CopyButton'
import meta from './meta'

const SAMPLE = '{\n  "name": "Trellis",\n  "tagline": "The dev toolbox that grows with you",\n  "openSource": true\n}'

/** Parses the `position N` out of a native JSON.parse SyntaxError message. */
function findErrorPosition(message) {
  const match = message.match(/position (\d+)/)
  return match ? Number(match[1]) : null
}

/** Converts a character offset into 1-indexed { line, column }. */
function offsetToLineColumn(text, offset) {
  const upTo = text.slice(0, offset)
  const lines = upTo.split('\n')
  return { line: lines.length, column: lines[lines.length - 1].length + 1 }
}

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE)
  const [indent, setIndent] = useState(2)

  const result = useMemo(() => {
    if (!input.trim()) return { formatted: '', error: null }
    try {
      const parsed = JSON.parse(input)
      return { formatted: JSON.stringify(parsed, null, indent), error: null }
    } catch (err) {
      const offset = findErrorPosition(err.message)
      const location = offset != null ? offsetToLineColumn(input, offset) : null
      return { formatted: '', error: { message: err.message, location } }
    }
  }, [input, indent])

  return (
    <ToolPage name={meta.name} description={meta.description}>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="json-input" className="text-sm font-medium text-ink dark:text-dark-ink">
            Paste JSON
          </label>
          <button
            type="button"
            onClick={() => setInput(SAMPLE)}
            className="text-xs text-pine-600 hover:underline dark:text-pine-300"
          >
            Load sample
          </button>
        </div>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          placeholder='{ "hello": "world" }'
          className={`w-full rounded-md border bg-paper-raised p-3 font-mono text-sm text-ink outline-none ring-pine-500 focus:ring-2 dark:bg-dark-surface dark:text-dark-ink ${
            result.error ? 'border-red-400 dark:border-red-500' : 'border-line dark:border-dark-line'
          }`}
        />
      </div>

      {result.error && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          <p className="font-medium">Invalid JSON</p>
          <p className="mt-1">
            {result.error.message}
            {result.error.location &&
              ` (line ${result.error.location.line}, column ${result.error.location.column})`}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-ink dark:text-dark-ink">Indent</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-md border border-line bg-paper-raised px-2.5 py-1.5 text-sm text-ink outline-none ring-pine-500 focus:ring-2 dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={0}>Minified</option>
          </select>
        </div>
        <CopyButton getText={() => result.formatted} label="Copy formatted" />
      </div>

      <div>
        <p className="mb-1.5 text-sm font-medium text-ink dark:text-dark-ink">Formatted output</p>
        <pre className="max-h-96 overflow-auto rounded-md border border-line bg-paper-raised p-3 font-mono text-sm text-ink dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink">
          {result.formatted || '—'}
        </pre>
      </div>
    </ToolPage>
  )
}
