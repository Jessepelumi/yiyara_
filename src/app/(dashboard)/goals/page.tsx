import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Goals() {
  return (
    <div className="flex flex-col items-center w-full">
      <Sheet>
        <div className="w-full md:w-3/5 lg:w-2/5 space-y-5">
          <header>Your Goals</header>

          <section className="w-full">
            <SheetTrigger asChild>
              <GoalButton
                title="Complete Cooking Classes and Exams"
                count={15}
                description="Finish all curriculum modules for current cooking classes and
        successfully pass the practical exams by the end of May."
              />
            </SheetTrigger>
          </section>

          <SheetContent className="">
            <SheetHeader>
              <SheetTitle className="font-normal pt-5">Goal Title</SheetTitle>
              <SheetDescription>Goal description goes here</SheetDescription>
            </SheetHeader>

            <div className="px-5">
              <h1>Task list</h1>
            </div>

            <SheetFooter></SheetFooter>
          </SheetContent>
        </div>
      </Sheet>
    </div>
  );
}

interface GoalButtonProps {
  title: string;
  description: string;
  count: number;
}

const GoalButton = ({ title, description, count }: GoalButtonProps) => {
  return (
    <button className="group w-full border p-3 rounded-lg text-start hover:border-blue-500 hover:shadow-sm transition-all">
      <div className="flex gap-2 justify-between items-center mb-1">
        <h1 className="flex-1 min-w-0 truncate line-clamp-1 group-hover:text-blue-700 transition-colors">
          {title}
        </h1>
        <span className="shrink-0 text-xs text-gray-500 w-fit">
          {count} tasks
        </span>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
        {description}
      </p>
    </button>
  );
};
