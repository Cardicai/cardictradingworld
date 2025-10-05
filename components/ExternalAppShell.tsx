'use client'

import { useEffect } from 'react'
import ExternalAppFrame from '@/components/ExternalAppFrame'
import { useUI } from '@/components/ui/store'

interface ExternalAppShellProps {
  src: string
  title: string
}

export default function ExternalAppShell({ src, title }: ExternalAppShellProps) {
  const setSidebar = useUI((s) => s.setSidebar)
  const setAnimationSpeed = useUI((s) => s.setAnimationSpeed)

  useEffect(() => {
    // Ensure the orbit UI is reset when leaving the hub experience.
    setSidebar(false)
    setAnimationSpeed(1)
  }, [setAnimationSpeed, setSidebar])

  useEffect(() => {
    const { body } = document
    const previousOverflow = body.style.overflow

    body.classList.add('external-app-view')
    body.style.overflow = 'auto'

    return () => {
      body.classList.remove('external-app-view')
      body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black text-white">
      <ExternalAppFrame src={src} title={title} />
    </div>
  )
}
