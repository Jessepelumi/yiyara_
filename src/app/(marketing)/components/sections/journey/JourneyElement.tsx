import { UserJourneyStep } from "@/data/user-journey";

export const JourneyElement = ({
  title,
  description,
  Icon,
  index,
}: UserJourneyStep & { index: number }) => {
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