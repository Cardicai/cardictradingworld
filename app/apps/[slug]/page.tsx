import ExternalAppFrame from "@/components/ExternalAppFrame"
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

  return <ExternalAppFrame src={app.url} title={app.name} />
}
