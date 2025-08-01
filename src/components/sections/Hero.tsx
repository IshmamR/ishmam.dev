import { cn } from "@/lib/utils";
import { ShieldCheckIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { HeroContextMenu } from "../HeroContextMenu";
import { BlinkingGridPlaceholder } from "../motion/BlinkingGridPlaceholder";
import { FlipSentences } from "../motion/FlipSentences";
import { SimpleTooltip } from "../ui/tooltip";

const BlinkingGrid = lazy(() => import("../motion/BlinkingGrid"));

export function HeroSection() {
  return (
    <section aria-labelledby="hero-section">
      <div className="border-b border-edge [&_*]:border-edge px-4">
        <div className="mx-auto max-w-[1024px] border-x">
          <HeroContextMenu>
            <div
              aria-label="Decorative grid showing initials (IR)"
              aria-hidden="true"
            >
              <Suspense fallback={<BlinkingGridPlaceholder />}>
                <BlinkingGrid />
              </Suspense>
            </div>
          </HeroContextMenu>
        </div>
      </div>

      <div className="border-b border-edge [&_*:not(.avatar)]:border-edge px-4">
        <div
          className={cn(
            "mx-auto border-x h-30 md:h-40 max-w-[1024px]",
            "grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr]"
          )}
        >
          <div className="border-r">
            <img
              src="/images/avatar.gif"
              alt="ULTRA INSTINCT"
              width="160px"
              height="160px"
              className={cn(
                "avatar size-full aspect-square rounded-full object-cover border-2",
                "md:opacity-85 hover:opacity-100 p-0.5 hover:p-0",
                "transition-all duration-300"
              )}
            />
          </div>

          <div className="flex flex-col justify-end">
            <div className="flex-1 flex grow items-end mask-r-from-60% pb-1 pl-2 sm:pl-4">
              <div className="line-clamp-1 font-mono text-xs sm:text-sm text-muted-foreground select-none">
                {"text-3xl "}
                <span className="inline dark:hidden">text-zinc-400</span>
                <span className="hidden dark:inline">text-zinc-700</span>
                {" font-medium"}
              </div>
            </div>
            <div className="border-y">
              <h1 className="flex items-center pl-2 sm:pl-4 font-heading text-xl sm:text-3xl font-medium">
                Ishmam Rahman&nbsp;
                <SimpleTooltip content="A cool shield icon">
                  <ShieldCheckIcon className="size-[0.7em] text-[oklch(0.67_0.17_244.98)]" />
                </SimpleTooltip>
              </h1>
            </div>
            <div className="py-1 pl-2 sm:pl-4 sm:h-auto">
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
