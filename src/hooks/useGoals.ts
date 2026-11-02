import { useQuery } from "@tanstack/react-query";
import { mockGoals } from "@/lib/mocks";

export const useGoals = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: mockGoals.list,
  });
};
