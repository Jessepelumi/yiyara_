import { ReactNode } from "react";

interface SectionHeadingProps {
  title: ReactNode;
  description: ReactNode;
  align?: "center" | "left";
}

export const SectionHeading = ({title, description, align}: SectionHeadingProps) => {
  return (
    <div
      className={`space-y-1.5 lg:space-y-3.5 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">{title}</h2>

      <p className="text-muted-foreground text-xs sm:text-base">
        {description}
      </p>
    </div>
  );
};
