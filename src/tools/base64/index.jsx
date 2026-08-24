import { useMemo, useState } from 'react'
import ToolPage from '../../components/ToolPage'
import CopyButton from '../../components/CopyButton'
import meta from './meta'

/** UTF-8 safe Base64 encode (handles emoji, accents, etc.) */
function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return btoa(binary)
}

/** UTF-8 safe Base64 decode. Throws if the input isn't valid Base64. */
function decodeBase64(b64) {
  const binary = atob(b64)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export default function Base64Tool() {
  const [mode, setMode] = useState('encode') // 'encode' | 'decode'
  const [input, setInput] = useState('Trellis grows with you 🌱')

  const result = useMemo(() => {
    if (!input) return { output: '', error: null }
    try {
      const output = mode === 'encode' ? encodeBase64(input) : decodeBase64(input)
      return { output, error: null }
    } catch {
      return { output: '', error: 'That doesn\u2019t look like valid Base64.' }
    }
  }, [input, mode])

  function swapMode() {
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'))
    setInput(result.output || '')
  }

  return (
    <ToolPage name={meta.name} description={meta.description}>
      <div className="inline-flex rounded-md border border-line bg-paper-raised p-1 dark:border-dark-line dark:bg-dark-surface">
        {['encode', 'decode'].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded px-3 py-1.5 text-sm font-medium capitalize transition ${
              mode === m
                ? 'bg-pine-600 text-white'
                : 'text-ink-soft hover:text-ink dark:text-dark-ink-soft dark:hover:text-dark-ink'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="b64-input" className="mb-1.5 block text-sm font-medium text-ink dark:text-dark-ink">
          {mode === 'encode' ? 'Plain text' : 'Base64'}
        </label>
        <textarea
          id="b64-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          spellCheck={false}
          className="w-full rounded-md border border-line bg-paper-raised p-3 font-mono text-sm text-ink outline-none ring-pine-500 focus:ring-2 dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={swapMode}
          disabled={!!result.error}
          className="inline-flex items-center gap-1.5 rounded-md border border-pine-300/60 px-3 py-1.5 text-sm font-medium text-pine-700 transition hover:bg-pine-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-line dark:text-pine-300 dark:hover:bg-dark-surface-raised"
        >
          <SwapIcon /> Use output as input & swap mode
        </button>
      </div>

      {result.error ? (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          {result.error}
        </div>
      ) : (
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-medium text-ink dark:text-dark-ink">
              {mode === 'encode' ? 'Base64' : 'Plain text'}
            </span>
            <CopyButton getText={() => result.output} />
          </div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-md border border-line bg-paper-raised p-3 font-mono text-sm text-ink dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink">
            {result.output || '—'}
          </pre>
        </div>
      )}
    </ToolPage>
  )
}

function SwapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m17 3 4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3" />
    </svg>
  )
}
