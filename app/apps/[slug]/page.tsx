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
    <main className="h-screen w-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 z-0">
        <ExternalAppFrame src={app.url} title={app.name} />
      </div>
    </main>
  )
}
