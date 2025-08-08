import type React from "react";
import { cn } from "@/lib/utils";

export function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "bg-card text-card-foreground inline-flex items-center rounded-lg border px-1.5 py-0.5 font-mono text-xs",
        className,
      )}
      {...props}
    />
  );
}
