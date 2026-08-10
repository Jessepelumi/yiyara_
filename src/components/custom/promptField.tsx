import {
  ArrowRightIcon,
  MicrophoneIcon,
  PaperclipIcon,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";

interface PromptFieldProps {
  value: string;
  isPending: boolean;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  pendingPlaceholder?: string;
}

export const PromptField = ({
  value,
  isPending,
  disabled,
  onChange,
  onSubmit,
  placeholder = "Ask whatever you want...",
  pendingPlaceholder = "Yiyara is decomposing...",
}: PromptFieldProps) => {
  // Enter key to submit & shift + enter for new lines
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="bg-linear-to-r from-blue-300 via-purple-300 via-50% to-purple-400 rounded-xl p-1">
      <div className="flex flex-col gap-3 p-1.5 rounded-lg bg-white">
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || isPending}
          placeholder={
            isPending ? pendingPlaceholder : placeholder
          }
          className="[field-sizing-content] w-full min-h-10 max-h-48 p-2 outline-none border-none resize-none overflow-y-auto text-sm"
        ></textarea>

        <div className="flex justify-between items-center">
          <div className="flex gap-3 px-1">
            <button
              type="button"
              aria-label="Use microphone"
              className="text-gray-500 hover:text-blue-700"
            >
              <MicrophoneIcon size={20} />
            </button>

            <button
              type="button"
              aria-label="Attach file"
              className="text-gray-500 hover:text-blue-700"
            >
              <PaperclipIcon size={20} />
            </button>
          </div>

          <div>
            <button
              type="button"
              aria-label="Send prompt"
              onClick={onSubmit}
              disabled={disabled || isPending || !value.trim()}
              className="p-2 rounded-lg text-blue-600 bg-linear-to-r from-blue-200 via-blue-200 via-20% to-purple-300 hover:text-blue-700"
            >
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
