import Link from "next/link";
import type { PlanSummary } from "@/lib/api/types";

interface BoardNavigatorProps {
  plans: PlanSummary[];
  currentPlanId: string;
}

export function BoardNavigator({ plans, currentPlanId }: BoardNavigatorProps) {
  return (
    <aside className="hidden min-h-0 flex-col border-r bg-white xl:flex">
      <div className="border-b p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Your boards</h2>
          <Link
            href="/home"
            className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
          >
            New
          </Link>
        </div>
      </div>
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
        {plans.map((plan) => {
          const href = plan.first_goal_id
            ? `/console/${plan.id}?goal=${plan.first_goal_id}`
            : `/console/${plan.id}`;
          const isActive = plan.id === currentPlanId;
          return (
            <Link
              key={plan.id}
              href={href}
              className={`block rounded-lg p-2.5 ${
                isActive ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <p
                className={`line-clamp-2 text-sm font-medium ${
                  isActive ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {plan.title}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {plan.goal_count} goals · {plan.task_count} tasks
              </p>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
