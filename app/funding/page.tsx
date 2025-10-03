import Link from 'next/link'

export const metadata = {
  title: 'Funding · CARDIC Nexus',
  description: 'Fuel your mission through the CARDIC Funding portal.',
}

export default function FundingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-16 text-white">
      <div className="max-w-2xl text-center">
        <h1 className="text-balance text-3xl font-bold uppercase tracking-[0.5rem] text-white/90 sm:text-4xl">
          Funding Launchpad
        </h1>
        <p className="mt-6 text-base text-white/70 sm:text-lg">
          We are aligning strategic partners, grants, and growth capital to accelerate the CARDIC ecosystem. Share your
          vision and we will connect you with the right path forward.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="mailto:funding@cardicnexus.com"
            className="rounded-full border border-cyan-400/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35rem] text-white transition hover:border-cyan-300/70 hover:text-cyan-100"
          >
            Pitch Us
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35rem] text-white/80 transition hover:border-white/60 hover:text-white"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  )
}
