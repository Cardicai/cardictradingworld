import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "CARDIC NEXUS — Trading Hub",
  description: "3D interactive portal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 min-h-screen bg-black text-white">
        {children}
      </body>
    </html>
  );
}
