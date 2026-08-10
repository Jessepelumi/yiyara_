import { useQuery } from "@tanstack/react-query";
import { plansApi } from "@/lib/api/plans";

export const usePlans = () =>
  useQuery({
    queryKey: ["plans"],
    queryFn: plansApi.list,
  });

export const usePlan = (planId?: string) =>
  useQuery({
    queryKey: ["plan", planId],
    queryFn: () => plansApi.detail(planId as string),
    enabled: Boolean(planId),
    retry: false,
  });
