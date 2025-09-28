'use client'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import * as THREE from 'three'
import { AnimatePresence, motion } from 'framer-motion'
import Globe from '@/components/Globe'
import OrbitingUI, { ORBIT_ITEMS } from '@/components/OrbitingUI'
import SceneFX from '@/components/SceneFX'
import CameraRig from '@/components/camera/CameraRig'

export default function Page() {
  const [isDocked, setIsDocked] = useState(false)
  return (
    <main className="fixed inset-0 bg-black">
      <div className="absolute top-6 right-6 z-30 pointer-events-auto">
        <button
          onClick={() => setIsDocked((prev) => !prev)}
          className="px-4 py-2 rounded-full text-sm md:text-base font-semibold tracking-wide border border-cyan-300/60 text-white bg-cardic.blue/30 hover:bg-cardic.blue/50 transition-colors backdrop-blur"
        >
          {isDocked ? 'Resume Orbit' : 'Dock Interface'}
        </button>
      </div>
      {/* HUD */}
      <div className="absolute inset-x-0 top-0 z-20 flex flex-col items-center p-6 pointer-events-none">
        <motion.h1 initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
          className="text-3xl md:text-5xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cardic.blue to-cardic.violet drop-shadow">
          CARDIC NEXUS
        </motion.h1>
        <p className="mt-2 text-xs md:text-sm opacity-70">Futuristic Galactic Interface · Space Hub</p>
      </div>

      <AnimatePresence>
        {isDocked && (
          <motion.div
            className="absolute inset-0 z-20 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ml-auto mr-8 mt-28 flex flex-col gap-3 pointer-events-auto"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 16 }}
            >
              {ORBIT_ITEMS.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href && href !== '#' ? '_blank' : undefined}
                  rel={href && href !== '#' ? 'noreferrer' : undefined}
                  className="px-5 py-3 rounded-full border border-cyan-300/40 text-sm md:text-base font-semibold tracking-wide text-white/90 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
              <motion.div
                className="max-w-xl text-center"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <motion.p
                  className="text-xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide drop-shadow-xl"
                  animate={{ opacity: [0.6, 1, 0.6], scale: [0.98, 1.04, 0.98] }}
                  transition={{ duration: 3.2, repeat: Infinity }}
                >
                  Welcome to Cardic Nexus where smart minds meet.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ThreeJS */}
      <div className="absolute inset-0">
        <Canvas className="h-full w-full" camera={{ position: [0, 0, 10], fov: 50 }}>
          <color attach="background" args={[0x000000]} />
          <ambientLight intensity={0.25} />
          <pointLight position={[6, 6, 8]} intensity={1.3} />
          <pointLight position={[-6, -3, -6]} intensity={0.7} color={new THREE.Color('#8b5cf6')} />
          <Suspense fallback={null}>
            <CameraRig />
            <Globe />
            <SceneFX />
            <Stars radius={130} depth={80} count={4500} factor={2.6} fade speed={0.4} />
            <OrbitingUI docked={isDocked} />
          </Suspense>
          <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={6} maxDistance={16} />
        </Canvas>
      </div>

      {/* Background nebula overlay */}
      <div className="absolute inset-0 bg-nebula opacity-80" />
      <div className="absolute inset-0 nebula-vignette" />
    </main>
  )
}
