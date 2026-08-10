// API endpoints to decompose goals and
// retrieve a list of stored goals with associated tasks

import { apiClient } from "./client";
import type { Goal, Plan, PreviewPlan } from "./types";

export const goalsApi = {
  // Decompose goal
  decompose: (text: string): Promise<Plan> =>
    apiClient("/decompose/", {
      method: "POST",
      body: JSON.stringify({ text }),
    }),

  // Preview a decomposition without authentication or persistence
  preview: (text: string): Promise<PreviewPlan> =>
    apiClient("/decompose/preview/", {
      method: "POST",
      body: JSON.stringify({ text }),
      auth: false,
    }),

  // Fetch goals with associated tasks
  list: (): Promise<Goal[]> =>
    apiClient("/list/", {
      method: "GET",
    }),

  // Delete a goal
  delete: async (id: string) => {
    return await apiClient(`/${id}/`, {
      method: "DELETE",
    });
  },
};
