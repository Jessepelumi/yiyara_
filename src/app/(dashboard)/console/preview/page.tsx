"use client";

import { Suspense, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardCanvas } from "@/components/console/BoardCanvas";
import { plansApi } from "@/lib/api/plans";
import type { Goal, PreviewPlan } from "@/lib/api/types";

const subscribe = () => () => undefined;
const getServerSnapshot = () => null;
const getPreviewSnapshot = () =>
  typeof window === "undefined"
    ? null
    : sessionStorage.getItem("yiyara-preview-plan");

function PreviewConsoleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { status } = useSession();
  const storedPreview = useSyncExternalStore(
    subscribe,
    getPreviewSnapshot,
    getServerSnapshot,
  );

  const preview = useMemo(() => {
    if (!storedPreview) return null;
    try {
      return JSON.parse(storedPreview) as PreviewPlan;
    } catch {
      return null;
    }
  }, [storedPreview]);

  const goals = useMemo<Goal[]>(
    () =>
      preview?.goals.map((goal, goalIndex) => ({
        ...goal,
        id: `preview-goal-${goalIndex}`,
        plan_id: "preview",
        is_completed: false,
        tasks: goal.tasks.map((task, taskIndex) => ({
          ...task,
          id: `preview-task-${goalIndex}-${taskIndex}`,
          is_completed: false,
        })),
      })) || [],
    [preview],
  );

  const requestedGoalId = searchParams.get("goal") || undefined;
  const selectedGoalId = goals.some((goal) => goal.id === requestedGoalId)
    ? requestedGoalId
    : undefined;

  const saveMutation = useMutation({
    mutationFn: () => plansApi.importPreview(preview as PreviewPlan),
    onSuccess: async (plan) => {
      sessionStorage.removeItem("yiyara-preview-plan");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["plans"] }),
        queryClient.invalidateQueries({ queryKey: ["goals"] }),
      ]);
      const query = plan.goals[0] ? `?goal=${plan.goals[0].id}` : "";
      router.replace(`/console/${plan.id}${query}`);
    },
  });

  if (!preview) {
    return (
      <div className="flex h-full w-full items-center justify-center text-center">
        <div>
          <h1 className="text-lg font-semibold">Preview expired</h1>
          <p className="mt-1 text-sm text-gray-500">
            Guest boards live only in this browser session.
          </p>
          <Link
            href="/home"
            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Start another ambition
          </Link>
        </div>
      </div>
    );
  }

  const selectGoal = (goalId?: string) => {
    router.replace(
      goalId ? `/console/preview?goal=${goalId}` : "/console/preview",
      { scroll: false },
    );
  };

  return (
    <div className="grid h-full min-h-0 w-full overflow-hidden rounded-t-xl border bg-white lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.5fr)]">
      <BoardCanvas
        title={preview.title}
        rawInput={preview.raw_input}
        goals={goals}
        selectedGoalId={selectedGoalId}
        onSelectGoal={selectGoal}
        isPreview
      />

      <aside className="flex flex-col justify-center border-l bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Guest drawing board
        </p>
        <h2 className="mt-2 text-xl font-semibold text-gray-900">
          Plan visible. Nothing persisted.
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to save this board, keep its conversation, and continuously
          refine goals and tasks.
        </p>

        {status === "authenticated" ? (
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {saveMutation.isPending ? "Saving board..." : "Save this board"}
          </button>
        ) : status === "unauthenticated" ? (
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: `/console/preview${
                  selectedGoalId ? `?goal=${selectedGoalId}` : ""
                }`,
              })
            }
            className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white"
          >
            Log in to save and iterate
          </button>
        ) : (
          <div className="mt-5 h-10 animate-pulse rounded-lg bg-gray-100" />
        )}

        {saveMutation.error && (
          <p className="mt-3 text-sm text-red-600">{saveMutation.error.message}</p>
        )}

        <Link href="/home" className="mt-3 text-center text-sm text-gray-500">
          Start a different ambition
        </Link>
      </aside>
    </div>
  );
}

export default function PreviewConsole() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <p className="animate-pulse text-sm text-gray-400">
            Opening preview board...
          </p>
        </div>
      }
    >
      <PreviewConsoleContent />
    </Suspense>
  );
}
