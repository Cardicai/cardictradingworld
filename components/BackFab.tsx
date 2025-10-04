'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function BackFab() {
  const router = useRouter()

  const handleClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
      return
    }

    router.push('/')
  }, [router])

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Return to previous screen"
      className="fixed z-50 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/60 bg-cyan-500/25 text-white shadow-[0_0_26px_rgba(34,211,238,0.45)] backdrop-blur transition hover:scale-105 hover:border-cyan-100/80 hover:bg-cyan-400/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
      style={{
        top: 'calc(env(safe-area-inset-top, 0px) + 10px)',
        left: 'calc(env(safe-area-inset-left, 0px) + 12px)',
      }}
    >
      <span aria-hidden className="text-lg font-semibold">
        ←
      </span>
    </button>
  )
}
