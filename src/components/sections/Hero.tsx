import { ShieldCheckIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { BlinkingGridPlaceholder } from "../motion/BlinkingGridPlaceholder";
import { FlipSentences } from "../motion/FlipSentences";
import { HeroContextMenu } from "../sub/HeroContextMenu";
import { SimpleTooltip } from "../ui/tooltip";

const BlinkingGrid = lazy(() => import("../motion/BlinkingGrid"));

export function HeroSection() {
  return (
    <section aria-labelledby="hero-section">
      <div className="border-edge [&_*]:border-edge border-b px-4">
        <div className="mx-auto max-w-[1024px] border-x">
          <HeroContextMenu>
            <div aria-hidden="true">
              <Suspense fallback={<BlinkingGridPlaceholder />}>
                <BlinkingGrid />
              </Suspense>
            </div>
          </HeroContextMenu>
        </div>
      </div>

      <div className="border-edge [&_*:not(.avatar)]:border-edge border-b px-4">
        <div
          className={cn(
            "mx-auto h-30 max-w-[1024px] border-x md:h-40",
            "grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr]",
          )}
        >
          <div className="border-r">
            <img
              src="/images/avatar.gif"
              alt="ULTRA INSTINCT"
              width="160px"
              height="160px"
              className={cn(
                "avatar aspect-square size-full rounded-full border-2 object-cover",
                "p-0.5 hover:p-0 hover:opacity-100 md:opacity-85",
                "transition-all duration-300",
              )}
            />
          </div>

          <div className="flex flex-col justify-end">
            <div className="flex flex-1 grow items-end mask-r-from-60% pb-1 pl-2 sm:pl-4">
              <div className="text-muted-foreground line-clamp-1 font-mono text-xs select-none sm:text-sm">
                {"text-3xl "}
                <span className="inline dark:hidden">text-zinc-400</span>
                <span className="hidden dark:inline">text-zinc-700</span>
                {" font-medium"}
              </div>
            </div>
            <div className="border-y">
              <h1 className="font-heading flex items-center pl-2 text-xl font-medium sm:pl-4 sm:text-3xl">
                Ishmam Rahman&nbsp;
                <SimpleTooltip content="A cool shield icon">
                  <ShieldCheckIcon className="size-[0.7em] text-[oklch(0.67_0.17_244.98)]" />
                </SimpleTooltip>
              </h1>
            </div>
            <div className="py-1 pl-2 sm:h-auto sm:pl-4">
              <FlipSentences
                sentences={[
                  "Software Engineer",
                  "Generalist",
                  "I code",
                  "Who let the dogs out ?!",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
