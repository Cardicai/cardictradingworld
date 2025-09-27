
'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
export default function Satellites(){
  const g = useRef<THREE.Group>(null)
  useFrame((state)=>{
    const t = state.clock.getElapsedTime()
    if(!g.current) return
    g.current.children.forEach((m,i)=>{
      const r = 3.3
      const a = t*0.4 + i*2
      m.position.set(Math.cos(a)*r, 0.3*Math.sin(t*0.7+i), Math.sin(a)*r)
      m.lookAt(0,0,0)
    })
  })
  return (
    <group ref={g}>
      {[...Array(3)].map((_,i)=> (
        <mesh key={i}>
          <boxGeometry args={[0.06,0.06,0.16]} />
          <meshStandardMaterial color={'#fbbf24'} />
        </mesh>
      ))}
    </group>
  )
}
