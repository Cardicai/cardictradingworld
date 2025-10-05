"use client";

import { useRouter } from "next/navigation";

export default function BackFab() {
  const router = useRouter();

  return (
    <button
      aria-label="Go back"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className="fixed left-3 top-3 z-50 h-10 w-10 rounded-full border border-cyan-300/50 bg-black/40 backdrop-blur-md
                text-white text-lg leading-none shadow-[0_0_12px_rgba(14,165,233,0.35)]"
    >
      ←
    </button>
  );
}
