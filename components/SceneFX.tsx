// @ts-nocheck
"use client";
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Aurora from '@/components/Aurora'
import Satellites from '@/components/Satellites'

export default function SceneFX(){
  return (
    <group>
      <Nebula />
      <Asteroids count={140} radius={11} />
      <ShootingStars />
      <Comet />
      <Aurora />
      <Satellites />
    </group>
  )
}

function Nebula(){
  const group = useRef<THREE.Group>(null)
  const mats = useMemo(()=>[
    new THREE.MeshBasicMaterial({ color: new THREE.Color('#22d3ee'), transparent:true, opacity:0.08, blending:THREE.AdditiveBlending }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color('#8b5cf6'), transparent:true, opacity:0.07, blending:THREE.AdditiveBlending }),
  ],[])
  const geo = useMemo(()=> new THREE.PlaneGeometry(12,12),[])

  useFrame((state)=>{
    const t = state.clock.getElapsedTime()
    if(!group.current) return
    group.current.children.forEach((m:any, i:number)=>{
      m.material.opacity = 0.06 + Math.sin(t*0.25 + i)*0.03
      m.lookAt(state.camera.position)
    })
  })

  return (
    <group ref={group}>
      {[...Array(7)].map((_,i)=>{
        const pos = new THREE.Vector3((Math.random()-0.5)*16, (Math.random()-0.5)*10, -8 - Math.random()*6)
        const mat = mats[i%2]
        return <mesh key={i} position={pos} geometry={geo} material={mat} />
      })}
    </group>
  )
}

function Asteroids({ count=100, radius=10 }:{ count?:number, radius?:number }){
  const group = useRef<THREE.Group>(null)
  const meshes = useMemo(()=>[...Array(count)].map(()=>({
    pos: new THREE.Vector3().setFromSphericalCoords(radius + Math.random()*3, Math.random()*Math.PI, Math.random()*Math.PI*2),
    rot: new THREE.Euler(Math.random()*Math.PI, Math.random()*Math.PI, 0),
    scale: 0.05 + Math.random()*0.12
  })),[count, radius])

  useFrame((_, dt)=>{
    if(!group.current) return
    group.current.children.forEach((m, i)=>{
      m.rotation.x += dt*(0.25 + (i%5)*0.06)
      m.rotation.y += dt*(0.32 + (i%7)*0.05)
      m.position.applyAxisAngle(new THREE.Vector3(0,1,0), dt*0.018)
    })
  })

  return (
    <group ref={group}>
      {meshes.map((m,i)=> (
        <mesh key={i} position={m.pos} rotation={m.rot}>
          <icosahedronGeometry args={[m.scale, 0]} />
          <meshStandardMaterial color={'#94a3b8'} metalness={0.35} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function ShootingStars(){
  const group = useRef<THREE.Group>(null)
  const trails = useMemo(()=>[...Array(10)].map(()=>({
    p: new THREE.Vector3((Math.random()-0.5)*14, 5+Math.random()*3, -8-Math.random()*4),
    v: new THREE.Vector3(-2 - Math.random()*2, -2 - Math.random()*1.5, 0),
    life: Math.random()*5
  })),[])

  useFrame((_, dt)=>{
    if(!group.current) return
    group.current.children.forEach((m:any, i:number)=>{
      const d = trails[i]
      d.life -= dt
      if(d.life <= 0){
        d.p.set((Math.random()-0.5)*14, 5+Math.random()*3, -8-Math.random()*4)
        d.v.set(-2 - Math.random()*2, -2 - Math.random()*1.5, 0)
        d.life = 4 + Math.random()*4
      }
      d.p.addScaledVector(d.v, dt)
      m.position.copy(d.p)
      m.scale.setScalar(0.03 + Math.random()*0.02)
    })
  })

  return (
    <group ref={group}>
      {trails.map((_,i)=> (
        <mesh key={i}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={'white'} />
        </mesh>
      ))}
    </group>
  )
}

function Comet(){
  const ref = useRef<THREE.Group>(null)
  const pos = useRef(new THREE.Vector3(-10, -4, -7))
  useFrame((_, dt)=>{
    pos.current.x += dt*1.0
    pos.current.y += dt*0.30
    if(pos.current.x > 11) { pos.current.set(-10, -4, -7) }
    if(ref.current) ref.current.position.copy(pos.current)
  })
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={'#e0f2fe'} />
      </mesh>
      <mesh position={[-0.9, -0.25, 0]}>
        <boxGeometry args={[1.8, 0.03, 0.03]} />
        <meshBasicMaterial color={'#93c5fd'} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
