import type { ReactNode } from "react";
import "./globals.css";
import LayoutChrome from "@/components/LayoutChrome";

export const metadata = {
  title: "CARDIC NEXUS — Trading Hub",
  description: "3D interactive portal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 bg-black text-white">
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
