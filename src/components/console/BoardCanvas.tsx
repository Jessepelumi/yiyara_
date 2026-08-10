import type { Goal, PlanRevision } from "@/lib/api/types";

interface BoardCanvasProps {
  title: string;
  rawInput: string;
  version?: number;
  goals: Goal[];
  selectedGoalId?: string;
  onSelectGoal: (goalId?: string) => void;
  isPreview?: boolean;
  revisions?: PlanRevision[];
  onRestoreRevision?: (version: number) => void;
  isRestoring?: boolean;
}

function formatDate(date: string | null) {
  if (!date) return "No due date";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    new Date(`${date}T00:00:00`),
  );
}

function GoalCard({ goal }: { goal: Goal }) {
  const completedTasks = goal.tasks.filter((task) => task.is_completed).length;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{goal.title}</h3>
          {goal.description && (
            <p className="mt-1 text-sm text-gray-600">{goal.description}</p>
          )}
        </div>
        <span className="shrink-0 text-xs text-gray-500">
          {formatDate(goal.due_date)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>
          {completedTasks}/{goal.tasks.length} tasks complete
        </span>
        <span>{goal.is_completed ? "Goal complete" : "In progress"}</span>
      </div>
    </article>
  );
}

export function BoardCanvas({
  title,
  rawInput,
  version,
  goals,
  selectedGoalId,
  onSelectGoal,
  isPreview = false,
  revisions = [],
  onRestoreRevision,
  isRestoring = false,
}: BoardCanvasProps) {
  const selectedGoal = goals.find((goal) => goal.id === selectedGoalId);
  const taskCount = goals.reduce((count, goal) => count + goal.tasks.length, 0);
  const completedCount = goals.reduce(
    (count, goal) =>
      count + goal.tasks.filter((task) => task.is_completed).length,
    0,
  );

  return (
    <section className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-gray-50/70">
      <header className="border-b bg-white px-4 py-4 lg:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
              {isPreview ? "Preview board" : "Drawing board"}
            </p>
            <h1 className="truncate text-xl font-semibold text-gray-950">{title}</h1>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">{rawInput}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
              {isPreview ? "Not saved" : `Version ${version}`}
            </span>
            {!isPreview && revisions.length > 1 && onRestoreRevision && (
              <select
                value=""
                disabled={isRestoring}
                onChange={(event) => {
                  const selectedVersion = Number(event.target.value);
                  if (selectedVersion) onRestoreRevision(selectedVersion);
                }}
                className="max-w-40 rounded-md border bg-white px-2 py-1 text-xs text-gray-600"
                aria-label="Revision history"
              >
                <option value="">
                  {isRestoring ? "Restoring..." : "Revision history"}
                </option>
                {revisions
                  .filter((revision) => revision.version !== version)
                  .map((revision) => (
                    <option key={revision.id} value={revision.version}>
                      Restore v{revision.version}: {revision.summary}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => onSelectGoal(undefined)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
              !selectedGoalId
                ? "bg-blue-600 text-white"
                : "border bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            Whole board
          </button>
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => onSelectGoal(goal.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                selectedGoalId === goal.id
                  ? "bg-blue-600 text-white"
                  : "border bg-white text-gray-600 hover:bg-blue-50"
              }`}
            >
              {goal.title}
            </button>
          ))}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-6">
        {selectedGoal ? (
          <div className="mx-auto max-w-3xl space-y-4">
            <GoalCard goal={selectedGoal} />
            <section className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Tasks</h2>
                <span className="text-xs text-gray-500">
                  {selectedGoal.tasks.length} total
                </span>
              </div>

              <ol className="mt-3 space-y-2">
                {selectedGoal.tasks.map((task, index) => (
                  <li
                    key={task.id}
                    className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        task.is_completed
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.is_completed ? "✓" : index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-gray-800">{task.title}</p>
                        <span className="shrink-0 text-xs text-gray-500">
                          {formatDate(task.due_date)}
                        </span>
                      </div>
                      {task.description && (
                        <p className="mt-1 text-xs text-gray-600">{task.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-4">
            <section className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border bg-white p-3">
                <p className="text-2xl font-semibold text-gray-900">{goals.length}</p>
                <p className="text-xs text-gray-500">Goals</p>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <p className="text-2xl font-semibold text-gray-900">{taskCount}</p>
                <p className="text-xs text-gray-500">Tasks</p>
              </div>
              <div className="rounded-xl border bg-white p-3">
                <p className="text-2xl font-semibold text-gray-900">{completedCount}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </section>
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => onSelectGoal(goal.id)}
                className="block w-full text-left"
              >
                <GoalCard goal={goal} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
