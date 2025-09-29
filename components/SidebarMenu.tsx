'use client'
import { LABELS, LINKS } from '@/components/data/nav'
import { useUI } from '@/components/ui/store'
import { motion, AnimatePresence } from 'framer-motion'
import { type MouseEvent } from 'react'

export default function SidebarMenu(){
  const sidebar = useUI(s=>s.sidebar)
  const handleLinkClick = (href?: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href || href === '#') {
      event.preventDefault()
      window.alert('Coming Soon')
    }
  }

  return (
    <AnimatePresence>
      {sidebar && (
        <>
          {/* Backdrop dim */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: .35 }} exit={{ opacity: 0 }}
            transition={{ duration: .25 }}
            className="absolute inset-0 bg-black pointer-events-none z-20"
          />
          {/* Sliding panel */}
          <motion.div
            initial={{ x: 380 }} animate={{ x: 0 }} exit={{ x: 380 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="pointer-events-auto absolute inset-y-0 right-0 z-30 flex items-center"
          >
            <nav className="mr-6 w-[min(340px,42vw)] max-h-[90vh] overflow-auto
                            bg-black/50 backdrop-blur rounded-2xl border border-cyan-300/20 p-4 space-y-3">
              {LABELS.map((label)=>(
                <a
                  key={label}
                  href={LINKS[label] || '#'}
                  target={LINKS[label] && LINKS[label] !== '#' ? '_blank' : undefined}
                  rel={LINKS[label] && LINKS[label] !== '#' ? 'noreferrer' : undefined}
                  onClick={handleLinkClick(LINKS[label])}
                  className="block w-full px-4 py-3 rounded-xl
                             border border-cyan-300/30 text-white font-bold
                             bg-gradient-to-r from-cyan-500/25 via-transparent to-violet-500/25
                             shadow-glow hover:scale-[1.02] transition"
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
