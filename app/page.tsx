import SiteHeader from "@/components/SiteHeader";
import SidebarMenu from "@/components/SidebarMenu";
import WelcomeCenter from "@/components/WelcomeCenter";
import dynamic from "next/dynamic";

// Load R3F background only on client
const OrbitingUI = dynamic(() => import("@/components/OrbitingUI"), { ssr: false });

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <SidebarMenu />
      <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <WelcomeCenter />
      </section>
      <OrbitingUI />
    </main>
  );
}
