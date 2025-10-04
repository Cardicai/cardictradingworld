'use client'

import { useUI } from './store'

export default function Toggle() {
  const { sidebar, toggleSidebar } = useUI()
  const label = sidebar ? 'Back to Orbit' : 'Focus Menu'
  const ariaLabel = sidebar ? 'Return to orbit view' : 'Open focus menu'
  const topOffset = 'calc(env(safe-area-inset-top, 0px) + clamp(3.25rem, 11vw, 5rem))'

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="pointer-events-auto fixed z-50 inline-flex min-h-[3.25rem] min-w-[11.5rem] items-center justify-center rounded-full border border-cyan-300/50 bg-gradient-to-r from-cyan-500/25 via-transparent to-violet-500/25 px-7 py-3 text-[0.85rem] font-semibold uppercase tracking-[0.28em] text-white shadow-[0_0_24px_rgba(14,165,233,0.38)] backdrop-blur-sm transition hover:scale-[1.03] hover:border-cyan-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      style={{
        right: 'calc(env(safe-area-inset-right, 0px) + clamp(0.85rem, 3vw, 2.5rem))',
        top: topOffset,
      }}
      aria-pressed={sidebar}
      aria-expanded={sidebar}
      aria-controls="focus-menu"
      aria-label={ariaLabel}
      aria-haspopup="dialog"
    >
      <span aria-live="polite" className="whitespace-nowrap">
        {label}
      </span>
    </button>
  )
}
