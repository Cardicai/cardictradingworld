"use client"

import { useEffect, useRef, useState } from "react"

type ExternalAppFrameProps = {
  src: string
  title?: string
}

export default function ExternalAppFrame({ src, title }: ExternalAppFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      return
    }

    const timeout = window.setTimeout(() => {
      setIsBlocked(true)
      setIsLoading(false)
    }, 6000)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [isLoading])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) {
      return
    }

    const sendTheme = () => {
      const theme = document.documentElement.className
      const targetWindow = iframe.contentWindow
      if (!targetWindow) return

      try {
        targetWindow.postMessage(
          {
            type: "cardic-theme",
            value: theme,
          },
          "*",
        )
      } catch (error) {
        // ignored
      }
    }

    sendTheme()
    const interval = window.setInterval(sendTheme, 5000)

    return () => {
      window.clearInterval(interval)
    }
  }, [src])

  return (
    <div className="relative h-[calc(100vh-64px)] w-full">
      {!isBlocked && (
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          className="h-full w-full border-0"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => {
            setIsLoading(false)
            setIsBlocked(false)
          }}
        />
      )}

      {isLoading && !isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <div className="flex flex-col items-center gap-3 text-white">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-300/40 border-t-transparent" />
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-200/80">Initializing app…</p>
          </div>
        </div>
      )}

      {isBlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/80 px-6 text-center text-white">
          <div>
            <p className="text-lg font-semibold">This app can’t be embedded.</p>
            <p className="mt-2 text-sm text-white/70">
              It blocked loading inside the Cardic Nexus shell. Open it in a new tab to continue.
            </p>
          </div>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-300/60 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100 transition hover:border-cyan-200 hover:text-white"
          >
            Open in new tab
          </a>
        </div>
      )}
    </div>
  )
}
