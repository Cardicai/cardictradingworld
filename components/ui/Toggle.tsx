'use client'
import { useUI } from './store'

export default function Toggle() {
  const { sidebar, toggleSidebar } = useUI()
  return (
    <button
      type="button"
      onClick={toggleSidebar}
 fixed top-6 right-6 z-50 rounded-full border border-cyan-300/50 bg-gradient-to-r from-cyan-500/25 via-transparent to-violet-500/25 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(14,165,233,0.35)] transition hover:scale-105 hover:border-cyan-200/80"

      aria-pressed={sidebar}
      aria-expanded={sidebar}
      aria-controls="focus-menu"
    >
      {sidebar ? 'Back to Orbit' : 'Focus Menu'}
    </button>
  )
}
