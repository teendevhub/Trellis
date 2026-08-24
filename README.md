# Trellis

**The dev toolbox that grows with you.**

Trellis is an open-source, all-in-one collection of everyday developer
tools — QR codes, JSON formatting, Base64, UUIDs, color conversion, and
whatever the community adds next. It's client-side only: no backend, no
database, no accounts, nothing you paste ever leaves your browser.

It's named for the garden structure — a lattice you attach new growth to.
Every tool in this app is a plugin bolted onto the same simple frame, and
adding a new one is meant to be a first-PR-friendly afternoon project.

<img width="1596" height="759" alt="image" src="https://github.com/user-attachments/assets/9777b1c3-ccc4-4f6a-becb-c523c30c1894" />


## Included tools

| Tool | What it does |
|---|---|
| 🔳 QR Code Generator | Text/URL → downloadable QR code PNG |
| `{ }` JSON Formatter | Pretty-print and validate JSON, with error locations |
| ⇄ Base64 Encoder/Decoder | UTF-8 safe encode/decode |
| 🆔 UUID Generator | Generate one or many v4 UUIDs |
| 🎨 Color Converter | HEX ↔ RGB ↔ HSL, with a live picker and sliders |

## Getting started

```bash
npm install
npm run dev
```

That's it — no environment variables, no config files, no external
services. Open the printed local URL and start using tools.

To build for production:

```bash
npm run build
```

## Stack

- [React](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com) (v4)
- [React Router](https://reactrouter.com) for one route per tool
- No backend, no database, no auth — everything runs in the browser

## How the plugin architecture works

Every tool is a folder under `src/tools/<tool-name>/` with two files:

```
src/tools/json-formatter/
├── meta.js     # { id, name, description, icon, category }
└── index.jsx   # the tool's self-contained React component
```

`src/tools/registry.js` uses Vite's `import.meta.glob` to automatically
discover every tool folder at build time. Drop in a new folder that
follows the shape above, and it appears in the sidebar, the home grid,
and gets its own route at `/tools/<id>` — with **zero changes to any
core file**.

## Adding a tool

The short version:

1. Copy `src/tools/_template/` to `src/tools/your-tool-name/`.
2. Fill in `meta.js`.
3. Build your tool in `index.jsx`.
4. Open a PR.

The full walkthrough, written for first-time open-source contributors,
is in [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Contributors

Trellis grows one tool at a time. Thanks to everyone who's added one —
your name goes here.

<!--
  Contributors: add yourself in your PR, e.g.
  - [@yourhandle](https://github.com/yourhandle) — Word Counter
-->

## License

MIT — see [`LICENSE`](./LICENSE).
