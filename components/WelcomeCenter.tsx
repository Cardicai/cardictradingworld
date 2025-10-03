'use client'

import { useEffect, useState } from 'react'

export default function WelcomeCenter() {
  const [allowGlow, setAllowGlow] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setAllowGlow(!query.matches)
    update()
    const handler = (event: MediaQueryListEvent) => setAllowGlow(!event.matches)
    query.addEventListener('change', handler)
    return () => {
      query.removeEventListener('change', handler)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-[50] flex items-center justify-center px-6">
      <div className="text-center">
        <h2
          className="text-balance text-2xl font-semibold uppercase tracking-[0.32em] text-white sm:text-4xl"
          style={{ textShadow: allowGlow ? '0 0 24px rgba(56,189,248,0.4)' : '0 0 12px rgba(56,189,248,0.28)' }}
        >
          Welcome to Cardic Nexus
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/70 sm:text-base">
          Where smart minds meet
        </p>
      </div>
    </div>
  )
}
