'use client'
import { motion } from 'framer-motion'
import { useUI } from '@/components/ui/store'

export default function WelcomeCenter(){
  const sidebar = useUI(s=>s.sidebar)
  if(!sidebar) return null
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
      <motion.div
        initial={{ opacity: 0, scale: .95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .6 }}
        className="text-center"
      >
        <div className="text-2xl md:text-5xl font-extrabold tracking-wide
                        bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400 drop-shadow">
          Welcome to Cardic Nexus
        </div>
        <div className="mt-3 text-sm md:text-lg opacity-80">
          where smart minds meet
        </div>
      </motion.div>
    </div>
  )
}
