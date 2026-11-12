import {
  ArrowsClockwiseIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Feature } from "@/data/features";

export const FeatureVisual = ({ visual }: Pick<Feature, "visual">) => {
  if (visual === "conversation") {
    return (
      <div className="absolute right-6 top-7 flex -rotate-6 flex-col gap-3 opacity-50 sm:right-10 sm:top-10">
        <span className="h-11 w-32 rounded-2xl rounded-br-sm border border-primary/30 bg-primary/10" />
        <span className="ml-8 h-11 w-28 rounded-2xl rounded-bl-sm border border-primary/30 bg-primary/15" />
        <span className="h-11 w-24 rounded-2xl rounded-br-sm border border-primary/30 bg-primary/10" />
      </div>
    );
  }

  if (visual === "plan") {
    return (
      <div className="absolute bottom-6 right-7 grid w-36 gap-2 opacity-50 sm:bottom-8 sm:right-10">
        {["w-full", "w-4/5", "w-3/5"].map((width, index) => (
          <span key={width} className={`flex items-center gap-2 ${width}`}>
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary/40 text-[10px] text-primary">
              {index + 1}
            </span>
            <span className="h-px flex-1 bg-primary/40" />
          </span>
        ))}
      </div>
    );
  }

  if (visual === "calendar") {
    return (
      <div className="absolute bottom-5 right-5 grid w-28 grid-cols-3 gap-1.5 rounded-xl border border-primary/25 p-3 opacity-50 sm:bottom-7 sm:right-7">
        {Array.from({ length: 9 }, (_, index) => (
          <span
            key={index}
            className={`aspect-square rounded-sm ${
              index === 4 ? "bg-primary/55" : "bg-primary/15"
            }`}
          />
        ))}
      </div>
    );
  }

  if (visual === "flexible") {
    return (
      <div className="absolute bottom-6 right-6 flex size-24 items-center justify-center rounded-full border border-dashed border-primary/35 opacity-50 sm:bottom-8 sm:right-8">
        <ArrowsClockwiseIcon
          size={52}
          className="text-primary/60"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (visual === "progress") {
    return (
      <div className="absolute bottom-6 right-7 flex h-24 items-end gap-2 opacity-50 sm:bottom-8 sm:right-10">
        <span className="h-8 w-5 rounded-t bg-primary/20" />
        <span className="h-14 w-5 rounded-t bg-primary/35" />
        <span className="h-20 w-5 rounded-t bg-primary/55" />
      </div>
    );
  }

  return (
    <div className="absolute bottom-6 right-7 flex size-24 items-center justify-center rounded-full border border-primary/25 bg-primary/10 opacity-50 sm:bottom-8 sm:right-10">
      <ShieldCheckIcon
        size={52}
        className="text-primary/60"
        aria-hidden="true"
      />
    </div>
  );
};
