"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-6 text-center text-white">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="max-w-md text-sm text-white/70">
        An unexpected error occurred. You can try again, or navigate back to the home screen.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full border border-cyan-300/60 bg-cyan-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-cyan-100 hover:bg-cyan-500/35"
      >
        Try again
      </button>
    </div>
  )
}
