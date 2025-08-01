import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

// a 4x8 grid
const INITIALS_GRID = [
  [1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 1],
  [0, 1, 0, 0, 1, 1, 1, 0],
  [1, 1, 1, 0, 1, 0, 0, 1],
] as const;

export default function BlinkingGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [glowers, setGlowers] = useState<number[]>([]);
  const [initialsCells, setInitialsCells] = useState<number[]>([]);

  useLayoutEffect(() => {
    function resizeListener() {
      if (!containerRef.current) return;

      const cellSize = window.innerWidth > 640 ? 28 : 16;
      const numberOfRows = Math.floor(
        containerRef.current.clientHeight / cellSize
      );
      const numberOfColumns = Math.floor(
        containerRef.current.clientWidth / cellSize
      );
      setRows(numberOfRows);
      setColumns(numberOfColumns);
    }

    resizeListener();
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const cells = useMemo(
    () => Array.from({ length: rows * columns }, (_, i) => i),
    [rows, columns]
  );

  const randomizeGlowers = useCallback(() => {
    if (!cells) return;
    const maxNumberOfGlowers = Math.round(Math.random() * cells.length * 0.08);
    const glowerIndices = new Set<number>();
    for (let i = 0; i < maxNumberOfGlowers; i++) {
      glowerIndices.add(Math.floor(Math.random() * cells.length));
    }
    setGlowers(Array.from(glowerIndices));
  }, [cells]);

  useEffect(() => {
    randomizeGlowers();
    const interval = setInterval(randomizeGlowers, 7500);

    return () => {
      clearInterval(interval);
    };
  }, [randomizeGlowers]);

  useLayoutEffect(() => {
    // rendering initials
    if (cells.length) {
      const widthNeeded = 8;
      const heightNeeded = 4;

      const x = Math.ceil(columns / 2 - widthNeeded / 2);
      const y = Math.ceil(rows / 2 - heightNeeded / 2);

      const cellsToTrigger: number[] = [];

      cells.forEach((cell) => {
        const cellRow = Math.floor(cell / columns);
        const cellCol = Math.floor(cell % columns);
        if (
          cellCol >= x &&
          cellCol < x + widthNeeded &&
          cellRow >= y &&
          cellRow < y + heightNeeded
        ) {
          // console.log(INITIALS_GRID[cellRow - y][cellCol - x]);
          if (INITIALS_GRID[cellRow - y][cellCol - x]) {
            cellsToTrigger.push(cell);
          }
        }
      });

      setInitialsCells(cellsToTrigger);
    }
  }, [rows, columns, cells]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative pointer-events-none",
        "py-2 w-full",
        "aspect-3/1 sm:aspect-4/1"
      )}
    >
      <div
        className="absolute bottom-2 right-2 text-[6px] sm:text-[10px] text-muted-foreground font-mono"
        dir="rtl"
      >
        Rows: {rows} <br />
        Columns: {columns}
      </div>

      <div id="blinking_grid" className="size-full bg-background">
        {cells.length ? (
          <div
            className="grid px-2 size-full gap-[1px]"
            style={{
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {cells.map((row) => (
              <div
                key={row.toString()}
                className="size-full flex items-center justify-center"
              >
                <div
                  className={cn(
                    "size-[1px] bg-edge",
                    initialsCells.includes(row)
                      ? `size-full rounded-[1px] bg-foreground sm:-translate-[15px]`
                      : glowers.includes(row)
                        ? "bg-muted-foreground shadow-2xl/100 shadow-muted-foreground/100 size-[2px]"
                        : "",
                    "transition-all duration-1024 ease-in-out"
                  )}
                ></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="size-full flex flex-wrap items-center justify-center overflow-hidden">
            {Array.from({ length: 300 }, (_, i) => i).map((item) => (
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
        )}
      </div>
    </div>
  );
}
