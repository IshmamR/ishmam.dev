"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function FlipSentences({
  className,
  sentences,
}: {
  className?: string;
  sentences: string[];
}) {
  const [currentSentence, setCurrentSentence] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSentence((prev) => (prev + 1) % sentences.length);
    }, 3500);
  }, [sentences]);

  useEffect(() => {
    startAnimation();

    const abortController = new AbortController();
    const { signal } = abortController;

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState !== "visible" && intervalRef.current) {
          clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
          intervalRef.current = null;
        } else if (document.visibilityState === "visible") {
          setCurrentSentence((prev) => (prev + 1) % sentences.length); // Show the next sentence immediately
          startAnimation(); // Restart the interval when the tab becomes visible
        }
      },
      { signal },
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentences, startAnimation]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.p
        key={`current-sentence-${currentSentence}`}
        className={cn(
          "text-muted-foreground font-mono text-sm text-balance select-none",
          className,
        )}
        initial={{
          y: 8,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: -8,
          opacity: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "linear",
        }}
      >
        {sentences[currentSentence]}
      </motion.p>
    </AnimatePresence>
  );
}
