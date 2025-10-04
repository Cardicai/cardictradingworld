// @ts-nocheck
'use client'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import { useCameraFocus } from '@/components/camera/store'
import { LABELS, LINKS } from '@/components/data/nav'
import { useUI } from '@/components/ui/store'
import { useRouter } from 'next/navigation'

export default function OrbitingUI(){
  const group = useRef<THREE.Group>(null)
  const t0 = useMemo(()=>Math.random()*1000,[])
  const animationSpeed = useUI((s) => s.animationSpeed)
  const timeRef = useRef(0)

  useFrame((state, delta)=>{
    timeRef.current += delta * animationSpeed
    const t = timeRef.current + t0
    if(!group.current) return
    const L = LABELS.length
    group.current.children.forEach((child, i)=>{
      const ring = i % 2
      const baseR = 5.0
      const r = baseR + (ring ? 0.8 : -0.2)
      const speed = 0.22 + (i*0.017)
      const phase = (i*(Math.PI*2/L)) + (ring ? Math.PI/L : 0)
      const a = t*speed + phase
      const y = Math.sin(t*0.45 + i)*0.45
      child.position.set(Math.cos(a)*r, y, Math.sin(a)*r)
      child.lookAt(0,0,0)
    })
  })

  return (
    <group ref={group}>
      {LABELS.map((text)=> (
        <Button3D key={text} text={text} href={LINKS[text] || '#'} />
      ))}
    </group>
  )
}

function Button3D({ text, href }:{ text:string, href:string }){
  const [hover, setHover] = useState(false)
  const buttonRef = useRef<THREE.Group>(null)
  const focus = useCameraFocus(s=>s.focusTo)
  const router = useRouter()

  const handleClick = ()=>{
    const p = buttonRef.current?.getWorldPosition(new THREE.Vector3()) ?? new THREE.Vector3(0,0,0)
    focus([p.x, p.y, p.z])
    setTimeout(()=>{
      if (!href || href === '#') {
        alert('Coming soon')
        return
      }

      if (href.startsWith('/')) {
        router.push(href)
      } else {
        window.open(href, '_blank')
      }
    }, 400)
  }

  return (
    <group ref={buttonRef}>
      <Html center occlude distanceFactor={8} sprite>
        <button
          onMouseEnter={()=>setHover(true)}
          onMouseLeave={()=>setHover(false)}
          onClick={handleClick}
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
