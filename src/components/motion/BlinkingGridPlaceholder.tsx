import { cn } from "@/lib/utils";

export function BlinkingGridPlaceholder() {
  return (
    <div className={cn("relative", "py-2 w-full", "aspect-2/1 sm:aspect-3/1")}>
      <div
        className="absolute bottom-2 right-2 text-[6px] sm:text-[10px] text-muted-foreground font-mono"
        dir="rtl"
      >
        Rows: 0 <br />
        Columns: 0
      </div>

      <div id="blinking_grid" className="size-full bg-background">
        <div className="size-full flex flex-wrap items-center justify-center overflow-hidden">
          {Array.from({ length: 420 }, (_, i) => i).map((item) => (
            <div
              key={`grid-placeholder-${item}`}
              className="size-[16px] sm:size-[28px] flex items-center justify-center"
            >
              <div
                className={cn("size-[1px] bg-muted-foreground", "bg-edge")}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
