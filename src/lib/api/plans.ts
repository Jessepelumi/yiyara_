import { apiClient } from "./client";
import type {
  Plan,
  PlanChange,
  PlanRevision,
  PlanSummary,
  PreviewPlan,
} from "./types";

export const plansApi = {
  list: (): Promise<PlanSummary[]> => apiClient("/plans/"),

  detail: (planId: string): Promise<Plan> => apiClient(`/plans/${planId}/`),

  changes: (planId: string): Promise<PlanChange[]> =>
    apiClient(`/plans/${planId}/changes/`),

  revisions: (planId: string): Promise<PlanRevision[]> =>
    apiClient(`/plans/${planId}/revisions/`),

  restoreRevision: (planId: string, version: number): Promise<Plan> =>
    apiClient(`/plans/${planId}/revisions/${version}/restore/`, {
      method: "POST",
    }),

  importPreview: (preview: PreviewPlan): Promise<Plan> =>
    apiClient("/plans/import-preview/", {
      method: "POST",
      body: JSON.stringify(preview),
    }),
};
