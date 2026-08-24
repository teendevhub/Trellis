# Contributing to Trellis

Thanks for thinking about adding a tool. This guide assumes you've never
contributed to an open-source project before — every step is spelled out.

Trellis is built so that **adding a tool never requires touching any core
file**. You add a folder, and the app finds it automatically.

## 1. Get the project running

```bash
git clone https://github.com/<your-fork>/trellis.git
cd trellis
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You should see
the Trellis home page with the 5 example tools.

## 2. Copy the template

Every tool lives in its own folder under `src/tools/`. There's a
ready-made starting point at `src/tools/_template/`. Copy it and rename
the copy to your tool's id, in kebab-case:

```bash
cp -r src/tools/_template src/tools/word-counter
```

Pick a folder name that matches what your tool does — it becomes part of
the URL (`/tools/word-counter`).

You should now have:

```
src/tools/word-counter/
├── meta.js
└── index.jsx
```

## 3. Fill in `meta.js`

Open `src/tools/word-counter/meta.js` and fill in the fields:

```js
export default {
  id: 'word-counter',        // must match your folder name
  name: 'Word Counter',      // shown in the sidebar and home grid
  description: 'Count words, characters, and reading time.',
  icon: '🔤',                 // any emoji works — no image assets needed
  category: 'Text',          // reuse an existing category if it fits
}
```

That's the entire "registration" step. There is no central list of tools
to edit — the registry (`src/tools/registry.js`) discovers your folder
automatically the next time the dev server (or a build) runs.

## 4. Build your tool in `index.jsx`

Open `src/tools/word-counter/index.jsx`. It already has a working example
using `useState`, the shared `<ToolPage>` header, and a `<CopyButton>`.
Read through the comments, then replace the body with your own logic.

A few rules to keep the plugin system working smoothly:

- **Keep your tool self-contained.** Use your own `useState`/`useReducer`
  for state. Don't import from, or write to, another tool's files.
- **Wrap your content in `<ToolPage>`** (imported from
  `../../components/ToolPage`) for a consistent title and description at
  the top of the page. If your tool needs a very different layout (a
  full-bleed canvas, for example), it's fine to skip it — just keep the
  page usable and readable.
- **Add copy-to-clipboard buttons** wherever a user would want to grab a
  result — use the shared `<CopyButton>` from `../../components/CopyButton`.
- **No backend calls.** Trellis is client-side only, by design. If your
  tool needs a library to run in the browser (like `qrcode` does for the
  QR generator), that's fine — just add it as a dependency.

## 5. Add a dependency (if you need one)

```bash
npm install <package-name>
```

Import it directly in your `index.jsx`. No other configuration needed.

## 6. Test it

With `npm run dev` running, your tool should already be visible in the
sidebar (grouped under whatever `category` you chose) and on the home
page. Click it, try it, and make sure:

- It works with empty input, without throwing an error.
- Long input doesn't break the layout.
- It's usable on a narrow (mobile) screen.
- It looks right in both light and dark mode (toggle in the header).

Then run a production build to make sure nothing breaks when bundled:

```bash
npm run build
```

## 7. Open a pull request

- Fork the repo and push your branch.
- Open a PR with a short description of what your tool does and, if it's
  visual, a screenshot or GIF.
- Keep the PR scoped to one tool — it's much easier to review and merge.

That's it. If anything in this guide was unclear, please open an issue —
improving these docs is itself a great first contribution.
