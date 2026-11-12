import { SectionContainer } from "../../shared/SectionContainer";
import { SectionHeading } from "../../shared/SectionHeading";
import { FeatureGrid } from "./FeatureGrid";

export const Features = () => {
  return (
    <SectionContainer>
      <SectionHeading
        title="Beyond the Plan"
        description="Everything you need to bring clarity to your ambitions, make
          meaningful progress and stay intentional along the way."
        align="center"
      />

      <FeatureGrid />
    </SectionContainer>
  );
};
