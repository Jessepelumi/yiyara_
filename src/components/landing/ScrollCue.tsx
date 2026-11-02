"use client";

import { CaretDoubleDownIcon } from "@phosphor-icons/react/dist/ssr";

export function ScrollCue({ targetId }: { targetId: string }) {
  const scrollToContent = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(targetId)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToContent}
      aria-label="Scroll to more content"
      className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:bottom-6 flex min-h-11 items-center justify-end gap-2 rounded-full px-2 text-sm text-muted-foreground cursor-pointer transition-colors motion-reduce:transition-none hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span>Scroll</span>
      <span className="motion-safe:animate-bounce motion-safe:[animation-duration:1.8s]">
        <CaretDoubleDownIcon size={18} aria-hidden="true" />
      </span>
    </button>
  );
}
