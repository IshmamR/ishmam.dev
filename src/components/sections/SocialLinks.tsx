import { ArrowUpRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "../../data";
import type { TSocialLink } from "../../types";

function SocialLinkItem(props: TSocialLink) {
  return (
    <a
      className={cn(
        "group/social-link flex cursor-pointer items-center gap-4 rounded-2xl p-4 transition-colors select-none",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after",
      )}
      href={props.href}
      target="_blank"
      rel="noopener"
    >
      <div className="relative size-12 shrink-0">
        <img
          className="aspect-square rounded-xl object-contain"
          src={props.icon}
          alt={`${props.title}'s icon`}
          width={48}
          height={48}
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/8 ring-inset dark:ring-white/8" />
      </div>

      <div className="flex-1">
        <p className="font-heading decoration-ring flex items-center font-medium underline-offset-4 group-hover/social-link:underline">
          {props.title}
        </p>

        {props.description ? (
          <p className="text-muted-foreground font-mono text-sm">
            {props.description}
          </p>
        ) : null}
      </div>

      <ArrowUpRightIcon className="text-muted-foreground size-4" />
    </a>
  );
}

export function SocialLinksSection() {
  return (
    <section className="border-edge [&_*]:border-edge overflow-clip px-4">
      <h2 className="sr-only">Social Links</h2>

      <div className="mx-auto max-w-[1024px] border-x">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
            <div className="border-edge border-r"></div>
            <div className="border-edge border-l"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SOCIAL_LINKS.map((link) => {
              return <SocialLinkItem key={link.href} {...link} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
