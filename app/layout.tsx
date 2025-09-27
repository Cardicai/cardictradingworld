
export const metadata = { title: 'CARDIC NEXUS — Space Hub', description: '3D interactive portal' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
