
// app/apps/[slug]/page.tsx

"use client";

import type { Metadata } from "next";

import { notFound } from "next/navigation";

import ExternalAppFrame from "@/components/ExternalAppFrame";

import { APP_ALLOWLIST } from "@/lib/app-allowlist";

interface ExternalAppPageProps {

  params: { slug: string };

}

/**

 * Optional: nice tab titles for each embedded app.

 * If you don't need this, you can remove generateMetadata and the Metadata import.

 */

export function generateMetadata(

  { params }: ExternalAppPageProps

): Metadata {

  const url = APP_ALLOWLIST[params.slug];

  if (!url) {

    return { title: "Not found • Cardic" };

  }

  return {

    title: `Cardic • ${params.slug}`,

    description: `Docked experience for ${params.slug} inside the CARDIC Space Hub.`,

  };

}

export default function ExternalAppPage({ params }: ExternalAppPageProps) {

  const url = APP_ALLOWLIST[params.slug];

  if (!url) return notFound();

  // Minimal docked view: edge-to-edge embed, no header/sidebar/back button.

  return (

    <div className="fixed inset-0 w-screen h-screen overflow-hidden">

      <ExternalAppFrame src={url} title={`Cardic • ${params.slug}`} />

    </div>

  );

}

