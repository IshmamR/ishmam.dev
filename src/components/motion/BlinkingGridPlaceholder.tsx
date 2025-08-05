import { cn } from "@/lib/utils";

export function BlinkingGridPlaceholder() {
  return (
    <div className={cn("relative", "w-full py-2", "aspect-2/1 sm:aspect-4/1")}>
      <div
        className="text-muted-foreground absolute right-2 bottom-2 font-mono text-[6px] sm:text-[10px]"
        dir="rtl"
      >
        Rows: 0 <br />
        Columns: 0
      </div>

      <div id="blinking_grid" className="bg-background size-full">
        <div className="flex size-full flex-wrap items-center justify-center overflow-hidden">
          {Array.from({ length: 360 }, (_, i) => i).map((item) => (
            <div
              key={`grid-placeholder-${item}`}
              className="text-edge flex size-[18px] items-center justify-center sm:size-[28px]"
            >
              <svg
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>corners</title>
                <rect x="2" width="1" height="5" fill="currentColor" />
                <rect y="2" width="5" height="1" fill="currentColor" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
