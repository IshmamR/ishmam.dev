import { cn } from "@/lib/utils";

export function Pattern() {
  return (
    <>
      <div className="border-b overflow-clip border-edge [&_*]:border-edge px-4">
        <div
          className={cn(
            "mx-auto bg-transparent",
            "relative flex h-8 max-w-[1024px] border-x border-edge",
            "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
          )}
        ></div>
      </div>
    </>
  );
}
