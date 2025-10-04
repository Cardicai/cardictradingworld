'use client'

import { useEffect, useRef, useState } from 'react'

interface ExternalAppFrameProps {
  src: string
  title: string
}

const BLOCK_TIMEOUT = 8000

export default function ExternalAppFrame({ src, title }: ExternalAppFrameProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isBlocked, setIsBlocked] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setIsBlocked(false)

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsBlocked(true)
      setIsLoading(false)
    }, BLOCK_TIMEOUT)

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [src])

  const handleLoad = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
    setIsLoading(false)
    setIsBlocked(false)
  }

  const handleError = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
    setIsBlocked(true)
    setIsLoading(false)
  }

  return (
    <div className="relative h-full w-full">
      {!isBlocked && (
        <iframe
          key={src}
          src={src}
          title={title}
          onLoad={handleLoad}
          onError={handleError}
          className="h-full w-full rounded-[1.75rem] bg-transparent"
          allow="clipboard-write; fullscreen; accelerometer; magnetometer; gyroscope"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}

      {isLoading && !isBlocked && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-[1.75rem] bg-black/70 backdrop-blur">
          <div className="flex flex-col items-center gap-3 text-cyan-100">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-200/40 border-t-cyan-200" aria-hidden />
            <p className="text-sm font-medium tracking-wide text-cyan-100/80">Connecting to {title}…</p>
          </div>
        </div>
      )}

      {isBlocked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-cyan-400/40 bg-black/80 p-8 text-center text-cyan-50">
          <p className="text-base font-semibold">We couldn't display {title} inside Space Hub.</p>
          <p className="text-sm text-cyan-100/70">
            The app may block embedding in other sites. You can still open it in a new tab to continue.
          </p>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-300/60 bg-cyan-500/20 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-cyan-100 hover:bg-cyan-500/35"
          >
            Open in new tab
          </a>
        </div>
      )}
    </div>
  )
}
