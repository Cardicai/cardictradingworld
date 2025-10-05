'use client'

import Toggle from '@/components/ui/Toggle'
import { usePathname } from 'next/navigation'

export default function SiteHeader() {
  const pathname = usePathname()

  if (pathname?.startsWith('/apps')) {
    return null
  }

  return (
    <header
      className="pointer-events-none absolute inset-x-0 top-0 z-40 mx-auto flex max-w-7xl items-start justify-between px-4 sm:px-6"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
        paddingLeft: 'calc(env(safe-area-inset-left, 0px) + 1rem)',
        paddingRight: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
      }}
    >
      <h1
        className="pointer-events-auto mt-[clamp(0.75rem,6vw,2rem)] select-none text-[clamp(1.05rem,4.5vw,1.4rem)] font-extrabold tracking-[0.42em] max-[480px]:mt-[clamp(3rem,14vw,3.75rem)] max-[480px]:tracking-[0.3em] max-[480px]:pl-[calc(env(safe-area-inset-left,0px)+0.25rem)] sm:mt-0 sm:text-2xl sm:tracking-[0.6em]"
      >
        CARDIC NEXUS
      </h1>
      <div className="pointer-events-auto">
        <Toggle />
      </div>
    </header>
  )
}
