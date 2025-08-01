import { TECH_STACK } from "../../data";
import { type TTheme, useThemeStore } from "../../stores/theme.store";
import type { TechStack } from "../../types";
import { SimpleTooltip } from "../ui/tooltip";

function TechImage(props: TechStack & { currentTheme: TTheme }) {
  if (props.theme) {
    return (
      <img
        src={`/assets/dev-icons/${props.slug}-${props.currentTheme}.svg`}
        alt={`${props.title} ${props.currentTheme} icon`}
        width={34}
        height={34}
        loading="lazy"
      />
    );
  }

  return (
    <img
      src={`/assets/dev-icons/${props.slug}.svg`}
      alt={`${props.title} icon`}
      width={34}
      height={34}
      loading="lazy"
    />
  );
}

export function TechStackSection() {
  const theme = useThemeStore((s) => s.theme);

  return (
    <section
      id="stack"
      className="border-edge [&_*]:border-edge overflow-clip border-y px-4"
    >
      <div className="mx-auto max-w-[1024px] border-x">
        <div className="screen-line-after px-4">
          <h2 className="font-heading text-3xl font-medium">Tech Stack</h2>
        </div>

        <div className="flex flex-wrap gap-4 p-4 select-none">
          {TECH_STACK.map((item) => {
            return (
              <SimpleTooltip key={item.slug} content={item.title}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.title}
                >
                  <TechImage {...item} currentTheme={theme} />
                </a>
              </SimpleTooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
}
