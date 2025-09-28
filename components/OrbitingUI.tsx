'use client'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { useCameraFocus } from '@/components/camera/store'

const LABELS = [
  'TOOL','AI MENTOR','CLUB','GAME','COMMUNITY','PROJECTS','AI ANALYST','NEWS','REWARD HUB','ADMIN SEC','ZiRAN'
]

// Map to your real URLs later
const LINKS: Record<string,string> = {
  'TOOL': '#',
  'AI MENTOR': '#',
  'CLUB': '#',
  'GAME': '#',
  'COMMUNITY': 'https://t.me/cardicnexus',
  'PROJECTS': '#',
  'AI ANALYST': '#',
  'NEWS': '#',
  'REWARD HUB': '#',
  'ADMIN SEC': '#',
  'ZiRAN': '#'
}

export default function OrbitingUI(){
  const group = useRef<THREE.Group>(null)
  const t0 = useMemo(()=>Math.random()*1000,[])
  const focus = useCameraFocus(s=>s.focusTo)

  useFrame((state)=>{
    const t = state.clock.getElapsedTime() + t0
    if(!group.current) return
    const L = LABELS.length
    group.current.children.forEach((child, i)=>{
      const r = 4.2 + (i%2===0?0.9:-0.5)   // wider ring
      const speed = 0.22 + (i*0.018)
      const a = t*speed + i*(Math.PI*2/L)
      const y = Math.sin(t*0.55 + i)*0.35
      child.position.set(Math.cos(a)*r, y, Math.sin(a)*r)
      child.lookAt(0,0,0)
    })
  })

  return (
    <group ref={group}>
      {LABELS.map((text)=> (
        <Button3D key={text} text={text} href={LINKS[text]} onFocus={focus} />
      ))}
    </group>
  )
}

function Button3D({ text, href, onFocus }:{ text:string, href:string, onFocus:(pos:[number,number,number])=>void }){
  const [hover, setHover] = useState(false)
  const buttonRef = useRef<THREE.Group>(null)

  return (
    <group ref={buttonRef}>
      <Html center occlude distanceFactor={5.5} transform>
        <button
          onMouseEnter={()=>setHover(true)}
          onMouseLeave={()=>setHover(false)}
          onClick={()=>{
            const p = buttonRef.current?.getWorldPosition(new THREE.Vector3()) ?? new THREE.Vector3(0,0,0)
            onFocus([p.x, p.y, p.z])
            setTimeout(()=>{ if(href && href !== '#') window.open(href, '_blank') }, 500)
          }}
          className={`px-5 md:px-7 py-2.5 md:py-3.5 rounded-full text-sm md:text-base font-bold tracking-wide backdrop-blur border
            ${hover? 'scale-[1.08] shadow-glow' : 'scale-100'}
            transition-all duration-200
            border-cyan-300/40 text-white
            bg-gradient-to-r from-cardic.blue/30 via-transparent to-cardic.violet/30`}
          style={{ boxShadow: hover? '0 0 28px rgba(34,211,238,0.55), 0 0 60px rgba(139,92,246,0.4)' : '0 0 14px rgba(14,165,233,0.18)'}}
        >
          {text}
        </button>
      </Html>
    </group>
  )
}
