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
    <main className="relative flex min-h-screen w-full flex-col bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.25),transparent_55%)]" aria-hidden />

      <SiteHeader />

      <div
        className="relative z-10 flex flex-1 flex-col"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 6.5rem)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)',
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 sm:px-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">Docked Application</p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">{app.name}</h1>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <ExternalAppFrame src={app.url} title={app.name} />
          </div>
        </div>
      </div>

      <SidebarMenu />
    </main>
  )
}
