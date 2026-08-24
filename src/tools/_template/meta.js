// meta.js — describes your tool to the rest of the app.
// The registry (src/tools/registry.js) reads this file automatically;
// you never need to register your tool anywhere else.

export default {
  // Unique, URL-safe id. This becomes the route: /tools/<id>
  // Use kebab-case and make sure it doesn't collide with an existing tool.
  id: 'my-new-tool',

  // Display name, shown in the sidebar, search results, and home grid.
  name: 'My New Tool',

  // One short sentence describing what the tool does. Shown under the
  // name on the home grid and used when searching.
  description: 'Replace this with a short, plain-language description.',

  // A single emoji works well and needs no image assets. You can also
  // pass a short piece of JSX (e.g. an inline SVG) if you prefer.
  icon: '🧩',

  // Category groups tools in the sidebar. Reuse an existing category
  // (e.g. "Encoding", "Generators", "Formatters", "Design") if your tool
  // fits one, or introduce a new one if it doesn't.
  category: 'Other',
}
