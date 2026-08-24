/**
 * Trellis tool registry
 * ----------------------
 * This file is the ONLY place that "knows" tools exist, and it doesn't
 * really know — it discovers them. Every folder under `src/tools/*`
 * that exports a `meta.js` and an `index.jsx` is automatically picked up
 * at build time by Vite's `import.meta.glob`.
 *
 * Contributors never touch this file. Add a folder, and your tool shows
 * up in the sidebar, the home grid, and gets a route — for free.
 */

// Eagerly import every meta.js so tool metadata (name, icon, category…)
// is available synchronously for building the sidebar/search/home grid.
const metaModules = import.meta.glob('./*/meta.js', { eager: true })

// Lazily import every index.jsx — the actual component code is only
// loaded when a user navigates to that tool, keeping the app fast.
const componentModules = import.meta.glob('./*/index.jsx')

function folderIdFromPath(path) {
  // path looks like './json-formatter/meta.js' -> 'json-formatter'
  const match = path.match(/^\.\/([^/]+)\//)
  return match ? match[1] : null
}

const tools = Object.entries(metaModules)
  .map(([path, mod]) => {
    const folderId = folderIdFromPath(path)
    if (folderId === '_template') return null // skip the starter template

    const meta = mod.default ?? mod
    const componentPath = `./${folderId}/index.jsx`
    const loadComponent = componentModules[componentPath]

    if (!loadComponent) {
      console.warn(
        `[trellis] Tool "${folderId}" has a meta.js but no index.jsx — skipping.`
      )
      return null
    }

    if (!meta?.id || !meta?.name) {
      console.warn(
        `[trellis] Tool folder "${folderId}" is missing a required id/name in meta.js — skipping.`
      )
      return null
    }

    return {
      ...meta,
      folderId,
      // React.lazy-compatible loader
      load: loadComponent,
    }
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name))

/** All registered tools, sorted alphabetically by name. */
export const tools_list = tools

/** Tools grouped by their `category`, for the sidebar. */
export function getToolsByCategory() {
  const groups = {}
  for (const tool of tools) {
    const category = tool.category || 'Other'
    if (!groups[category]) groups[category] = []
    groups[category].push(tool)
  }
  return groups
}

/** Look up a single tool by its id (used by the router). */
export function getToolById(id) {
  return tools.find((tool) => tool.id === id)
}
