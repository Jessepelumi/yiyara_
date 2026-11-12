import { UserJourney } from "@/app/(marketing)/components/sections/journey/UserJourney";
import { SectionHeading } from "../../shared/SectionHeading";
import { SectionContainer } from "../../shared/SectionContainer";

export const Journey = () => {
  return (
    <SectionContainer>
      <SectionHeading
        title="From Action to Ambition"
        description="The Yiyara experience in three simple steps"
      />

      <UserJourney />
    </SectionContainer>
  );
};
