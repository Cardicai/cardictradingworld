
'use client'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { useCameraFocus } from '@/components/camera/store'

const LABELS = [
  'TOOL','AI MENTOR','CLUB','GAME','COMMUNITY','PROJECTS','AI ANALYST','NEWS','REWARD HUB','ADMIN SEC','ZiRAN'
]

// Map each button to a URL (external). Update these later.
const LINKS: Record<string,string> = {
  'TOOL': 'https://example.com/tool',
  'AI MENTOR': 'https://example.com/mentor',
  'CLUB': 'https://example.com/club',
  'GAME': 'https://example.com/game',
  'COMMUNITY': 'https://t.me/cardicnexus',
  'PROJECTS': 'https://example.com/projects',
  'AI ANALYST': 'https://example.com/analyst',
  'NEWS': 'https://example.com/news',
  'REWARD HUB': 'https://example.com/rewards',
  'ADMIN SEC': 'https://example.com/admin',
  'ZiRAN': 'https://example.com/ziran'
}

export default function OrbitingUI(){
  const group = useRef<THREE.Group>(null)
  const t0 = useMemo(()=>Math.random()*1000,[])
  const focus = useCameraFocus(s=>s.focusTo)

  useFrame((state)=>{
    const t = state.clock.getElapsedTime() + t0
    if(!group.current) return
    group.current.children.forEach((child, i)=>{
      const r = 3 + (i%2===0?0.6:-0.4) // radius
      const speed = 0.25 + (i*0.02)
      const a = t*speed + i*(Math.PI*2/LABELS.length)
      const y = Math.sin(t*0.6 + i)*0.25
      child.position.set(Math.cos(a)*r, y, Math.sin(a)*r)
      child.lookAt(0,0,0)
    })
  })

  return (
    <group ref={group}>
      {LABELS.map((text, i)=> (
        <Button3D key={text} text={text} href={LINKS[text]} idx={i} onFocus={focus} />
      ))}
    </group>
  )
}

function Button3D({ text, href, idx, onFocus }:{ text:string, href:string, idx:number, onFocus:(pos:[number,number,number])=>void }){
  const [hover, setHover] = useState(false)
  const buttonRef = useRef<THREE.Group>(null)

  return (
    <group ref={buttonRef}>
      <Html center occlude distanceFactor={6} transform>
        <button
          onMouseEnter={()=>setHover(true)}
          onMouseLeave={()=>setHover(false)}
          onClick={()=>{
            // Camera focus first, then open link (feel free to delay if you want a longer zoom)
            const p = buttonRef.current?.getWorldPosition(new THREE.Vector3()) ?? new THREE.Vector3(0,0,0)
            onFocus([p.x, p.y, p.z])
            setTimeout(()=>{ if(href) window.open(href, '_blank') }, 600)
          }}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide backdrop-blur border 
            ${hover? 'scale-[1.06] shadow-glow' : 'scale-100'}
            transition-all duration-200
            border-cyan-300/40 text-white
            bg-gradient-to-r from-cardic.blue/20 via-transparent to-cardic.violet/20
          `}
          style={{ boxShadow: hover? '0 0 20px rgba(34,211,238,0.5), 0 0 40px rgba(139,92,246,0.35)': '0 0 10px rgba(14,165,233,0.15)'}}
        >
          {text}
        </button>
      </Html>
    </group>
  )
}
