import { useMemo, useState } from 'react'
import ToolPage from '../../components/ToolPage'
import CopyButton from '../../components/CopyButton'
import meta from './meta'

function normalizeHex(hex) {
  let h = hex.trim().replace(/^#/, '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  return /^[0-9a-fA-F]{6}$/.test(h) ? h.toLowerCase() : null
}

function hexToRgb(hex) {
  const h = normalizeHex(hex)
  if (!h) return null
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }) {
  const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function rgbToHsl({ r, g, b }) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
    }
    h /= 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb({ h, s, l }) {
  h /= 360
  s /= 100
  l /= 100
  if (s === 0) {
    const v = Math.round(l * 255)
    return { r: v, g: v, b: v }
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const hue2rgb = (t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  return {
    r: Math.round(hue2rgb(h + 1 / 3) * 255),
    g: Math.round(hue2rgb(h) * 255),
    b: Math.round(hue2rgb(h - 1 / 3) * 255),
  }
}

const DEFAULT_HEX = '3f7d58'

export default function ColorConverter() {
  const [hexInput, setHexInput] = useState(DEFAULT_HEX)

  const rgb = useMemo(() => hexToRgb(hexInput) ?? hexToRgb(DEFAULT_HEX), [hexInput])
  const isValid = hexToRgb(hexInput) !== null
  const hsl = useMemo(() => rgbToHsl(rgb), [rgb])
  const hex = useMemo(() => rgbToHex(rgb), [rgb])

  function updateFromRgb(next) {
    setHexInput(rgbToHex({ ...rgb, ...next }))
  }

  function updateFromHsl(next) {
    const nextHsl = { ...hsl, ...next }
    setHexInput(rgbToHex(hslToRgb(nextHsl)))
  }

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
  const hexString = `#${hex.replace('#', '')}`

  return (
    <ToolPage name={meta.name} description={meta.description}>
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="color"
          value={`#${hex.replace('#', '')}`}
          onChange={(e) => setHexInput(e.target.value)}
          className="h-14 w-14 cursor-pointer rounded-md border border-line bg-transparent p-0 dark:border-dark-line"
          aria-label="Pick a color"
        />
        <div
          className="h-14 w-14 rounded-md border border-line dark:border-dark-line"
          style={{ backgroundColor: `#${hex.replace('#', '')}` }}
          aria-hidden
        />
        <div className="min-w-[10rem] flex-1">
          <label htmlFor="hex-input" className="mb-1 block text-xs font-medium text-ink-soft dark:text-dark-ink-soft">
            HEX
          </label>
          <input
            id="hex-input"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            spellCheck={false}
            className={`w-full rounded-md border bg-paper-raised px-3 py-1.5 font-mono text-sm text-ink outline-none ring-pine-500 focus:ring-2 dark:bg-dark-surface dark:text-dark-ink ${
              isValid ? 'border-line dark:border-dark-line' : 'border-red-400 dark:border-red-500'
            }`}
          />
        </div>
      </div>
      {!isValid && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Not a valid hex color — showing the last valid value below.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <ColorField label="HEX" value={hexString} />
        <ColorField label="RGB" value={rgbString} />
        <ColorField label="HSL" value={hslString} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-medium text-ink dark:text-dark-ink">RGB sliders</h3>
          <div className="space-y-2">
            <Slider label="R" value={rgb.r} max={255} onChange={(r) => updateFromRgb({ r })} />
            <Slider label="G" value={rgb.g} max={255} onChange={(g) => updateFromRgb({ g })} />
            <Slider label="B" value={rgb.b} max={255} onChange={(b) => updateFromRgb({ b })} />
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium text-ink dark:text-dark-ink">HSL sliders</h3>
          <div className="space-y-2">
            <Slider label="H" value={hsl.h} max={360} onChange={(h) => updateFromHsl({ h })} />
            <Slider label="S" value={hsl.s} max={100} onChange={(s) => updateFromHsl({ s })} />
            <Slider label="L" value={hsl.l} max={100} onChange={(l) => updateFromHsl({ l })} />
          </div>
        </div>
      </div>
    </ToolPage>
  )
}

function ColorField({ label, value }) {
  return (
    <div className="rounded-md border border-line bg-paper-raised p-3 dark:border-dark-line dark:bg-dark-surface">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-soft dark:text-dark-ink-soft">
          {label}
        </span>
        <CopyButton getText={() => value} label="" className="px-2 py-1" />
      </div>
      <code className="break-all font-mono text-sm text-ink dark:text-dark-ink">{value}</code>
    </div>
  )
}

function Slider({ label, value, max, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 text-xs font-medium text-ink-soft dark:text-dark-ink-soft">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 flex-1 accent-pine-600"
      />
      <span className="w-10 text-right text-xs text-ink dark:text-dark-ink">{value}</span>
    </div>
  )
}
