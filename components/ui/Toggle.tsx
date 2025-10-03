'use client'
import { useUI } from './store'

export default function Toggle() {
  const focusMenuOpen = useUI((state) => state.focusMenuOpen)
  const toggleFocusMenu = useUI((state) => state.toggleFocusMenu)

  return (
    <button
      type="button"
      onClick={toggleFocusMenu}
      className="pointer-events-auto relative z-[90] inline-flex min-h-[3rem] items-center justify-center rounded-full border border-cyan-300/40 bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/20 px-5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_32px_rgba(14,165,233,0.32)] transition-transform duration-300 ease-out hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
      aria-pressed={focusMenuOpen}
      aria-expanded={focusMenuOpen}
      aria-controls="focus-drawer"
    >
      {focusMenuOpen ? 'Back to Orbit' : 'Focus Menu'}
    </button>
  )
}
