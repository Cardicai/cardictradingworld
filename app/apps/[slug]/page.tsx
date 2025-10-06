// app/apps/[slug]/page.tsx
import ExternalAppShell from "@/components/ExternalAppShell"
import { APP_ALLOWLIST } from "@/lib/app-allowlist"
import { notFound } from "next/navigation"

interface ExternalAppPageProps {
  params: {
    slug: string
  }
}

export default function ExternalAppPage({ params }: ExternalAppPageProps) {
  const app = APP_ALLOWLIST[params.slug]

  if (!app) {
    notFound()
  }

  return <ExternalAppShell src={app.url} title={app.name} />
}
