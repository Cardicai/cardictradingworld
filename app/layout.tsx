import "./globals.css";

export const metadata = {
  title: "CARDIC NEXUS — Space Hub",
  description: "3D interactive portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
