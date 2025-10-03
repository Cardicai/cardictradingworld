'use client'
import { useUI } from './store'

export default function Toggle(){
  const { sidebar, toggleSidebar } = useUI()
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="pointer-events-auto fixed z-50 flex min-h-12 items-center justify-center rounded-full border-[3px] border-cyan-50/80 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 px-6 text-[clamp(0.7rem,2.2vw,0.82rem)] font-bold uppercase tracking-[0.24em] text-white shadow-[0_0_40px_rgba(56,189,248,0.65)] transition hover:scale-105 hover:border-cyan-50/95"
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
