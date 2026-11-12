import {
  PlayIcon,
  LightbulbIcon,
  LightningIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";

export interface UserJourneyStep {
  title: string;
  description: string;
  Icon: ComponentType<{ size?: number; weight?: "regular" | "bold" }>;
}

export const USER_JOURNEY: UserJourneyStep[] = [
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
