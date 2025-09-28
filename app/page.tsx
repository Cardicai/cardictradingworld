
'use client'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import Globe from '@/components/Globe'
import OrbitingUI from '@/components/OrbitingUI'
import SceneFX from '@/components/SceneFX'
import CameraRig from '@/components/camera/CameraRig'

export default function Page() {
  return (
    <main className="h-dvh w-full relative overflow-hidden bg-black">
      {/* HUD */}
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center p-6">
        <motion.h1 initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
          className="text-2xl md:text-4xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cardic.blue to-cardic.violet drop-shadow">
          CARDIC NEXUS
        </motion.h1>
        <p className="mt-2 text-xs md:text-sm opacity-70">Futuristic Galactic Interface · Space Hub</p>
      </div>

      {/* Canvas */}
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -2, -3]} intensity={0.6} color={new THREE.Color('#8b5cf6')} />
        <Suspense fallback={null}>
          <CameraRig />
          <Globe />
          <SceneFX />
          <Stars radius={80} depth={50} count={6000} factor={2} fade speed={0.6} />
          <OrbitingUI />
        </Suspense>
        <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={5} maxDistance={14} />
      </Canvas>

      {/* Background Nebula + vignette */}
      <div className="absolute inset-0 bg-nebula opacity-60"/>
      <div className="absolute inset-0 nebula-vignette pointer-events-none"/>
    </main>
  )
}
