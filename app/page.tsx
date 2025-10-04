// @ts-nocheck
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
      <header
        className="pointer-events-none absolute inset-x-0 top-0 z-40 mx-auto flex max-w-7xl items-start justify-between px-4 sm:px-6"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
          paddingLeft: 'calc(env(safe-area-inset-left, 0px) + 1rem)',
          paddingRight: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
        }}
      >
        <h1
          className="pointer-events-auto mt-[clamp(0.75rem,6vw,2rem)] select-none text-[clamp(1.05rem,4.5vw,1.4rem)] font-extrabold tracking-[0.42em] max-[480px]:mt-[clamp(3rem,14vw,3.75rem)] max-[480px]:tracking-[0.3em] max-[480px]:pl-[calc(env(safe-area-inset-left,0px)+0.25rem)] sm:mt-0 sm:text-2xl sm:tracking-[0.6em]"
        >
          CARDIC NEXUS
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
