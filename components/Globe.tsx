"use client"

import React, { useEffect, useMemo, useRef } from "react"
import { Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

import { useUI } from "@/components/ui/store"

type WireProps = {
  radius: number
  color: string
  refObj: React.MutableRefObject<THREE.LineSegments | null>
}

type GlobeProps = {
  radius?: number
}

export default function Globe({ radius = 2.8 }: GlobeProps) {
  const group = useRef<THREE.Group>(null!)
  const wire1 = useRef<THREE.LineSegments>(null!)
  const wire2 = useRef<THREE.LineSegments>(null!)
  const animationSpeed = useUI((s) => s.animationSpeed)

  useFrame((_, dt) => {
    const delta = dt * animationSpeed
    if (group.current) group.current.rotation.y += delta * 0.05
    if (wire1.current) wire1.current.rotation.y += delta * 0.1
    if (wire2.current) wire2.current.rotation.y -= delta * 0.08
  })

  const R = radius

  return (
    <group ref={group}>
      {/* Atmosphere halo */}
      <mesh>
        <sphereGeometry args={[R + 0.7, 64, 64]} />
        <meshBasicMaterial color={'#22d3ee'} transparent opacity={0.1} />
      </mesh>

      {/* Core sphere */}
      <Sphere args={[R, 128, 128]}>
        <meshStandardMaterial color="#0b132b" metalness={0.45} roughness={0.8} />
      </Sphere>

      {/* Dual wireframes */}
      <Wire radius={R + 0.06} refObj={wire1} color="#22d3ee" />
      <Wire radius={R + 0.06} refObj={wire2} color="#8b5cf6" />
    </group>
  )
}

function Wire({ radius, color, refObj }: WireProps) {
  const geometry = useMemo(
    () => new THREE.IcosahedronGeometry(radius, 3),
    [radius]
  )

  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry),
    [geometry]
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      edges.dispose()
    }
  }, [edges, geometry])
  return (
    <lineSegments ref={refObj}>
      <bufferGeometry attach="geometry" {...edges} />
      <lineBasicMaterial attach="material" color={color} linewidth={1} />
    </lineSegments>
  )
}
