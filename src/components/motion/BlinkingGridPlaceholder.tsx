import { cn } from "@/lib/utils";

export function BlinkingGridPlaceholder() {
  return (
    <div className={cn("relative", "w-full py-2", "aspect-3/1 sm:aspect-4/1")}>
      <div
        className="text-muted-foreground absolute right-2 bottom-2 font-mono text-[6px] sm:text-[10px]"
        dir="rtl"
      >
        Rows: 0 <br />
        Columns: 0
      </div>

      <div id="blinking_grid" className="bg-background size-full">
        <div className="flex size-full flex-wrap items-center justify-center overflow-hidden">
          {Array.from({ length: 300 }, (_, i) => i).map((item) => (
            <div
              key={`grid-placeholder-${item}`}
              className="flex size-[16px] items-center justify-center sm:size-[28px]"
            >
              <div
                className={cn("bg-muted-foreground size-[1px]", "bg-edge")}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
