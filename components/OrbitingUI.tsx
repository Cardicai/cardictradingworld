'use client'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { useCameraFocus } from '@/components/camera/store'
import { LABELS, LINKS } from '@/components/data/nav'

export const ORBIT_ITEMS = LABELS.map((label) => ({
  label,
  href: LINKS[label] ?? '#',
}))

export default function OrbitingUI({ docked = false }: { docked?: boolean }){
  const group = useRef<THREE.Group>(null)
  const t0 = useMemo(()=>Math.random()*1000,[])
  const focus = useCameraFocus(s=>s.focusTo)

  useFrame((state)=>{
    if (docked) return
    const t = state.clock.getElapsedTime() + t0
    if(!group.current) return
    const L = ORBIT_ITEMS.length
    group.current.children.forEach((child, i)=>{
      const ring = i % 2            // two rings interleaved
      const baseR = 5.0             // wider radius (was ~4.2)
      const r = baseR + (ring ? 0.8 : -0.2)
      const speed = 0.22 + (i*0.017)
      const phase = (i*(Math.PI*2/L)) + (ring ? Math.PI/L : 0)
      const a = t*speed + phase
      const y = Math.sin(t*0.45 + i)*0.45   // slight vertical bob
      child.position.set(Math.cos(a)*r, y, Math.sin(a)*r)
      child.lookAt(0,0,0)
    })
  })
  if (docked) return null

  return (
    <group ref={group}>
      {ORBIT_ITEMS.map(({ label, href })=> (
        <Button3D key={label} text={label} href={href} onFocus={focus} />
      ))}
    </group>
  )
}

function Button3D({ text, href, onFocus }:{
  text:string, href:string, onFocus:(pos:[number,number,number])=>void
}){
  const [hover, setHover] = useState(false)
  const buttonRef = useRef<THREE.Group>(null)

  return (
    <group ref={buttonRef}>
      {/* sprite billboard -> never upside down; distanceFactor controls on-screen size */}
      <Html center occlude distanceFactor={8} sprite>
        <button
          onMouseEnter={()=>setHover(true)}
          onMouseLeave={()=>setHover(false)}
          onClick={()=>{
            const p = buttonRef.current?.getWorldPosition(new THREE.Vector3()) ?? new THREE.Vector3(0,0,0)
            onFocus([p.x, p.y, p.z])
            setTimeout(()=>{
              if(href && href !== '#'){
                window.open(href, '_blank')
              } else {
                window.alert('Coming Soon')
              }
            }, 500)
          }}
          className={`px-6 md:px-8 py-3 md:py-3.5 rounded-full text-base md:text-lg font-extrabold tracking-wide backdrop-blur border
            ${hover? 'scale-[1.08] shadow-glow' : 'scale-100'}
            transition-all duration-200
            border-cyan-300/40 text-white
            bg-gradient-to-r from-cardic.blue/35 via-transparent to-cardic.violet/35`}
          style={{ boxShadow: hover? '0 0 28px rgba(34,211,238,0.55), 0 0 60px rgba(139,92,246,0.4)' : '0 0 14px rgba(14,165,233,0.18)'}}
        >
          {text}
        </button>
      </Html>
    </group>
  )
}
