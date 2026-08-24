/**
 * Wraps a tool's content with a consistent title + description header.
 * Purely presentational — tools stay in charge of their own state.
 */
export default function ToolPage({ name, description, children }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-ink dark:text-dark-ink">
          {name}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-ink-soft dark:text-dark-ink-soft">
            {description}
          </p>
        )}
      </header>
      <div className="space-y-6">{children}</div>
    </div>
  )
}
