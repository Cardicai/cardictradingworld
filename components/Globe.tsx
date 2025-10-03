'use client'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

type GlobeProps = {
  detail?: number
}

export default function Globe({ detail = 96 }: GlobeProps) {
  const group = useRef<THREE.Group>(null)
  const wire1 = useRef<THREE.LineSegments>(null)
  const wire2 = useRef<THREE.LineSegments>(null)

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.05
    if (wire1.current) wire1.current.rotation.y += dt * 0.1
    if (wire2.current) wire2.current.rotation.y -= dt * 0.08
  })

  const R = 2.8
  const segments = Math.max(16, Math.min(detail, 128))

  return (
    <group ref={group}>
      {/* Atmosphere halo */}
      <mesh>
        <sphereGeometry args={[R + 0.7, segments / 2, segments / 2]} />
        <meshBasicMaterial color={'#22d3ee'} transparent opacity={0.10} />
      </mesh>

      {/* Core sphere */}
      <Sphere args={[R, segments, segments]}>
        <meshStandardMaterial color="#0b132b" metalness={0.45} roughness={0.8} />
      </Sphere>

      {/* Dual wireframes */}
      <Wire radius={R + 0.06} refObj={wire1} color="#22d3ee" detail={segments / 32} />
      <Wire radius={R + 0.06} refObj={wire2} color="#8b5cf6" detail={segments / 32} />
    </group>
  )
}

function Wire({ radius, color, refObj, detail = 3 }:{ radius:number, color:string, refObj: any, detail?: number }){
  const geo = new THREE.IcosahedronGeometry(radius, Math.max(1, Math.round(detail)))
  const edges = new THREE.EdgesGeometry(geo)
  return (
    <lineSegments ref={refObj}>
      <bufferGeometry attach="geometry" {...edges} />
      <lineBasicMaterial attach="material" color={color} linewidth={1} />
    </lineSegments>
  )
}
