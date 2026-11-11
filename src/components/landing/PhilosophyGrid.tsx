interface Philosophy {
  number: string;
  title: string;
  description: string;
}

const philosophies: Philosophy[] = [
  {
    number: "01",
    title: "Intentionality",
    description:
      "Be deliberate about what matters to you, what you pursue and how you spend your time.",
  },
  {
    number: "02",
    title: "Clarity",
    description:
      "Understand your ambitions, see the steps ahead and know what needs your attention next.",
  },
  {
    number: "03",
    title: "Adaptability",
    description:
      "Life doesn't always go according to plan. Be willing to reassess, adjust your approach and find a way forward when circumstances change.",
  },
  {
    number: "04",
    title: "Follow-through",
    description:
      "Turn intentions into meaningful action. Make consistent progress, honour your commitments and keep moving towards what matters.",
  },
];

function PhilosophyShape({ number }: Pick<Philosophy, "number">) {
  if (number === "01") {
    return (
      <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full border border-primary/25 transition-transform duration-300 group-hover:scale-110">
        <div className="absolute inset-5 rounded-full border border-primary/25" />
        <div className="absolute inset-10 rounded-full border border-primary/25" />
        <div className="absolute inset-19 rounded-full bg-primary/20" />
      </div>
    );
  }

  if (number === "02") {
    return (
      <div className="absolute -bottom-9 -right-7 h-40 w-40 transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="absolute inset-0 border border-primary/25" />
        <div className="absolute inset-5 border border-primary/25" />
        <div className="absolute inset-10 border border-primary/25" />
        <div className="absolute inset-19 bg-primary/20" />
      </div>
    );
  }

  if (number === "03") {
    return (
      <div className="absolute -bottom-9 -right-9 flex h-40 w-40 items-center justify-center transition-transform duration-300 group-hover:rotate-6">
        <span className="absolute h-28 w-28 rotate-45 border border-primary/25" />
        <span className="absolute h-18 w-18 rotate-45 border border-primary/25" />
        <span className="absolute h-9 w-9 rotate-45 bg-primary/20" />
      </div>
    );
  }

  return (
    <div className="absolute -bottom-10 -right-10 h-44 w-44 transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-3">
      <svg viewBox="0 0 180 180" className="h-full w-full" fill="none">
        <polygon
          points="90,8 161,49 161,131 90,172 19,131 19,49"
          className="stroke-primary/25"
          strokeWidth="1"
        />
        <polygon
          points="90,38 135,64 135,116 90,142 45,116 45,64"
          className="stroke-primary/25"
          strokeWidth="1"
        />
        <polygon
          points="90,68 109,79 109,101 90,112 71,101 71,79"
          className="fill-primary/20"
        />
      </svg>
    </div>
  );
}

function PhilosophyCard({ number, title, description }: Philosophy) {
  return (
    <article className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary sm:p-8">
      <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
        <span className="h-px w-8 bg-primary" aria-hidden="true" />
        <span>Philosophy {number}</span>
      </div>

      <div className="relative z-10 mt-6 max-w-sm">
        <h3 className="text-2xl font-medium sm:text-3xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>

      <div aria-hidden="true">
        <PhilosophyShape number={number} />
      </div>
    </article>
  );
}

export function PhilosophyGrid() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:gap-5 lg:px-0">
      {philosophies.map((philosophy) => (
        <PhilosophyCard key={philosophy.number} {...philosophy} />
      ))}
    </div>
  );
}
