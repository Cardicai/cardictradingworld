"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import SceneFX from "@/components/SceneFX"
import OrbitingUI from "@/components/OrbitingUI"
import CameraRig from "@/components/camera/CameraRig"
import Globe from "@/components/Globe"

export default function SpaceScene() {
  return (
    <div className="absolute inset-0 z-20">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={0.55} />
        <pointLight position={[6, 8, 10]} intensity={1.4} color="#bae6fd" />
        <pointLight position={[-5, -6, -4]} intensity={0.6} color="#c4b5fd" />
        <Suspense fallback={null}>
          <group position={[0, -0.4, 0]}>
            <Globe />
            <OrbitingUI />
          </group>
          <SceneFX />
        </Suspense>
        <CameraRig />
      </Canvas>
    </div>
  )
}
