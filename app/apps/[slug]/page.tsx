import ExternalAppFrame from "@/components/ExternalAppFrame"

const ALLOWLIST: Record<string, string> = {
  mentor: "https://cardicworld.vercel.app/",
  tools: "https://www.cardicnex.us/",
}

type AppShellPageProps = {
  params: {
    slug: string
  }
}

export default function AppShellPage({ params }: AppShellPageProps) {
  const slug = params.slug
  const url = ALLOWLIST[slug]

  const title = `Cardic • ${slug}`

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <header className="flex h-16 items-center justify-between border-b border-cyan-300/30 bg-black/80 px-6 backdrop-blur">
        <a href="/" className="text-xs font-semibold uppercase tracking-[0.5em] text-white/80 hover:text-white">
          Cardic Nexus
        </a>
        <span className="text-[0.65rem] uppercase tracking-[0.4em] text-cyan-200/70">Apps</span>
      </header>
      <div className="flex-1 bg-black">
        {url ? (
          <ExternalAppFrame src={url} title={title} />
        ) : (
          <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-lg font-semibold">Unknown app.</p>
            <p className="text-sm text-white/70">Check the URL or return to the hub.</p>
            <a
              href="/"
              className="mt-3 rounded-full border border-cyan-300/60 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100 transition hover:border-cyan-200 hover:text-white"
            >
              Back to hub
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
