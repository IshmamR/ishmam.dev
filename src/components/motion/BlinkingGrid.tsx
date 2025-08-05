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

      const cellSize = window.innerWidth > 640 ? 28 : 18;
      const numberOfRows = Math.floor(
        containerRef.current.clientHeight / cellSize,
      );
      const numberOfColumns = Math.floor(
        containerRef.current.clientWidth / cellSize,
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
    [rows, columns],
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
      className={cn("relative", "w-full py-2", "aspect-2/1 sm:aspect-4/1")}
    >
      <div
        className="text-muted-foreground pointer-events-none absolute right-2 bottom-2 font-mono text-[6px] sm:text-[10px]"
        dir="rtl"
      >
        Rows: {rows} <br />
        Columns: {columns}
      </div>

      <div id="blinking_grid" className="bg-background size-full">
        {cells.length ? (
          <div
            className="grid size-full gap-[1px] px-2"
            style={{
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
          >
            {cells.map((row) => (
              <div
                key={row.toString()}
                className="flex size-full items-center justify-center"
              >
                <div
                  className={cn(
                    "text-edge transition-all ease-in-out",
                    "pointer-events-none flex items-center justify-center",
                    glowers.includes(row) && "text-secondary duration-1024",
                    initialsCells.includes(row) &&
                      "bg-primary pointer-events-auto z-10 size-full! duration-100 hover:cursor-pointer hover:opacity-80 sm:-translate-[14px]",
                  )}
                >
                  {!initialsCells.includes(row) ? (
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
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
