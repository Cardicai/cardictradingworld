// app/page.tsx

import SiteHeader from "@/components/SiteHeader";

import SidebarMenu from "@/components/SidebarMenu";

import WelcomeCenter from "@/components/WelcomeCenter";

import dynamic from "next/dynamic";

const SpaceScene = dynamic(() => import("@/components/SpaceScene"), {
  ssr: false,
});

export default function HomePage() {

  return (

    <main className="relative min-h-screen w-full overflow-x-hidden">

      {/* Site chrome */}

      <SiteHeader />

      <SidebarMenu />

      {/* Landing / hero */}

      <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">

        <WelcomeCenter />

      </section>

      {/* Background / ornaments */}

      <SpaceScene />

    </main>

  );

}

