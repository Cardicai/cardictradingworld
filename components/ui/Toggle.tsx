'use client'
import { useUI } from './store'

export default function Toggle(){
  const { sidebar, toggleSidebar } = useUI()
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="pointer-events-auto fixed z-50 rounded-full border border-cyan-300/50 bg-gradient-to-r from-cyan-500/25 via-transparent to-violet-500/25 px-4 py-[0.4rem] text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_0_20px_rgba(14,165,233,0.35)] transition hover:scale-105 hover:border-cyan-200/80"
      style={{
        top: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)',
        right: 'calc(env(safe-area-inset-right, 0px) + 0.75rem)',
      }}
      aria-pressed={sidebar}
      aria-expanded={sidebar}
      aria-controls="focus-menu"
    >
      {sidebar ? 'Back to Orbit' : 'Focus Menu'}
    </button>
  )
}
