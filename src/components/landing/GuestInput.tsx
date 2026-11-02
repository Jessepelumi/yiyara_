"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { ArrowRightIcon, MicrophoneIcon, StopIcon } from "@phosphor-icons/react/dist/ssr";

const PLACEHOLDERS = [
  "Help me make reading a daily habit...",
  "I need to prepare for a job interview...",
  "I want to get my driving licence...",
  "I'd like to learn a new language...",
  "I have a side project I'd like to finish...",
];

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// UI-only processing delay; replace with a cancellable guest request during API integration.
const MOCK_PROCESSING_MS = 2500;

function resizeTextarea(textarea: HTMLTextAreaElement) {
  const scrollTop = textarea.scrollTop;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
  const cursorAtEnd =
    textarea.selectionStart === textarea.value.length &&
    textarea.selectionEnd === textarea.value.length;
  textarea.scrollTop =
    document.activeElement === textarea && cursorAtEnd
      ? textarea.scrollHeight
      : scrollTop;
}

interface GuestInputProps {
  value: string;
  onChange: (value: string) => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  isProcessing: boolean;
  onProcessingChange: (isProcessing: boolean) => void;
}

export function GuestInput({
  value: ambition,
  onChange,
  inputRef: textareaRef,
  isProcessing,
  onProcessingChange,
}: GuestInputProps) {
  const [placeholderAnimation, setPlaceholderAnimation] = useState({
    index: 0,
    length: PLACEHOLDERS[0].length,
    deleting: false,
  });
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const [isFocused, setIsFocused] = useState(false);

  const shouldRotate = !isFocused && ambition.length === 0;

  useEffect(() => {
    if (!shouldRotate || prefersReducedMotion) return;

    const fullText = PLACEHOLDERS[placeholderAnimation.index];
    const delay = placeholderAnimation.deleting
      ? 25
      : placeholderAnimation.length === fullText.length
        ? 2200
        : placeholderAnimation.length === 0
          ? 250
          : 45;

    const timeout = window.setTimeout(() => {
      setPlaceholderAnimation((current) => {
        if (current.deleting) {
          return current.length === 0
            ? {
                index: (current.index + 1) % PLACEHOLDERS.length,
                length: 0,
                deleting: false,
              }
            : { ...current, length: current.length - 1 };
        }

        return current.length === PLACEHOLDERS[current.index].length
          ? { ...current, deleting: true }
          : { ...current, length: current.length + 1 };
      });
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [shouldRotate, prefersReducedMotion, placeholderAnimation]);

  const placeholder = PLACEHOLDERS[placeholderAnimation.index];

  const pendingRequest = useRef<number | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const canSend = ambition.trim().length > 0;

  useLayoutEffect(() => {
    if (textareaRef.current) resizeTextarea(textareaRef.current);
  }, [ambition, textareaRef]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    let previousWidth = textarea.getBoundingClientRect().width;
    const resize = () => resizeTextarea(textarea);
    const observer = new ResizeObserver(() => {
      const width = textarea.getBoundingClientRect().width;
      if (width !== previousWidth) {
        previousWidth = width;
        resize();
      }
    });
    observer.observe(textarea);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [textareaRef]);

  useEffect(() => {
    return () => {
      if (pendingRequest.current !== null)
        window.clearTimeout(pendingRequest.current);
    };
  }, []);

  const send = () => {
    if (!canSend || pendingRequest.current !== null) return;
    onProcessingChange(true);
    setStatusMessage("Preparing your ambition.");
    const request = window.setTimeout(() => {
      if (pendingRequest.current !== request) return;
      pendingRequest.current = null;
      onProcessingChange(false);
      setStatusMessage("Your ambition was received. Your text has been kept.");
    }, MOCK_PROCESSING_MS);
    pendingRequest.current = request;
  };

  const stop = () => {
    if (pendingRequest.current !== null)
      window.clearTimeout(pendingRequest.current);
    pendingRequest.current = null;
    onProcessingChange(false);
    setStatusMessage("Stopped. Your text is still here.");
    textareaRef.current?.focus({ preventScroll: true });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
      className="w-[calc(100%-2rem)] max-w-2xl min-w-0 border-[0.5px] sm:border border-border focus-within:border-primary transition-colors motion-reduce:transition-none bg-card flex flex-col gap-0.5 p-2.5 rounded-3xl"
    >
      <textarea
        ref={textareaRef}
        name="ambition"
        id="ambition"
        rows={1}
        value={ambition}
        aria-label="Describe your ambition"
        aria-describedby="ambition-keyboard-help"
        aria-busy={isProcessing}
        enterKeyHint="send"
        readOnly={isProcessing}
        placeholder={
          prefersReducedMotion
            ? placeholder
            : placeholder.slice(0, placeholderAnimation.length)
        }
        onChange={(event) => {
          onChange(event.target.value);
          setStatusMessage("");
        }}
        onKeyDown={(event) => {
          if (
            event.key !== "Enter" ||
            event.shiftKey ||
            event.nativeEvent.isComposing ||
            event.keyCode === 229
          )
            return;
          event.preventDefault();
          if (!isProcessing) event.currentTarget.form?.requestSubmit();
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="box-border block w-full min-w-0 min-h-16 max-h-[min(12rem,30dvh)] p-2 bg-transparent text-foreground placeholder:text-muted-foreground outline-none border-none resize-none overflow-y-auto text-base leading-normal sm:text-sm sm:leading-normal"
      />

      <div className="flex shrink-0 justify-between items-center">
        <button
          type="button"
          disabled
          aria-label="Voice input (coming soon)"
          title="Voice input (coming soon)"
          className="size-10 shrink-0 rounded-full flex justify-center items-center text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <MicrophoneIcon size={20} aria-hidden="true" />
        </button>

        <button
          type="submit"
          onClick={(event) => {
            if (isProcessing) {
              event.preventDefault();
              stop();
            }
          }}
          disabled={!isProcessing && !canSend}
          aria-label={isProcessing ? "Stop processing" : "Send ambition"}
          title={isProcessing ? "Stop processing" : "Send ambition (Enter)"}
          className="size-10 shrink-0 bg-primary text-primary-foreground rounded-full flex justify-center items-center transition-opacity motion-reduce:transition-none enabled:cursor-pointer enabled:hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {isProcessing ? (
            <StopIcon size={20} aria-hidden="true" weight="fill" />
          ) : (
            <ArrowRightIcon size={20} aria-hidden="true" />
          )}
        </button>
      </div>
      <p id="ambition-keyboard-help" className="sr-only">
        Press Enter to send. Press Shift+Enter for a new line.
      </p>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </p>
    </form>
  );
}
