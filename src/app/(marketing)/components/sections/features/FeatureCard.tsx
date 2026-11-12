import { Feature } from "@/data/features";
import { FeatureVisual } from "./FeatureVisual";

export const FeatureCard = ({
  title,
  description,
  Icon,
  visual,
  className,
}: Feature) => {
  return (
    <article
      className={`group relative min-h-56 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary sm:p-8 ${className}`}
    >
      <div className="relative z-10 max-w-xs">
        <div className="flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
          <Icon size={22} weight="regular" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-xl font-medium sm:text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>
      <FeatureVisual visual={visual} />
    </article>
  );
};
