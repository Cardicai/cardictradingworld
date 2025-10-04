import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SidebarMenu from '@/components/SidebarMenu'
import ExternalAppFrame from '@/components/ExternalAppFrame'
import { APP_ALLOWLIST } from '@/lib/externalApps'
import { notFound } from 'next/navigation'

interface ExternalAppPageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: ExternalAppPageProps) {
  const app = APP_ALLOWLIST[params.slug]

  if (!app) {
    return {}
  }

  return {
    title: `${app.name} — CARDIC NEXUS`,
    description: `Docked experience for ${app.name} inside the CARDIC Space Hub.`,
  }
}

export default function ExternalAppPage({ params }: ExternalAppPageProps) {
  const app = APP_ALLOWLIST[params.slug]

  if (!app) {
    notFound()
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <SiteHeader />
      <SidebarMenu />

      <Link
        href="/"
        className="fixed left-3 top-2 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/60 bg-cyan-500/25 text-white shadow-[0_0_26px_rgba(34,211,238,0.45)] backdrop-blur transition hover:scale-105 hover:border-cyan-100/80 hover:bg-cyan-400/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
        aria-label="Return home"
      >
        <span className="text-lg font-semibold" aria-hidden>
          ←
        </span>
      </Link>

      <div
        className="fixed inset-x-0 bottom-0 z-30"
        style={{ top: 'var(--header-h, 64px)' }}
      >
        <ExternalAppFrame src={app.url} title={app.name} />
      </div>
    </main>
  )
}
