'use client'

import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Suspense, lazy, useEffect, useMemo, useState } from 'react'

const Globe = lazy(() => import('./Globe'))

export default function SpaceScene() {
  const [mounted, setMounted] = useState(false)
  const [compact, setCompact] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [dpr, setDpr] = useState(1)

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(max-width: 480px)')
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleCompact = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = event.matches
      setCompact(matches)
      const nextDpr = Math.min(window.devicePixelRatio || 1, matches ? 1.5 : 2.5)
      setDpr(nextDpr)
    }

    const handleMotion = (event: MediaQueryListEvent | MediaQueryList) => {
      setReducedMotion(event.matches)
    }

    handleCompact(mq)
    handleMotion(reduceMotionQuery)

    const compactListener = (event: MediaQueryListEvent) => handleCompact(event)
    const motionListener = (event: MediaQueryListEvent) => handleMotion(event)

    mq.addEventListener('change', compactListener)
    reduceMotionQuery.addEventListener('change', motionListener)

    return () => {
      mq.removeEventListener('change', compactListener)
      reduceMotionQuery.removeEventListener('change', motionListener)
    }
  }, [])

  const starCount = useMemo(() => (compact ? 1200 : 2400), [compact])
  const globeDetail = useMemo(() => (compact ? 48 : 112), [compact])

  if (!mounted) {
    return null
  }

  return (
    <Canvas
      className="space-scene pointer-events-none"
      camera={{ position: [0, 0, compact ? 9 : 8], fov: compact ? 62 : 55 }}
      dpr={dpr}
      data-focus-background="true"
    >
      <ambientLight intensity={compact ? 0.2 : 0.25} />
      <pointLight position={[5, 5, 5]} intensity={compact ? 0.9 : 1.15} />
      <pointLight position={[-5, -2, -3]} intensity={0.55} />
      {!reducedMotion && (
        <Stars
          radius={compact ? 70 : 100}
          depth={compact ? 40 : 55}
          count={starCount}
          factor={compact ? 1.5 : 2}
          saturation={0}
          fade
          speed={compact ? 0.2 : 0.3}
        />
      )}
      <Suspense fallback={null}>
        <Globe detail={globeDetail} />
      </Suspense>
    </Canvas>
  )
}
