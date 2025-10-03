'use client'
import { useUI } from './store'

export default function Toggle(){
  const { sidebar, toggleSidebar } = useUI()
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="pointer-events-auto fixed z-50 flex min-h-12 items-center justify-center rounded-full border-[3px] border-cyan-100/70 bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-400 px-6 text-[clamp(0.7rem,2.2vw,0.82rem)] font-bold uppercase tracking-[0.24em] text-white shadow-[0_0_32px_rgba(6,182,212,0.55)] transition hover:scale-105 hover:border-cyan-50/90"
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
