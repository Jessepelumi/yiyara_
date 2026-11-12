"use client";

import { useRef, useState } from "react";
import { CaretDoubleDownIcon } from "@phosphor-icons/react/dist/ssr";
import { GuestInput } from "./GuestInput";
import { SectionHeading } from "../../shared/SectionHeading";
import { ExamplePrompts } from "./ExamplePrompts";

export const Hero = ({ targetId }: { targetId: string }) => {
  const [ambition, setAmbition] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectExample = (text: string) => {
    if (isProcessing) return;
    setAmbition(text);
    window.requestAnimationFrame(() => {
      const input = inputRef.current;
      if (!input) return;
      input.focus({ preventScroll: true });
      input.setSelectionRange(text.length, text.length);
    });
  };

  const scrollToContent = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.getElementById(targetId)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative w-full min-h-dvh">
      <div className="min-h-dvh flex flex-col justify-center items-center space-y-5">
        <SectionHeading
          title="What Are You Aiming For?"
          description="Turn ambitions into actions you can follow through on"
          align="center"
        />

        <GuestInput
          value={ambition}
          onChange={setAmbition}
          inputRef={inputRef}
          isProcessing={isProcessing}
          onProcessingChange={setIsProcessing}
        />

        <ExamplePrompts onSelect={selectExample} disabled={isProcessing} />
      </div>

      <button
        type="button"
        onClick={scrollToContent}
        aria-label="Scroll to more content"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:bottom-6 flex min-h-11 items-center justify-end gap-2 rounded-full px-2 text-sm text-muted-foreground cursor-pointer transition-colors motion-reduce:transition-none hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span>Scroll Down</span>
        <span className="motion-safe:animate-bounce motion-safe:[animation-duration:1.8s]">
          <CaretDoubleDownIcon size={18} aria-hidden="true" />
        </span>
      </button>
    </section>
  );
};
