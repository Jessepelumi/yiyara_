import { useQuery } from "@tanstack/react-query";
import { mockPlans } from "@/lib/mocks";

export const usePlans = () =>
  useQuery({
    queryKey: ["plans"],
    queryFn: mockPlans.list,
  });

export const usePlan = (planId?: string) =>
  useQuery({
    queryKey: ["plan", planId],
    queryFn: () => mockPlans.detail(planId as string),
    enabled: Boolean(planId),
    retry: false,
  });
