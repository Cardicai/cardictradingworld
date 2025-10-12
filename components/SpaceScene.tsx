"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"

import OrbitingUI from "@/components/OrbitingUI"
import SceneFX from "@/components/SceneFX"
import Globe from "@/components/Globe"
import CameraRig from "@/components/camera/CameraRig"

export default function SpaceScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        className="pointer-events-auto"
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 1.75]}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#020617"]} />
          <ambientLight intensity={0.45} />
          <directionalLight position={[5, 5, 8]} intensity={0.6} />
          <pointLight position={[-6, -4, 4]} intensity={0.4} />
          <CameraRig />
          <SceneFX />
          <Globe />
          <OrbitingUI />
        </Suspense>
      </Canvas>
    </div>
  )
}
