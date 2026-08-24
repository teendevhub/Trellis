import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import ToolPage from '../../components/ToolPage'
import meta from './meta'

const SIZES = [256, 512, 1024]

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://github.com')
  const [size, setSize] = useState(512)
  const [error, setError] = useState('')
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!text.trim()) {
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      setError('')
      return
    }

    QRCode.toCanvas(
      canvasRef.current,
      text,
      { width: size, margin: 2, color: { dark: '#182018', light: '#F3F5EEff' } },
      (err) => setError(err ? 'Could not generate a QR code for this input.' : '')
    )
  }, [text, size])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas || !text.trim()) return
    const link = document.createElement('a')
    link.download = 'trellis-qr-code.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <ToolPage name={meta.name} description={meta.description}>
      <div>
        <label htmlFor="qr-input" className="mb-1.5 block text-sm font-medium text-ink dark:text-dark-ink">
          Text or URL
        </label>
        <textarea
          id="qr-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="https://example.com"
          className="w-full rounded-md border border-line bg-paper-raised p-3 font-mono text-sm text-ink outline-none ring-pine-500 focus:ring-2 dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink"
        />
        {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-ink dark:text-dark-ink">Size</label>
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="rounded-md border border-line bg-paper-raised px-2.5 py-1.5 text-sm text-ink outline-none ring-pine-500 focus:ring-2 dark:border-dark-line dark:bg-dark-surface dark:text-dark-ink"
        >
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s}×{s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="rounded-lg border border-line bg-paper-raised p-4 dark:border-dark-line dark:bg-dark-surface">
          <canvas ref={canvasRef} className="max-w-full" style={{ width: 240, height: 240 }} />
        </div>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!text.trim() || !!error}
          className="inline-flex items-center gap-2 rounded-md bg-pine-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-pine-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <DownloadIcon /> Download PNG
        </button>
      </div>
    </ToolPage>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
    </svg>
  )
}
