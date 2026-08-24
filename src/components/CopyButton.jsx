import { useState } from 'react'

/**
 * A copy-to-clipboard button with a brief "Copied" confirmation.
 * `getText` can be a string or a function (called at click time), so it
 * always copies the freshest value even if it changed after render.
 */
export default function CopyButton({ getText, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false)

  async function handleClick() {
    const text = typeof getText === 'function' ? getText() : getText
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      // Clipboard API can fail in insecure contexts — fail silently,
      // the user can still select-and-copy manually.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 rounded-md border border-pine-300/60 bg-paper-raised px-3 py-1.5 text-sm font-medium text-pine-700 transition hover:bg-pine-50 active:scale-[0.98] dark:border-dark-line dark:bg-dark-surface-raised dark:text-pine-300 dark:hover:bg-dark-surface ${className}`}
    >
      {copied ? (
        <>
          <CheckIcon /> Copied
        </>
      ) : (
        <>
          <CopyIcon /> {label}
        </>
      )}
    </button>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
