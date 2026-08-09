import type { GoalPreview } from "@/lib/api/types";

interface GoalPreviewListProps {
  goals: GoalPreview[];
}

function formatDate(date: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(`${date}T00:00:00`));
}

export function GoalPreviewList({ goals }: GoalPreviewListProps) {
  return (
    <section className="space-y-4" aria-live="polite">
      <header>
        <h2 className="text-xl font-semibold text-gray-900">Your goal preview</h2>
        <p className="text-sm text-gray-500">
          Preview only. These goals and tasks have not been saved.
        </p>
      </header>

      <div className="space-y-4">
        {goals.map((goal, goalIndex) => (
          <article
            key={`${goal.title}-${goalIndex}`}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                {goal.description && (
                  <p className="mt-1 text-sm text-gray-600">{goal.description}</p>
                )}
              </div>
              {goal.due_date && (
                <span className="shrink-0 text-xs text-gray-500">
                  Due {formatDate(goal.due_date)}
                </span>
              )}
            </div>

            <ol className="mt-4 space-y-2">
              {goal.tasks.map((task, taskIndex) => (
                <li
                  key={`${task.title}-${taskIndex}`}
                  className="flex gap-3 rounded-lg bg-gray-50 p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                    {taskIndex + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <p className="text-sm font-medium text-gray-800">{task.title}</p>
                      {task.due_date && (
                        <span className="shrink-0 text-xs text-gray-500">
                          {formatDate(task.due_date)}
                        </span>
                      )}
                    </div>
                    {task.description && (
                      <p className="mt-1 text-xs text-gray-600">{task.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
