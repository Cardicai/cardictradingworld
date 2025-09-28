'use client'
import { useUI } from './store'

export default function Toggle(){
  const { sidebar, toggleSidebar } = useUI()
  return (
    <button
      onClick={toggleSidebar}
      className="pointer-events-auto absolute top-5 right-6 z-30 px-4 py-2 rounded-full border border-cyan-300/40
                 bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/20
                 text-white font-semibold shadow-glow hover:scale-[1.05] transition"
      aria-pressed={sidebar}
    >
      {sidebar ? 'Back to Orbit' : 'Focus Menu'}
    </button>
  )
}
