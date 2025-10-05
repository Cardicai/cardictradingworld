// @ts-nocheck
"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import Globe from "@/components/Globe"
import OrbitingUI from "@/components/OrbitingUI"
import SiteHeader from "@/components/SiteHeader"
import SidebarMenu from "@/components/SidebarMenu"
import WelcomeCenter from "@/components/WelcomeCenter"

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <SiteHeader />
      <SidebarMenu />

      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
            <ambientLight intensity={0.25} />
            <pointLight position={[5, 5, 5]} intensity={1.2} />
            <pointLight position={[-5, -2, -3]} intensity={0.6} />

            <Stars radius={100} depth={50} count={4000} factor={2} saturation={0} fade speed={0.3} />

            <Globe radius={2.6} />
            <Suspense fallback={null}>
              <OrbitingUI />
            </Suspense>
          </Canvas>
        </div>

        <WelcomeCenter />
      </section>
    </main>
  )
}
