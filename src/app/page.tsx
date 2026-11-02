"use client";

import { GuestInput } from "@/components/landing/GuestInput";
import { useRef, useState } from "react";
import { ExamplePrompts } from "@/components/landing/ExamplePrompts";
import { ScrollCue } from "@/components/landing/ScrollCue";

export default function AppHome() {
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

  return (
    <main>
      <section className="relative w-full min-h-dvh">
        <div className="min-h-dvh flex flex-col justify-center items-center space-y-5 py-20">
          <div className="space-y-1.5 lg:space-y-3.5">
            <h1 className="text-center text-3xl lg:text-5xl font-medium">
              What are you aiming for?
            </h1>
            <p className="text-center text-muted-foreground text-xs lg:text-base">
              Turn ambitions into actions you can follow through on
            </p>
          </div>

          <GuestInput
            value={ambition}
            onChange={setAmbition}
            inputRef={inputRef}
            isProcessing={isProcessing}
            onProcessingChange={setIsProcessing}
          />
          <ExamplePrompts onSelect={selectExample} disabled={isProcessing} />

        </div>
        <ScrollCue targetId="landing-content" />
      </section>

      <div id="landing-content">The rest of the page under the main section</div>
    </main>
  );
}
