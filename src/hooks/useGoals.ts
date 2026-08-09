import { useQuery } from "@tanstack/react-query";
import { goalsApi } from "@/lib/api/goals";

export const useGoals = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: goalsApi.list,
  });
};
