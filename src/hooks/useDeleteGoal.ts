import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { mockGoals } from "@/lib/mocks";

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mockGoals.delete(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["goals"] }),
        queryClient.invalidateQueries({ queryKey: ["plans"] }),
        queryClient.invalidateQueries({ queryKey: ["plan"] }),
        queryClient.invalidateQueries({ queryKey: ["revisions"] }),
      ]);
    },
    onError: (error: Error) => {
      console.error("Yiyara Delete Error:", error.message);
    },
  });
};
