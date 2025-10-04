'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SidebarMenu from '@/components/SidebarMenu'
import WelcomeCenter from '@/components/WelcomeCenter'
import BackFab from '@/components/BackFab'
import { isMinimalRoute } from '@/lib/minimalRoutes'

interface LayoutChromeProps {
  children: ReactNode
}

export default function LayoutChrome({ children }: LayoutChromeProps) {
  const pathname = usePathname() ?? ''
  const minimal = isMinimalRoute(pathname)

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black text-white">
      {minimal ? <BackFab /> : <SiteChrome />}
      {children}
      {!minimal && <SidebarMenu />}
    </div>
  )
}

function SiteChrome() {
  return (
    <>
      <SiteHeader />
      <WelcomeCenter />
    </>
  )
}
