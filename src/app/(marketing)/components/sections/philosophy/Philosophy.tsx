import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "../../shared/SectionHeading";
import { PhilosophyGrid } from "./PhilosophyGrid";
import { SectionContainer } from "../../shared/SectionContainer";

export const Philosophy = () => {
  return (
    <SectionContainer
      id="landing-content"
      className="flex flex-col pt-10 items-center"
    >
      <SectionHeading
        title={
          <>
            Say Hello to <span className="text-primary">Yiyara</span>
          </>
        }
        description="Yiyara is here to walk alongside you, bringing clarity to your ambitions, helping you make sense of the steps ahead and turning your intentions into meaningful action. One step at a time, until you get there."
        align="center"
      />

      <Link
        href="#"
        className="group flex w-fit items-center gap-1 border-b border-primary pb-0.5 text-xs  transition-colors duration-200 hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:border-b-[1.5px] lg:text-base"
      >
        Read the Yiyara Story
        <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
      </Link>

      <PhilosophyGrid />
    </SectionContainer>
  );
};
