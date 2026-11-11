"use client";

import { GuestInput } from "@/components/landing/GuestInput";
import { useRef, useState } from "react";
import { ExamplePrompts } from "@/components/landing/ExamplePrompts";
import { ScrollCue } from "@/components/landing/ScrollCue";
import { PhilosophyGrid } from "@/components/landing/PhilosophyGrid";
import { UserJourney } from "@/components/landing/UserJourney";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
//import Image from "next/image";

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
    <div>
      {/* <section>
        <div className="flex justify-between">
          <div>
            <div>
              <Image src="/yiyara-logo.png" alt="logo" width={40} height={40} />
            </div>
            <h1>Yiyara</h1>
          </div>

          <div>Nav links</div>

          <div>Button</div>
        </div>
      </section> */}

      <section className="relative w-full min-h-dvh">
        <div className="min-h-dvh flex flex-col justify-center items-center space-y-5 py-20">
          <div className="text-center space-y-1.5 lg:space-y-3.5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
              What Are You Aiming For?
            </h1>
            <p className="text-muted-foreground text-xs sm:text-base">
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

      <article className="pb-10 space-y-16 sm:space-y-24 lg:space-y-36">
        <section
          id="landing-content"
          className="pt-10 space-y-5.5 lg:space-y-7.5"
        >
          <div className="flex flex-col items-center text-center space-y-1.5 lg:space-y-3.5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
              Say Hello to <span className="text-primary">Yiyara</span>
            </h1>
            <p className="max-w-xl px-5 text-muted-foreground text-xs sm:text-base lg:max-w-2xl lg:px-0">
              Yiyara is here to walk alongside you,{" "}
              <span className="text-primary">
                bringing clarity to your ambitions
              </span>
              , helping you make sense of the steps ahead and turning your
              intentions into meaningful action. One step at a time, until you
              get there.
            </p>

            <Link
              href=""
              className="group flex w-fit items-center gap-1 border-b border-primary pb-0.5 text-xs  transition-colors duration-200 hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:border-b-[1.5px] lg:text-base"
            >
              Read the Yiyara Story
              <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
            </Link>
          </div>

          <PhilosophyGrid />
        </section>

        <section className="mx-auto max-w-7xl px-5 lg:px-0 space-y-5.5 lg:space-y-7.5">
          <div className="space-y-1.5 lg:space-y-3.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
              From Ambition to Action
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base">
              The Yiyara experience in three simple steps
            </p>
          </div>

          <UserJourney />
        </section>

        <section className="mx-auto max-w-7xl px-5 space-y-5.5 lg:space-y-7.5">
          <div className="mx-auto max-w-2xl text-center space-y-1.5 lg:space-y-3.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
              Beyond the Plan
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base">
              Everything you need to bring clarity to your ambitions, make
              meaningful progress and stay intentional along the way.
            </p>
          </div>

          <FeatureGrid />
        </section>

        <section className="flex flex-col items-center mx-auto max-w-7xl px-5 space-y-5.5 lg:space-y-7.5">
          <div className="mx-auto max-w-2xl text-center space-y-1.5 lg:space-y-3.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
              The Time is Now!
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base">
              Partner with Yiyara to reach your destination.
            </p>
          </div>

          <Link
            href="#"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-[background-color] duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:px-6 sm:text-base"
          >
            Get Started
            <ArrowRightIcon
              size={18}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
            />
          </Link>
        </section>
      </article>
    </div>
  );
}
