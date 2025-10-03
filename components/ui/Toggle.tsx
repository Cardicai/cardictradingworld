'use client'
import { useUI } from './store'

export default function Toggle(){
  const { focusActive, toggleFocus } = useUI()
  return (
    <button
      onClick={toggleFocus}
      className="pointer-events-auto absolute top-5 right-6 z-30 rounded-full border border-cyan-300/40
                 bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/20 px-4 py-2
                 text-white font-semibold shadow-glow transition hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
      aria-pressed={focusActive}
    >
      {focusActive ? 'Back to Orbit' : 'Focus Menu'}
    </button>
  )
}
