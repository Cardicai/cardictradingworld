'use client'
import { LABELS, LINKS } from '@/components/data/nav'
import { useUI } from '@/components/ui/store'

export default function SidebarMenu(){
  const sidebar = useUI(s=>s.sidebar)
  if(!sidebar) return null

  return (
    <div className="pointer-events-auto absolute inset-y-0 right-0 z-30 flex items-center">
      <nav className="mr-6 w-[min(320px,40vw)] max-h-[90vh] overflow-auto
                      bg-black/40 backdrop-blur rounded-2xl border border-cyan-300/20 p-4 space-y-3">
        {LABELS.map((label)=>(
          <a
            key={label}
            href={LINKS[label] || '#'}
            target={LINKS[label] && LINKS[label] !== '#' ? '_blank' : undefined}
            rel="noreferrer"
            className="block w-full px-4 py-3 rounded-xl
                       border border-cyan-300/30 text-white font-bold
                       bg-gradient-to-r from-cyan-500/25 via-transparent to-violet-500/25
                       shadow-glow hover:scale-[1.02] transition"
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  )
}
