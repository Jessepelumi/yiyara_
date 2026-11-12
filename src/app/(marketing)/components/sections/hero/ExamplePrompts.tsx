"use client";

import { useState } from "react";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { EXAMPLE_PROMPTS } from "@/data/example-prompts";

interface ExamplePromptsProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const PROMPT_KEYS = Object.keys(EXAMPLE_PROMPTS);
const DESKTOP_COUNT = 3;
const MOBILE_COUNT = 2;

export function ExamplePrompts({ onSelect, disabled = false }: ExamplePromptsProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleKeys = Array.from(
    { length: DESKTOP_COUNT },
    (_, index) => PROMPT_KEYS[(startIndex + index) % PROMPT_KEYS.length],
  );

  const refresh = () => {
    const count = window.matchMedia("(min-width: 640px)").matches
      ? DESKTOP_COUNT
      : MOBILE_COUNT;
    setStartIndex((index) => (index + count) % PROMPT_KEYS.length);
  };

  return (
    <section
      aria-labelledby="example-prompts-heading"
      className="w-[calc(100%-2rem)] max-w-2xl min-w-0 space-y-2"
    >
      <div className="flex justify-center items-center gap-1 text-muted-foreground">
        <p id="example-prompts-heading" className="text-xs sm:text-sm">
          Start with an example prompt
        </p>
        <button
          type="button"
          onClick={refresh}
          disabled={disabled}
          aria-label="Show more example prompts"
          title="Show more example prompts"
          className="size-11 shrink-0 rounded-full flex justify-center items-center transition-colors motion-reduce:transition-none enabled:cursor-pointer enabled:hover:bg-card enabled:hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ArrowsClockwiseIcon size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" aria-live="polite" aria-atomic="true">
        {visibleKeys.map((key, index) => {
          const example = EXAMPLE_PROMPTS[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(example.text)}
              disabled={disabled}
              className={`${index === MOBILE_COUNT ? "hidden sm:flex" : "flex"} min-h-11 min-w-0 items-center justify-center border-[0.5px] sm:border border-border bg-card text-foreground rounded-xl px-3 py-2.5 text-center text-xs sm:text-sm transition-colors motion-reduce:transition-none enabled:cursor-pointer enabled:hover:border-primary enabled:hover:bg-accent enabled:hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
            >
              {example.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
