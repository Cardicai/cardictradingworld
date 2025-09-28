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
    <main className="fixed inset-0 bg-black">
      {/* HUD */}
      <div className="absolute inset-x-0 top-0 z-20 flex flex-col items-center p-6 pointer-events-none">
        <motion.h1 initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
          className="text-3xl md:text-5xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cardic.blue to-cardic.violet drop-shadow">
          CARDIC NEXUS
        </motion.h1>
        <p className="mt-2 text-xs md:text-sm opacity-70">Futuristic Galactic Interface · Space Hub</p>
      </div>

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
            <OrbitingUI />
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
