import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockChat } from "@/lib/mocks";

interface SendMessageInput {
  content: string;
  scopeGoalId?: string;
  planVersion: number;
}

export const useChat = (planId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ content, scopeGoalId, planVersion }: SendMessageInput) =>
      mockChat.send(planId, {
        content,
        scope_goal_id: scopeGoalId,
        plan_version: planVersion,
        client_id: crypto.randomUUID(),
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["messages", planId] }),
        queryClient.invalidateQueries({ queryKey: ["changes", planId] }),
      ]);
    },
  });

  return {
    sendMessage: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
