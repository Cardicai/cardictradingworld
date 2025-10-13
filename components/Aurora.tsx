// @ts-nocheck
"use client";
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
export default function Aurora(){
  const m = useRef<THREE.Mesh>(null)
  useFrame((_,dt)=>{ if(m.current) m.current.rotation.y += dt*0.02 })
  return (
    <mesh ref={m} position={[0,2.4,0]}>
      <ringGeometry args={[2.2, 2.5, 64]} />
      <meshBasicMaterial color={'#86efac'} transparent opacity={0.12} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}
