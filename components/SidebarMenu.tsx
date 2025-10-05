'use client'
import { LABELS, LINKS } from '@/components/data/nav'
import { useUI } from '@/components/ui/store'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarMenu() {
  const sidebar = useUI((s) => s.sidebar)
  const setSidebar = useUI((s) => s.setSidebar)
  const pathname = usePathname()

  if (pathname?.startsWith('/apps')) {
    return null
  }

  return (
    <AnimatePresence>
      {sidebar && (
        <>
          <motion.button
            type="button"
            aria-label="Close focus menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => setSidebar(false)}
          />
          <motion.aside
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 flex w-[min(360px,78vw)] max-w-sm"
            id="focus-menu"
          >
            <div className="flex h-full w-full flex-col gap-6 bg-black/80 px-6 pb-10 pt-8 text-white shadow-[0_0_40px_rgba(34,211,238,0.35)]">
              <header className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">Focus Menu</p>
                  <h2 className="text-lg font-semibold text-white">Navigate the Nexus</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebar(false)}
                  className="rounded-full border border-cyan-300/40 px-3 py-1 text-sm font-medium text-white/80 transition hover:border-cyan-200 hover:text-white"
                >
                  Close
                </button>
              </header>
              <nav className="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
                {LABELS.map((label) => {
                  const url = LINKS[label] || '#'
                  if (url === '#') {
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => alert('Coming soon')}
                        className="rounded-xl border border-cyan-300/30 bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/20 px-4 py-3 text-left font-semibold tracking-wide text-white transition hover:scale-[1.02] hover:border-cyan-200/70 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
                      >
                        {label}
                      </button>
                    )
                  }

                  if (url.startsWith('/')) {
                    return (
                      <Link
                        key={label}
                        href={url}
                        onClick={() => setSidebar(false)}
                        className="rounded-xl border border-cyan-300/30 bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/20 px-4 py-3 font-semibold tracking-wide text-white transition hover:scale-[1.02] hover:border-cyan-200/70 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
                      >
                        {label}
                      </Link>
                    )
                  }

                  return (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setSidebar(false)}
                      className="rounded-xl border border-cyan-300/30 bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/20 px-4 py-3 font-semibold tracking-wide text-white transition hover:scale-[1.02] hover:border-cyan-200/70 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
                    >
                      {label}
                    </a>
                  )
                })}
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
