import './globals.css'

export const metadata = {
  title: 'CARDIC NEXUS — Space Hub',
  description: '3D interactive portal',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5,
  viewportFit: 'cover' as const,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
