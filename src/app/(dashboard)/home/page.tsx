"use client";

import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { examplePrompts } from "@/static/examplePrompts";
import { ExamplePromptCard } from "@/components/custom/examplePrompt";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { goalsApi } from "@/lib/api/goals";
import type { Plan, PreviewPlan } from "@/lib/api/types";
import { PromptField } from "@/components/custom/promptField";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type DecompositionResult =
  | { mode: "persisted"; plan: Plan }
  | { mode: "preview"; plan: PreviewPlan };

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [showExamples, setShowExamples] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation<DecompositionResult, Error, string>({
    mutationFn: async (text) => {
      if (isAuthenticated) {
        return { mode: "persisted", plan: await goalsApi.decompose(text) };
      }

      return { mode: "preview", plan: await goalsApi.preview(text) };
    },
    onMutate: () => {
      setErrorMessage(null);
    },
    onSuccess: async (result) => {
      setInputValue("");

      if (result.mode === "preview") {
        sessionStorage.setItem("yiyara-preview-plan", JSON.stringify(result.plan));
        router.push("/console/preview?goal=preview-goal-0");
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["goals"] }),
        queryClient.invalidateQueries({ queryKey: ["plans"] }),
      ]);

      if (result.plan.goals.length > 0) {
        router.push(
          `/console/${result.plan.id}?goal=${result.plan.goals[0].id}`,
        );
      }
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = () => {
    if (status !== "loading" && inputValue.trim()) {
      mutation.mutate(inputValue);
    }
  };

  const handleExampleClick = (text: string) => {
    setInputValue(text);
    setShowExamples(false);
  };

  return (
    <section className="w-full overflow-y-auto pb-8">
      <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col justify-center gap-6">
        <div className="space-y-2">
          <header className="flex flex-col text-3xl lg:text-4xl">
            <b className="bg-linear-to-r from-blue-500 via-purple-500 via-40% to-purple-700 bg-clip-text text-transparent w-fit">
              Hi there{isAuthenticated && session?.user?.name
                ? `, ${session.user.name.split(" ")[0]}`
                : ""}
            </b>
            <b className="bg-linear-to-r from-blue-500 via-purple-500 via-40% to-purple-700 bg-clip-text  text-transparent w-fit">
              Let&apos;s get productive!
            </b>
          </header>

          <div>
            <p className="text-sm text-gray-500">
              I&apos;m here to assist you on your journey to achieving your
              goals, whatever they are.
            </p>
            {!isAuthenticated && status !== "loading" && (
              <p className="mt-1 text-sm text-blue-700">
                Guest mode: generate a preview without saving anything.
              </p>
            )}

            <button
              onClick={() => setShowExamples(!showExamples)}
              className="flex gap-1 items-center text-sm text-gray-500 hover:text-blue-700"
            >
              Check out our example prompts
              <CaretDownIcon
                size={18}
                className={cn(
                  "transition-transform duration-300",
                  showExamples ? "rotate-180" : "rotate-0",
                )}
              />
            </button>
          </div>

          {showExamples && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {examplePrompts.map((item, index) => (
                <ExamplePromptCard
                  key={index}
                  text={item.prompt}
                  onClick={() => handleExampleClick(item.prompt)}
                />
              ))}
            </div>
          )}
        </div>

        <PromptField
          value={inputValue}
          isPending={mutation.isPending}
          disabled={mutation.isPending || status === "loading"}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={handleSubmit}
        />

        {errorMessage && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

      </div>
    </section>
  );
}
