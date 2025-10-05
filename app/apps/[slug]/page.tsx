import ExternalAppFrame from "@/components/ExternalAppFrame";
import { APP_ALLOWLIST } from "@/lib/app-allowlist";
import { notFound } from "next/navigation";
// import BackFab from "@/components/BackFab"; // enable if needed

interface ExternalAppPageProps {
  params: { slug: string };
}

export default function ExternalAppPage({ params }: ExternalAppPageProps) {
  const url = APP_ALLOWLIST[params.slug];
  if (!url) return notFound();

  const SHOW_BACK_BUTTON = false; // set true to show BackFab

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* {SHOW_BACK_BUTTON && <BackFab />} */}
      <ExternalAppFrame src={url} title={`Cardic • ${params.slug}`} />
    </div>
  );
}
