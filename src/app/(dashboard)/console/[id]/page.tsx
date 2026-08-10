"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BoardCanvas } from "@/components/console/BoardCanvas";
import { BoardNavigator } from "@/components/console/BoardNavigator";
import { ChatPanel } from "@/components/console/ChatPanel";
import { usePlan, usePlans } from "@/hooks/usePlans";
import { plansApi } from "@/lib/api/plans";

export default function ConsoleBoard() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const planId = params.id as string;
  const { data: plan, isLoading, isError, error } = usePlan(planId);
  const { data: plans = [] } = usePlans();
  const [mobilePanel, setMobilePanel] = useState<"board" | "chat">("board");
  const { data: revisions = [] } = useQuery({
    queryKey: ["revisions", planId],
    queryFn: () => plansApi.revisions(planId),
  });
  const restoreMutation = useMutation({
    mutationFn: (version: number) => plansApi.restoreRevision(planId, version),
    onSuccess: async (restoredPlan) => {
      queryClient.setQueryData(["plan", planId], restoredPlan);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["plans"] }),
        queryClient.invalidateQueries({ queryKey: ["goals"] }),
        queryClient.invalidateQueries({ queryKey: ["revisions", planId] }),
      ]);
    },
  });

  const requestedGoalId = searchParams.get("goal") || undefined;
  const selectedGoalId = plan?.goals.some(
    (goal) => goal.id === requestedGoalId,
  )
    ? requestedGoalId
    : undefined;

  const selectGoal = (goalId?: string) => {
    const query = goalId ? `?goal=${goalId}` : "";
    router.replace(`/console/${planId}${query}`, { scroll: false });
  };

  const restoreRevision = (version: number) => {
    if (confirm(`Restore board version ${version}? Current state stays in history.`)) {
      restoreMutation.mutate(version);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="animate-pulse text-sm text-gray-400">Opening drawing board...</p>
      </div>
    );
  }

  if (isError || !plan) {
    return (
      <div className="flex h-full w-full items-center justify-center text-center">
        <div>
          <h2 className="font-semibold text-gray-900">Board unavailable</h2>
          <p className="mt-1 text-sm text-gray-500">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-t-xl border bg-white">
      <div className="flex items-center gap-2 border-b p-2 lg:hidden">
        <button
          onClick={() => setMobilePanel("board")}
          className={`flex-1 rounded-md px-3 py-2 text-sm ${
            mobilePanel === "board" ? "bg-blue-600 text-white" : "bg-gray-50"
          }`}
        >
          Plan
        </button>
        <button
          onClick={() => setMobilePanel("chat")}
          className={`flex-1 rounded-md px-3 py-2 text-sm ${
            mobilePanel === "chat" ? "bg-blue-600 text-white" : "bg-gray-50"
          }`}
        >
          Chat
        </button>
        <select
          value={planId}
          onChange={(event) => router.push(`/console/${event.target.value}`)}
          className="max-w-36 rounded-md border px-2 py-2 text-xs"
          aria-label="Choose board"
        >
          {plans.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid min-h-0 flex-1 xl:grid-cols-[14rem_minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
        <BoardNavigator plans={plans} currentPlanId={planId} />
        <div
          className={`${mobilePanel === "board" ? "flex" : "hidden"} min-h-0 lg:flex`}
        >
          <BoardCanvas
            title={plan.title}
            rawInput={plan.raw_input}
            version={plan.version}
            goals={plan.goals}
            selectedGoalId={selectedGoalId}
            onSelectGoal={selectGoal}
            revisions={revisions}
            onRestoreRevision={restoreRevision}
            isRestoring={restoreMutation.isPending}
          />
        </div>
        <div
          className={`${mobilePanel === "chat" ? "flex" : "hidden"} min-h-0 lg:flex`}
        >
          <ChatPanel
            planId={plan.id}
            planVersion={plan.version}
            goals={plan.goals}
            scopeGoalId={selectedGoalId}
            onScopeChange={selectGoal}
          />
        </div>
      </div>
    </div>
  );
}
