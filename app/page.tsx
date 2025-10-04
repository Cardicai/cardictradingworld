// @ts-nocheck
'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Globe from '@/components/Globe'
import { Stars } from '@react-three/drei'

import OrbitingUI from '@/components/OrbitingUI'

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
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
    </main>
  )
}
