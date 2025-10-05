// @ts-nocheck
"use client"
import { Suspense, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import SceneFX from "@/components/SceneFX"
import { useCameraFocus } from "@/components/camera/store"
import { LABELS, LINKS } from "@/components/data/nav"
import { useUI } from "@/components/ui/store"
import { useRouter } from "next/navigation"

export default function OrbitingUI() {
  return (
    <Canvas
      className="fixed inset-0 -z-10"
      camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 100 }}
      gl={{ alpha: true }}
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 4, 4]} intensity={0.6} />
      <Suspense fallback={null}>
        <SceneFX />
        <OrbitButtons />
      </Suspense>
    </Canvas>
  )
}

function OrbitButtons() {
  const group = useRef<THREE.Group>(null)
  const t0 = useMemo(() => Math.random() * 1000, [])
  const animationSpeed = useUI((s) => s.animationSpeed)
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta * animationSpeed
    const t = timeRef.current + t0
    if (!group.current) return
    const L = LABELS.length
    group.current.children.forEach((child, i) => {
      const ring = i % 2
      const baseR = 5.0
      const r = baseR + (ring ? 0.8 : -0.2)
      const speed = 0.22 + i * 0.017
      const phase = (i * (Math.PI * 2) / L) + (ring ? Math.PI / L : 0)
      const a = t * speed + phase
      const y = Math.sin(t * 0.45 + i) * 0.45
      child.position.set(Math.cos(a) * r, y, Math.sin(a) * r)
      child.lookAt(0, 0, 0)
    })
  })

  return (
    <group ref={group}>
      {LABELS.map((text) => (
        <OrbitButton key={text} text={text} href={LINKS[text] || "#"} />
      ))}
    </group>
  )
}

function OrbitButton({ text, href }: { text: string; href: string }) {
  const [hover, setHover] = useState(false)
  const buttonRef = useRef<THREE.Group>(null)
  const focus = useCameraFocus((s) => s.focusTo)
  const router = useRouter()
  const setSidebar = useUI((s) => s.setSidebar)
  const baseClasses =
    "px-6 md:px-8 py-3 md:py-3.5 rounded-full text-base md:text-lg font-extrabold tracking-wide backdrop-blur border transition-all duration-200 border-cyan-300/40 text-white bg-gradient-to-r from-cardic.blue/35 via-transparent to-cardic.violet/35"

  const handleClick = () => {
    if (!href || href === "#") {
      const p = buttonRef.current?.getWorldPosition(new THREE.Vector3()) ?? new THREE.Vector3(0, 0, 0)
      focus([p.x, p.y, p.z])
      alert("Coming soon")
      return
    }

    setSidebar(false)

    if (href.startsWith("/")) {
      router.push(href)
    } else {
      window.open(href, "_blank")
    }
  }

  return (
    <group ref={buttonRef}>
      <Html center occlude distanceFactor={8} sprite>
        <div className="pointer-events-auto">
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
            className={`${baseClasses} ${hover ? "scale-[1.08] shadow-glow" : "scale-100"}`}
            style={{
              boxShadow: hover
                ? "0 0 28px rgba(34,211,238,0.55), 0 0 60px rgba(139,92,246,0.4)"
                : "0 0 14px rgba(14,165,233,0.18)",
            }}
          >
            {text}
          </button>
        </div>
      </Html>
    </group>
  )
}
