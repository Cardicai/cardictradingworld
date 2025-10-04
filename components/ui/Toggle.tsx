'use client'
import { useUI } from './store'

export default function Toggle() {
  const { sidebar, toggleSidebar } = useUI()
  return (
      <button
        type="button"
        onClick={toggleSidebar}
        className="fixed top-6 right-6 z-50 rounded-full border border-cyan-200/70 bg-cyan-500/25 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_28px_rgba(56,189,248,0.55)] backdrop-blur-md transition hover:scale-105 hover:border-cyan-100/90 hover:bg-cyan-400/35"
        aria-pressed={sidebar}
        aria-expanded={sidebar}
        aria-controls="focus-menu"
      >
      {sidebar ? 'Back to Orbit' : 'Focus Menu'}
    </button>
  )
}
