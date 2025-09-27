
'use client'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Aurora from '@/components/Aurora'
import Satellites from '@/components/Satellites'

export default function SceneFX(){
  return (
    <group>
      <Nebula />
      <Asteroids count={120} radius={9} />
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
    new THREE.MeshBasicMaterial({ color: new THREE.Color('#22d3ee'), transparent:true, opacity:0.06, blending:THREE.AdditiveBlending }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color('#8b5cf6'), transparent:true, opacity:0.05, blending:THREE.AdditiveBlending }),
  ],[])
  const geo = useMemo(()=> new THREE.PlaneGeometry(8,8),[])

  useFrame((state)=>{
    const t = state.clock.getElapsedTime()
    if(!group.current) return
    group.current.children.forEach((m:any, i:number)=>{
      m.material.opacity = 0.05 + Math.sin(t*0.3 + i)*0.025
      m.lookAt(state.camera.position)
    })
  })

  return (
    <group ref={group}>
      {[...Array(6)].map((_,i)=>{
        const pos = new THREE.Vector3((Math.random()-0.5)*12, (Math.random()-0.5)*6, -6 - Math.random()*4)
        const mat = mats[i%2]
        return (
          <mesh key={i} position={pos} geometry={geo} material={mat} />
        )
      })}
    </group>
  )
}

function Asteroids({ count=60, radius=8 }:{ count?:number, radius?:number }){
  const group = useRef<THREE.Group>(null)
  const meshes = useMemo(()=>
    [...Array(count)].map(()=>({
      pos: new THREE.Vector3().setFromSphericalCoords(radius + Math.random()*2, Math.random()*Math.PI, Math.random()*Math.PI*2),
      rot: new THREE.Euler(Math.random()*Math.PI, Math.random()*Math.PI, 0),
      scale: 0.03 + Math.random()*0.08
    })),[count, radius]
  )

  useFrame((_, dt)=>{
    if(!group.current) return
    group.current.children.forEach((m, i)=>{
      m.rotation.x += dt*(0.2 + (i%5)*0.05)
      m.rotation.y += dt*(0.3 + (i%7)*0.04)
      m.position.applyAxisAngle(new THREE.Vector3(0,1,0), dt*0.02)
    })
  })

  return (
    <group ref={group}>
      {meshes.map((m,i)=> (
        <mesh key={i} position={m.pos} rotation={m.rot}>
          <icosahedronGeometry args={[m.scale, 0]} />
          <meshStandardMaterial color={'#94a3b8'} metalness={0.3} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function ShootingStars(){
  const group = useRef<THREE.Group>(null)
  const trails = useMemo(()=>
    [...Array(12)].map(()=>({
      p: new THREE.Vector3((Math.random()-0.5)*10, 4+Math.random()*2, -6-Math.random()*3),
      v: new THREE.Vector3(-2 - Math.random()*2, -2 - Math.random()*1.5, 0),
      life: Math.random()*5
    })),[])

  useFrame((_, dt)=>{
    if(!group.current) return
    group.current.children.forEach((m:any, i:number)=>{
      const data = trails[i]
      data.life -= dt
      if(data.life <= 0){
        data.p.set((Math.random()-0.5)*10, 4+Math.random()*2, -6-Math.random()*3)
        data.v.set(-2 - Math.random()*2, -2 - Math.random()*1.5, 0)
        data.life = 4 + Math.random()*4
      }
      data.p.addScaledVector(data.v, dt)
      m.position.copy(data.p)
      m.scale.setScalar(0.02 + Math.random()*0.02)
    })
  })

  return (
    <group ref={group}>
      {trails.map((_,i)=> (
        <mesh key={i}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={'white'} />
        </mesh>
      ))}
    </group>
  )
}

function Comet(){
  const ref = useRef<THREE.Group>(null)
  const pos = useRef(new THREE.Vector3(-8, -3, -6))
  useFrame((_, dt)=>{
    pos.current.x += dt*1.2
    pos.current.y += dt*0.35
    if(pos.current.x > 9) { pos.current.set(-8, -3, -6) }
    if(ref.current) ref.current.position.copy(pos.current)
  })
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color={'#e0f2fe'} />
      </mesh>
      {/* trail */}
      <mesh position={[-0.6, -0.2, 0]}>
        <boxGeometry args={[1.2, 0.02, 0.02]} />
        <meshBasicMaterial color={'#93c5fd'} transparent opacity={0.6} />
      </mesh>
    </group>
  )
}
