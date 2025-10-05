"use client"

interface ExternalAppFrameProps {
  src: string
  title: string
}

export default function ExternalAppFrame({ src, title }: ExternalAppFrameProps) {
  return (
    <iframe
      src={src}
      title={title}
      allow="fullscreen"
      allowFullScreen
      className="block h-screen w-screen border-0"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  )
}
