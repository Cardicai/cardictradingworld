'use client'
import { motion } from 'framer-motion'
import { useUI } from '@/components/ui/store'

export default function WelcomeCenter() {
  const sidebar = useUI((s) => s.sidebar)

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
      <motion.div
        initial={false}
        animate={{ opacity: sidebar ? 0 : 1, y: sidebar ? 16 : 0, scale: sidebar ? 0.97 : 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="max-w-3xl text-center"
      >
        <h2
          className="text-[clamp(2.2rem,6vw,3.8rem)] font-semibold tracking-[0.12em] text-white"
          style={{ textShadow: '0 0 22px rgba(56,189,248,0.45)' }}
        >
          Cardic Nexus — Space Hub
        </h2>
        <p className="mt-4 text-[clamp(0.95rem,2.8vw,1.25rem)] font-medium text-white/80">
          Build bold ideas with stellar teams, guided by mentors, tools, and funding aligned to your orbit.
        </p>
      </motion.div>
    </div>
  )
}
