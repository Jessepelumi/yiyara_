import {
  PlayIcon,
  LightbulbIcon,
  LightningIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";

interface UserJourneyData {
  title: string;
  description: string;
  Icon: ComponentType<{ size?: number; weight?: "regular" | "bold" }>;
}

const userJourney: UserJourneyData[] = [
  {
    title: "Tell Yiyara what you want to achieve.",
    description:
      "Bring your ambitions, big or small. Yiyara helps you clarify what you're aiming for.",
    Icon: PlayIcon,
  },
  {
    title: "Make sense of the steps ahead.",
    description:
      "Yiyara helps break your ambitions into manageable steps, realistic timelines and actionable plans.",
    Icon: LightbulbIcon,
  },
  {
    title: "Make progress, one step at a time.",
    description:
      "Put your plans into action, track your progress and adapt when life doesn't go according to plan.",
    Icon: LightningIcon,
  },
];

function JourneyElement({
  title,
  description,
  Icon,
  index,
}: UserJourneyData & { index: number }) {
  return (
    <article
      className={`relative flex gap-5 sm:block sm:text-center ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div className="relative z-10 flex shrink-0 flex-col items-center sm:mx-auto sm:w-fit">
        <div className="flex size-15 items-center justify-center rounded-full border-[0.5px] border-primary bg-card text-primary shadow-sm sm:size-18">
          <Icon size={25} aria-hidden="true" />
        </div>
      </div>

      <div
        className={`pb-6 pt-1 sm:pb-0 sm:pt-7 ${
          index % 2 === 0 ? "text-left" : "text-right"
        } sm:text-center`}
      >
        <h3 className="text-base font-medium leading-snug sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}

function MobileConnector({ direction }: { direction: "right" | "left" }) {
  const path =
    direction === "right"
      ? "M 0 0 C 0 38 100 10 100 48"
      : "M 100 0 C 100 38 0 10 0 48";

  return (
    <svg
      viewBox="0 0 100 48"
      preserveAspectRatio="none"
      className="my-1 ml-8 block h-24 w-[calc(100%-4rem)] sm:hidden"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={path}
        className="stroke-primary"
        strokeWidth="0.4"
        strokeDasharray="0.6"
      />
    </svg>
  );
}

export function UserJourney() {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 100 22"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 top-0 hidden h-24 w-full sm:block"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 16.667 9 C 27 21 39 21 50 9"
          className="stroke-primary"
          strokeWidth="0.1"
          strokeDasharray="0.3"
        />
        <path
          d="M 50 9 C 61 -3 73 -3 83.333 9"
          className="stroke-primary"
          strokeWidth="0.1"
          strokeDasharray="0.3"
        />
      </svg>

      <div className="relative grid gap-7 sm:gap-10 grid-cols-1 sm:grid-cols-3">
        {userJourney.map((step, index) => (
          <div key={step.title}>
            <JourneyElement {...step} index={index} />
            {index < userJourney.length - 1 && (
              <MobileConnector direction={index === 0 ? "right" : "left"} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
