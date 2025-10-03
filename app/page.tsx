'use client'

import { useEffect } from 'react'
import OrbitingUI from '@/components/OrbitingUI'
import FocusDrawer from '@/components/FocusDrawer'
import SpaceScene from '@/components/SpaceScene'
import Toggle from '@/components/ui/Toggle'
import WelcomeCenter from '@/components/WelcomeCenter'

const DEFAULT_ORBIT_SPEED = 1

export default function Page() {
  useEffect(() => {
    const root = document.documentElement
    const computed = getComputedStyle(root)
    let theta = parseFloat(computed.getPropertyValue('--theta') || '0')
    if (!Number.isFinite(theta)) {
      theta = 0
    }

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const ensureSpeed = () => {
      const raw = getComputedStyle(root).getPropertyValue('--orbit-speed')
      const parsed = parseFloat(raw)
      if (!Number.isFinite(parsed)) {
        root.style.setProperty('--orbit-speed', `${DEFAULT_ORBIT_SPEED}`)
        return DEFAULT_ORBIT_SPEED
      }
      if (
        parsed <= 0 &&
        !document.documentElement.classList.contains('focus-active') &&
        !reduceMotionQuery.matches
      ) {
        root.style.setProperty('--orbit-speed', `${DEFAULT_ORBIT_SPEED}`)
        return DEFAULT_ORBIT_SPEED
      }
      return parsed
    }

    if (!root.style.getPropertyValue('--orbit-speed')) {
      root.style.setProperty('--orbit-speed', `${DEFAULT_ORBIT_SPEED}`)
    }

    let frame = 0
    let last = performance.now()
    if (reduceMotionQuery.matches) {
      root.style.setProperty('--orbit-speed', '0')
    }

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.12)
      last = now
      const speed = reduceMotionQuery.matches ? 0 : ensureSpeed()
      theta = (theta + dt * speed) % (Math.PI * 2)
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
        const speed = ensureSpeed()
        if (speed <= 0) {
          root.style.setProperty('--orbit-speed', `${DEFAULT_ORBIT_SPEED}`)
        }
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
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top,1rem))] sm:px-6">
        <h1
          className="pointer-events-auto select-none text-balance font-extrabold uppercase tracking-[0.45em] text-white"
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
            textShadow: '0 0 24px rgba(56,189,248,0.35)',
          }}
        >
          Cardic Nexus
          <span className="ml-3 text-[clamp(0.75rem,2.4vw,1rem)] font-medium uppercase tracking-[0.26em] text-white/70">
            We build from vision to result · Space Hub
          </span>
        </h1>
        <div className="pointer-events-auto">
          <Toggle />
        </div>
      </header>

      <div className="space-hub-bg absolute inset-0" aria-hidden data-focus-background="true" />
      <SpaceScene />
      <OrbitingUI />
      <FocusDrawer />
      <WelcomeCenter />
    </main>
  )
}
