import {
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  ExternalLinkIcon,
  FolderIcon,
  InfinityIcon,
} from "lucide-react";
import { PROJECTS } from "../../data";
import type { TProject } from "../../types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Tag } from "../ui/tag";
import { SimpleTooltip } from "../ui/tooltip";

export function ProjectItem({
  className,
  project,
}: {
  className?: string;
  project: TProject;
}) {
  return (
    <Collapsible defaultOpen={project.isExpanded} asChild>
      <div className={className}>
        <div className="flex items-center">
          {project.slug ? (
            <img
              src={`/assets/projects/${project.slug}.webp`}
              alt={project.title}
              width={32}
              height={32}
              className="mx-4 flex size-6 shrink-0"
              aria-hidden="true"
            />
          ) : (
            <div
              className="text-muted-foreground mx-4 flex size-6 shrink-0 items-center justify-center"
              aria-hidden="true"
            >
              <FolderIcon className="size-5" />
            </div>
          )}

          <div className="border-edge flex-1 border-l border-dashed">
            <CollapsibleTrigger className="group/project flex w-full items-center gap-4 p-4 pr-2 text-left select-none">
              <div className="flex-1">
                <h3 className="decoration-ring mb-1 inline-flex items-center gap-2 leading-snug font-medium text-balance underline-offset-4 group-hover/project:underline">
                  {project.title}
                  <SimpleTooltip content="Open Project Link">
                    <a
                      className="text-muted-foreground hover:text-foreground flex size-6 shrink-0 items-center justify-center"
                      href={project.link}
                      target="_blank"
                      rel="noopener"
                    >
                      <ExternalLinkIcon className="pointer-events-none size-4" />
                      <span className="sr-only">Open Project Link</span>
                    </a>
                  </SimpleTooltip>
                </h3>

                <dl className="text-muted-foreground text-sm">
                  <dt className="sr-only">Period</dt>
                  <dd className="flex items-center gap-0.5">
                    <span>{project.period.start}</span>
                    <span className="font-mono">—</span>
                    {!project.period.end ? (
                      <>
                        <InfinityIcon
                          className="size-4.5 translate-y-[0.5px]"
                          aria-hidden
                        />
                        <span className="sr-only">Present</span>
                      </>
                    ) : (
                      <span>{project.period.end}</span>
                    )}
                  </dd>
                </dl>
              </div>

              <div
                className="text-muted-foreground shrink-0 [&_svg]:size-4"
                aria-hidden
              >
                <ChevronsDownUpIcon className="hidden group-data-[state=open]/project:block" />
                <ChevronsUpDownIcon className="hidden group-data-[state=closed]/project:block" />
              </div>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden duration-300">
          <div className="border-edge space-y-4 border-t border-dashed p-4">
            {/* {project.description && (
              <Prose>
                <Markdown>{project.description}</Markdown>
              </Prose>
            )} */}

            {project.skills?.length ? (
              <ul className="flex flex-wrap gap-1.5 pt-2 pl-9">
                {project.skills.map((skill) => (
                  <li key={`project-${skill.title}`} className="flex">
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
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="border-edge [&_*]:border-edge overflow-clip border-y px-4"
    >
      <div className="mx-auto max-w-[1024px] border-x">
        <div className="screen-line-after px-4">
          <h2 className="font-heading text-3xl font-medium">
            Projects
            <sup className="text-muted-foreground ml-1 font-mono text-sm select-none">
              ({PROJECTS.length})
            </sup>
          </h2>
        </div>

        <div className="">
          {PROJECTS.map((project) => (
            <div key={project.id} className="border-edge border-b">
              <ProjectItem project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
