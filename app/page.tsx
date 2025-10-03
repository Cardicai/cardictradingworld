'use client'

import { useEffect } from 'react'
import OrbitingUI from '@/components/OrbitingUI'
import FocusDrawer from '@/components/FocusDrawer'
import SpaceScene from '@/components/SpaceScene'
import Toggle from '@/components/ui/Toggle'
import WelcomeCenter from '@/components/WelcomeCenter'

const BASE_ORBIT_SPEED = 0.35

export default function Page() {
  useEffect(() => {
    const root = document.documentElement
    let theta = Number(root.style.getPropertyValue('--theta')) || 0
    const initialSpeed = root.style.getPropertyValue('--orbit-speed')
    if (!initialSpeed) {
      root.style.setProperty('--orbit-speed', `${BASE_ORBIT_SPEED}`)
    }

    let frame = 0
    let last = performance.now()
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (reduceMotionQuery.matches) {
      root.style.setProperty('--orbit-speed', '0')
    }

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.12)
      last = now
      const speed = parseFloat(getComputedStyle(root).getPropertyValue('--orbit-speed') || '0')
      const effectiveSpeed = reduceMotionQuery.matches ? 0 : speed
      theta = (theta + effectiveSpeed * dt) % (Math.PI * 2)
      root.style.setProperty('--theta', `${theta}`)
      frame = window.requestAnimationFrame(step)
    }

    frame = window.requestAnimationFrame((now) => {
      last = now
      step(now)
    })

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        root.style.setProperty('--orbit-speed', '0')
      } else if (!document.documentElement.classList.contains('focus-active')) {
        root.style.setProperty('--orbit-speed', `${BASE_ORBIT_SPEED}`)
      }
    }

    reduceMotionQuery.addEventListener('change', handleMotionChange)

    return () => {
      window.cancelAnimationFrame(frame)
      reduceMotionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return (
    <main className="space-hub relative min-h-screen w-full overflow-hidden bg-black text-white touch-pan-y">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top,1rem))] sm:px-6">
        <h1 className="pointer-events-auto select-none text-balance font-extrabold tracking-[0.65rem] text-white/90" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>
          CARDIC NEXUS
          <span className="ml-3 text-[clamp(0.75rem,2.5vw,0.95rem)] font-medium uppercase tracking-[0.4rem] opacity-70">
            we build from vision to result · Space Hub
          </span>
        </h1>
        <div className="pointer-events-auto">
          <Toggle />
        </div>
      </header>

      <div className="space-hub-bg absolute inset-0" aria-hidden />
      <SpaceScene />
      <OrbitingUI />
      <FocusDrawer />
      <WelcomeCenter />
    </main>
  )
}
