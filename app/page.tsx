'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Globe from '@/components/Globe'
import { Stars } from '@react-three/drei'

import OrbitingUI from '@/components/OrbitingUI'
import SidebarMenu from '@/components/SidebarMenu'
import Toggle from '@/components/ui/Toggle'
import WelcomeCenter from '@/components/WelcomeCenter'

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* HUD / Header */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6">
        <h1 className="pointer-events-auto select-none text-2xl font-extrabold tracking-widest">
          CARDIC NEXUS
          <span className="ml-3 text-sm font-medium opacity-70">we build from vision to result · Space Hub</span>
        </h1>
        <div className="pointer-events-auto">
          <Toggle />
        </div>
      </header>

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          {/* lights */}
          <ambientLight intensity={0.25} />
          <pointLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-5, -2, -3]} intensity={0.6} />

          {/* stars background (subtle) */}
          <Stars radius={100} depth={50} count={4000} factor={2} saturation={0} fade speed={0.3} />

          {/* orbiting buttons */}
          <Globe radius={2.6} />
            <Suspense fallback={null}>
            <OrbitingUI />
          </Suspense>
        </Canvas>
      </div>

      {/* UI overlays rendered outside the Canvas */}
      <SidebarMenu />
      <WelcomeCenter />
    </main>
  )
}
