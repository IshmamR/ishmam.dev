import { cn } from "../../lib/utils";

export function Footer() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-4">
      <div className="screen-line-before border-edge mx-auto max-w-[1024px] border-x pt-4">
        <p className="text-muted-foreground mb-1 px-4 text-center font-mono text-sm text-balance">
          Inspired by tailwindcss.com, and chanhdai.com
        </p>

        <p className="text-muted-foreground mb-4 px-4 text-center font-mono text-sm text-balance">
          Built by{" "}
          <a
            className="link"
            href="https://github.com/IshmamR/"
            target="_blank"
            rel="noopener"
          >
            ishmam
          </a>
          . The source code is available upon{" "}
          <a
            className="link"
            href="https://github.com/IshmamR/ishmam.dev"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          .
        </p>

        <div
          className={cn(
            "screen-line-before screen-line-after flex w-full before:z-1 after:z-1",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56",
          )}
        >
          <div className="border-edge bg-background mx-auto flex items-center justify-center gap-3 border-x px-4">
            <a
              className="text-muted-foreground flex font-mono text-xs font-medium"
              href={`/llms.txt`}
              target="_blank"
              rel="noopener noreferrer"
            >
              llms.txt
            </a>

            {/* <Separator /> */}

            {/* <a
              className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
              href={`/rss`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RssIcon className="size-4" />
              <span className="sr-only">RSS</span>
            </a> */}

            {/* <Separator /> */}
          </div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
