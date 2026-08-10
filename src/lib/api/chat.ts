import { apiClient } from "./client";
import type { Plan, PlanChange } from "./types";

interface ChatRequest {
  content: string;
  scope_goal_id?: string;
  client_id: string;
  plan_version: number;
}

export interface MessageChangeMetadata {
  id: string;
  status: PlanChange["status"];
  summary: string;
  operations: PlanChange["operations"];
  base_version: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  scope_goal_id: string | null;
  metadata: {
    change?: MessageChangeMetadata;
  };
  client_id: string | null;
  created_at: string;
}

export interface ChatResponse {
  conversation_id: string;
  messages: ChatMessage[];
  change: PlanChange | null;
}

export interface ChangeMutationResponse {
  plan: Plan;
  change: PlanChange;
}

export const chatApi = {
  messages: (planId: string): Promise<ChatMessage[]> =>
    apiClient(`/conversations/plans/${planId}/messages/`),

  send: (planId: string, data: ChatRequest): Promise<ChatResponse> =>
    apiClient(`/conversations/plans/${planId}/messages/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  applyChange: (
    planId: string,
    changeId: string,
  ): Promise<ChangeMutationResponse> =>
    apiClient(
      `/conversations/plans/${planId}/changes/${changeId}/apply/`,
      { method: "POST" },
    ),

  rejectChange: (planId: string, changeId: string): Promise<PlanChange> =>
    apiClient(
      `/conversations/plans/${planId}/changes/${changeId}/reject/`,
      { method: "POST" },
    ),
};
