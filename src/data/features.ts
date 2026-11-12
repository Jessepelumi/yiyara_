import {
  ArrowsClockwiseIcon,
  CalendarDotsIcon,
  ChartLineUpIcon,
  ChatCircleDotsIcon,
  ListChecksIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";

export type FeatureVisual =
  | "conversation"
  | "plan"
  | "calendar"
  | "flexible"
  | "progress"
  | "control";

export interface Feature {
  title: string;
  description: string;
  Icon: ComponentType<{ size?: number; weight?: "regular" | "bold" }>;
  visual: FeatureVisual;
  className: string;
}

export const FEATURES: Feature[] = [
  {
    title: "Thoughtful conversations",
    description:
      "Get questions that help clarify what you really want to achieve.",
    Icon: ChatCircleDotsIcon,
    visual: "conversation",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Actionable plans",
    description: "Turn big ambitions into manageable steps and milestones.",
    Icon: ListChecksIcon,
    visual: "plan",
    className: "lg:col-span-2",
  },
  {
    title: "Calendar integration",
    description: "Give your intentions a place in your everyday schedule.",
    Icon: CalendarDotsIcon,
    visual: "calendar",
    className: "lg:col-span-1",
  },
  {
    title: "Flexible planning",
    description: "Revisit, adjust and reschedule your plans as life changes.",
    Icon: ArrowsClockwiseIcon,
    visual: "flexible",
    className: "lg:col-span-1",
  },
  {
    title: "Progress tracking",
    description: "See where you are, what you've accomplished and what's next.",
    Icon: ChartLineUpIcon,
    visual: "progress",
    className: "lg:col-span-2",
  },
  {
    title: "You stay in control",
    description:
      "Review and approve proposed changes before they affect your plans.",
    Icon: ShieldCheckIcon,
    visual: "control",
    className: "lg:col-span-2",
  },
];
