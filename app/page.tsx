"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import SiteHeader from "@/components/SiteHeader";
import SidebarMenu from "@/components/SidebarMenu";
import WelcomeCenter from "@/components/WelcomeCenter";
import OrbitingUI from "@/components/OrbitingUI";
import SceneFX from "@/components/SceneFX";
import Globe from "@/components/Globe";
import CameraRig from "@/components/camera/CameraRig";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 9], fov: 55 }} gl={{ antialias: true, alpha: true }}>
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.25} />
          <pointLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-5, -2, -3]} intensity={0.6} />

          <Stars radius={100} depth={50} count={4000} factor={2} saturation={0} fade speed={0.3} />

          <Suspense fallback={null}>
            <SceneFX />
          </Suspense>

          <Globe radius={2.8} />

          <Suspense fallback={null}>
            <OrbitingUI />
          </Suspense>

          <CameraRig />
        </Canvas>
      </div>

      <SiteHeader />

      <SidebarMenu />

      <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <WelcomeCenter />
      </section>
    </main>
  );
}

