import { cn } from "@/lib/utils";

export function SeparatorPattern() {
  return (
    <div className="border-edge [&_*]:border-edge overflow-clip px-4">
      <div
        className={cn(
          "separator_pattern",
          "mx-auto bg-transparent",
          "border-edge relative flex h-8 max-w-[1024px] border-x",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        )}
      ></div>
    </div>
  );
}
