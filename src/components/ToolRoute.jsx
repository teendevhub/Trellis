import { lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getToolById } from '../tools/registry'

export default function ToolRoute() {
  const { toolId } = useParams()
  const tool = getToolById(toolId)

  if (!tool) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-5xl">🌱</p>
        <h1 className="mt-4 font-display text-xl font-semibold text-ink dark:text-dark-ink">
          No tool called "{toolId}"
        </h1>
        <p className="mt-2 text-sm text-ink-soft dark:text-dark-ink-soft">
          It might have been renamed or removed. You could be the one to plant it.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-pine-600 px-4 py-2 text-sm font-medium text-white hover:bg-pine-700"
        >
          Back to all tools
        </Link>
      </div>
    )
  }

  // Lazily load the tool's own component the first time it's visited.
  const ToolComponent = lazy(tool.load)

  return (
    <Suspense fallback={<ToolLoadingFallback />}>
      <ToolComponent />
    </Suspense>
  )
}

function ToolLoadingFallback() {
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-24 text-sm text-ink-soft dark:text-dark-ink-soft">
      Loading tool…
    </div>
  )
}
