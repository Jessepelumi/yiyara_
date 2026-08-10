"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PromptField } from "@/components/custom/promptField";
import { chatApi } from "@/lib/api/chat";
import { plansApi } from "@/lib/api/plans";
import type { Goal, PlanChange, PlanOperation } from "@/lib/api/types";
import { useChat } from "@/hooks/useChat";

interface ChatPanelProps {
  planId: string;
  planVersion: number;
  goals: Goal[];
  scopeGoalId?: string;
  onScopeChange: (goalId?: string) => void;
}

function operationLabel(operation: PlanOperation) {
  const action = operation.action.replaceAll("_", " ");
  const subject = operation.title || operation.task_id || operation.goal_id || "";
  return `${action}${subject ? `: ${subject}` : ""}`;
}

function ChangeCard({
  change,
  onApply,
  onReject,
  isPending,
}: {
  change: PlanChange;
  onApply: () => void;
  onReject: () => void;
  isPending: boolean;
}) {
  return (
    <div className="mt-3 rounded-lg border border-purple-200 bg-purple-50 p-3 text-gray-800">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
          Proposed changes
        </p>
        <span className="text-xs capitalize text-purple-700">{change.status}</span>
      </div>
      <p className="mt-1 text-sm font-medium">{change.summary}</p>
      <ul className="mt-2 space-y-1 text-xs text-gray-600">
        {change.operations.map((operation, index) => (
          <li key={`${operation.action}-${index}`}>• {operationLabel(operation)}</li>
        ))}
      </ul>
      {change.status === "proposed" && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={onApply}
            disabled={isPending}
            className="rounded-md bg-purple-700 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
          >
            Apply
          </button>
          <button
            onClick={onReject}
            disabled={isPending}
            className="rounded-md border border-purple-200 bg-white px-3 py-1.5 text-xs font-medium text-purple-700 disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export function ChatPanel({
  planId,
  planVersion,
  goals,
  scopeGoalId,
  onScopeChange,
}: ChatPanelProps) {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isPending, error } = useChat(planId);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", planId],
    queryFn: () => chatApi.messages(planId),
  });
  const { data: changes = [] } = useQuery({
    queryKey: ["changes", planId],
    queryFn: () => plansApi.changes(planId),
  });

  const changeMap = useMemo(
    () => new Map(changes.map((change) => [change.id, change])),
    [changes],
  );

  const refreshBoard = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["plan", planId] }),
      queryClient.invalidateQueries({ queryKey: ["plans"] }),
      queryClient.invalidateQueries({ queryKey: ["goals"] }),
      queryClient.invalidateQueries({ queryKey: ["changes", planId] }),
    ]);
  };

  const applyMutation = useMutation({
    mutationFn: (changeId: string) => chatApi.applyChange(planId, changeId),
    onSuccess: async (data) => {
      queryClient.setQueryData(["plan", planId], data.plan);
      await refreshBoard();
    },
  });
  const rejectMutation = useMutation({
    mutationFn: (changeId: string) => chatApi.rejectChange(planId, changeId),
    onSuccess: refreshBoard,
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    const content = inputValue.trim();
    if (!content || isPending) return;
    setInputValue("");
    sendMessage(
      {
        content,
        scopeGoalId,
        planVersion,
      },
      {
        onError: () => setInputValue(content),
      },
    );
  };

  return (
    <section className="flex min-h-0 w-full flex-1 flex-col border-l bg-white">
      <header className="border-b px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Board conversation</h2>
            <p className="text-xs text-gray-500">Discuss, propose, apply.</p>
          </div>
          <select
            value={scopeGoalId || ""}
            onChange={(event) => onScopeChange(event.target.value || undefined)}
            className="max-w-44 rounded-md border bg-white px-2 py-1.5 text-xs text-gray-700"
            aria-label="Conversation scope"
          >
            <option value="">Whole board</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.title}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-14 w-3/4 animate-pulse rounded-xl bg-gray-100" />
            <div className="ml-auto h-10 w-2/3 animate-pulse rounded-xl bg-blue-100" />
          </div>
        ) : (
          messages.map((message) => {
            const metadataChange = message.metadata.change;
            const change = metadataChange
              ? changeMap.get(metadataChange.id) || {
                  ...metadataChange,
                  plan_id: planId,
                  scope_goal_id: message.scope_goal_id,
                  created_at: message.created_at,
                  updated_at: message.created_at,
                  applied_at: null,
                }
              : null;
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-3 text-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "border bg-gray-50 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {change && (
                    <ChangeCard
                      change={change}
                      onApply={() => applyMutation.mutate(change.id)}
                      onReject={() => rejectMutation.mutate(change.id)}
                      isPending={
                        (applyMutation.isPending &&
                          applyMutation.variables === change.id) ||
                        (rejectMutation.isPending &&
                          rejectMutation.variables === change.id)
                      }
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={scrollRef} />
      </div>

      <div className="border-t p-3">
        <PromptField
          value={inputValue}
          isPending={isPending}
          disabled={isPending}
          placeholder="Discuss this board..."
          pendingPlaceholder="Yiyara is thinking..."
          onChange={(event) => setInputValue(event.target.value)}
          onSubmit={handleSubmit}
        />
        {(error || applyMutation.error || rejectMutation.error) && (
          <p className="mt-2 text-xs text-red-600">
            {(error || applyMutation.error || rejectMutation.error)?.message}
          </p>
        )}
      </div>
    </section>
  );
}
