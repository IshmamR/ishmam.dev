import {
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  CodeXmlIcon,
  InfinityIcon,
} from "lucide-react";
import { EXPERIENCES } from "../../data";
import { cn } from "../../lib/utils";
import type { TExperiencePosition } from "../../types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Separator } from "../ui/separator";
import { Tag } from "../ui/tag";

function ExperiencePositionItem({
  position,
}: {
  position: TExperiencePosition;
}) {
  return (
    <Collapsible defaultOpen={position.defaultExpanded} asChild>
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <CollapsibleTrigger className="group/experience block w-full text-left select-none">
          <div className="relative z-1 mb-1 flex items-center gap-3 bg-background">
            <div
              className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground dark:inset-shadow-[1px_1px_1px,0px_0px_1px] dark:inset-shadow-white/15"
              aria-hidden
            >
              {position.icon ? (
                <position.icon className="size-4" />
              ) : (
                <CodeXmlIcon className="size-4" />
              )}
            </div>

            <h4 className="flex-1 font-medium text-balance decoration-ring underline-offset-4 group-hover/experience:underline">
              {position.title}
            </h4>

            <div
              className="shrink-0 text-muted-foreground [&_svg]:size-4"
              aria-hidden
            >
              <ChevronsDownUpIcon className="hidden group-data-[state=open]/experience:block" />
              <ChevronsUpDownIcon className="hidden group-data-[state=closed]/experience:block" />
            </div>
          </div>

          <div className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
            {position.employmentType ? (
              <>
                <dl>
                  <dt className="sr-only">Employment Type</dt>
                  <dd>{position.employmentType}</dd>
                </dl>

                <Separator
                  className="data-[orientation=vertical]:h-4"
                  orientation="vertical"
                />
              </>
            ) : null}

            <dl>
              <dt className="sr-only">Employment Period</dt>
              <dd className="flex items-center gap-0.5">
                <span>{position.employmentPeriod.start}</span>
                <span className="font-mono">—</span>
                {!position.employmentPeriod.end ? (
                  <>
                    <InfinityIcon
                      className="size-4.5 translate-y-[0.5px]"
                      aria-hidden
                    />
                    <span className="sr-only">Present</span>
                  </>
                ) : (
                  <span>{position.employmentPeriod.end}</span>
                )}
              </dd>
            </dl>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {/* {position.description && (
            <Prose className="pt-2 pl-9">
              <Markdown>{position.description}</Markdown>
            </Prose>
          )} */}

          {position.skills?.length ? (
            <ul className="flex flex-wrap gap-1.5 pt-2 pl-9">
              {position.skills.map((skill) => (
                <li key={skill.title} className="flex">
                  <Tag className="gap-1">
                    {skill.iconSlug ? (
                      <img
                        src={`/assets/dev-icons/${skill.iconSlug}.svg`}
                        alt={skill.title}
                        width={12}
                        height={12}
                      />
                    ) : null}
                    {skill.title}
                  </Tag>
                </li>
              ))}
            </ul>
          ) : null}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="border-y overflow-clip border-edge [&_*]:border-edge px-4"
    >
      <div className="mx-auto border-x max-w-[1024px]">
        <div className="screen-line-after px-4">
          <h2 className="font-heading text-3xl font-medium">Experience</h2>
        </div>

        <div className="p-4 pr-2">
          {EXPERIENCES.map((org, index) => (
            <div
              key={org.slug}
              className={cn(
                "space-y-4 py-4",
                index < EXPERIENCES.length - 1 ? "screen-line-after" : ""
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center">
                  <img
                    src={`/assets/companies/${org.slug}.webp`}
                    alt={org.organization}
                    width={24}
                    height={24}
                    className="object-contain"
                    aria-hidden
                  />
                </div>

                <h3 className="text-lg leading-snug font-medium">
                  {org.organization}
                </h3>

                {org.isCurrent ? (
                  <span className="relative flex items-center justify-center">
                    <span className="absolute inline-flex size-3 animate-ping rounded-full bg-success opacity-50" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                    <span className="sr-only">Current Employer</span>
                  </span>
                ) : null}
              </div>

              <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
                {org.positions.map((pos) => (
                  <ExperiencePositionItem key={pos.id} position={pos} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
