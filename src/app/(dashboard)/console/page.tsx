"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TerminalWindowIcon } from "@phosphor-icons/react/dist/ssr";
import { usePlans } from "@/hooks/usePlans";

export default function ConsoleRoot() {
  const router = useRouter();
  const { data: plans, isLoading } = usePlans();

  useEffect(() => {
    const firstPlan = plans?.[0];
    if (!isLoading && firstPlan) {
      const query = firstPlan.first_goal_id
        ? `?goal=${firstPlan.first_goal_id}`
        : "";
      router.replace(`/console/${firstPlan.id}${query}`);
    }
  }, [plans, isLoading, router]);

  if (isLoading || plans?.length) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex animate-pulse flex-col items-center gap-2">
          <TerminalWindowIcon size={32} className="text-blue-200" />
          <p className="text-xs text-slate-400">Opening drawing board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center">
      <div className="mb-4 rounded-full bg-blue-50 p-6">
        <TerminalWindowIcon size={48} className="text-blue-600" />
      </div>
      <h2 className="text-xl font-bold">No drawing board yet</h2>
      <p className="mx-auto mt-2 max-w-xs text-slate-500">
        Start with one ambition. Yiyara will build your first board.
      </p>
      <Button className="mt-6" onClick={() => router.push("/home")}>
        Start new ambition
      </Button>
    </div>
  );
}
