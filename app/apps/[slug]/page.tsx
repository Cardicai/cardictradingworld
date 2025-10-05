import ExternalAppFrame from "@/components/ExternalAppFrame"
import { APP_ALLOWLIST } from "@/lib/app-allowlist"
import { notFound } from "next/navigation"

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
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black text-white">
      <ExternalAppFrame src={app.url} title={app.name} />
    </div>
  )
}
