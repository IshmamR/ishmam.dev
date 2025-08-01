import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import { SOCIAL_LINKS } from "../../data";
import { SocialLink } from "../../types";

function SocialLinkItem(props: SocialLink) {
  return (
    <a
      className={cn(
        "group/social-link flex cursor-pointer items-center gap-4 rounded-2xl p-4 transition-colors select-none",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
      href={props.href}
      target="_blank"
      rel="noopener"
    >
      <div className="relative size-12 shrink-0">
        <img
          className="rounded-xl object-contain aspect-square"
          src={props.icon}
          alt={`${props.title}'s icon`}
          width={48}
          height={48}
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/8 ring-inset dark:ring-white/8" />
      </div>

      <div className="flex-1">
        <p className="flex items-center font-heading font-medium decoration-ring underline-offset-4 group-hover/social-link:underline">
          {props.title}
        </p>

        {props.description ? (
          <p className="font-mono text-sm text-muted-foreground">
            {props.description}
          </p>
        ) : null}
      </div>

      <ArrowUpRightIcon className="size-4 text-muted-foreground" />
    </a>
  );
}

export function SocialLinksSection() {
  return (
    <section className="overflow-clip border-edge [&_*]:border-edge px-4">
      <h2 className="sr-only">Social Links</h2>

      <div className="mx-auto border-x max-w-[1024px]">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
            <div className="border-r border-edge"></div>
            <div className="border-l border-edge"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SOCIAL_LINKS.map((link, index) => {
              return <SocialLinkItem key={index} {...link} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
