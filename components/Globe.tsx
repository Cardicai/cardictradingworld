
'use client'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

export default function Globe() {
  const group = useRef<THREE.Group>(null)
  const wire1 = useRef<THREE.LineSegments>(null)
  const wire2 = useRef<THREE.LineSegments>(null)

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.05
    if (wire1.current) wire1.current.rotation.y += dt * 0.1
    if (wire2.current) wire2.current.rotation.y -= dt * 0.08
  })

  return (
    <group ref={group}>
      {/* Atmosphere halo */}
      <mesh>
        <sphereGeometry args={[2.05, 32, 32]} />
        <meshBasicMaterial color={'#22d3ee'} transparent opacity={0.08} />
      </mesh>

      {/* Core sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial color="#0b132b" metalness={0.4} roughness={0.8} />
      </Sphere>

      {/* Dual wireframes */}
      <Wire radius={2.02} refObj={wire1} color="#22d3ee"/>
      <Wire radius={2.02} refObj={wire2} color="#8b5cf6"/>
    </group>
  )
}

function Wire({ radius, color, refObj }:{ radius:number, color:string, refObj: any }){
  const geo = new THREE.IcosahedronGeometry(radius, 3)
  const edges = new THREE.EdgesGeometry(geo)
  return (
    <lineSegments ref={refObj}>
      <bufferGeometry attach="geometry" {...edges} />
      <lineBasicMaterial attach="material" color={color} />
    </lineSegments>
  )
}
