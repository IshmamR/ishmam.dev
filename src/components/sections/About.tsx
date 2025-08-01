import { cn } from "../../lib/utils";

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-y overflow-clip border-edge [&_*]:border-edge px-4"
    >
      <div className="mx-auto border-x max-w-[1024px]">
        <div className="screen-line-after px-4">
          <h2 className="font-heading text-3xl font-medium">About</h2>
        </div>

        <div className="p-4">
          <div
            className={cn(
              "prose prose-sm max-w-none font-mono text-foreground prose-zinc dark:prose-invert",
              "prose-headings:font-heading prose-headings:font-semibold prose-headings:text-balance",
              "prose-h2:border-b prose-h2:pb-2",
              "prose-lead:text-base",
              "prose-a:font-semibold prose-a:break-words prose-a:text-foreground prose-a:underline prose-a:underline-offset-4",
              "prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
              "prose-hr:border-edge",
              "text-justify text-base"
            )}
          >
            <p>
              Me Ishmam. Me software engineer. Me have{" "}
              <strong>
                <em>5+</em> years
              </strong>{" "}
              of experience in web. But me try to be a{" "}
              <em>
                <strong>generalist</strong>
              </em>
              . Me like work on interesting projects — be it web, native, AI, or
              even embedded. Me like pushing tech to it limit.
            </p>
            <blockquote>
              Why say lot word when few word do trick - Future president
            </blockquote>
            <p>
              Me happiest in small teams, shipping fast. Me like building
              projects from scratch. Me build{" "}
              <em>
                <strong>scalable</strong>
              </em>{" "}
              software even if user is only bot attacks.
            </p>
            <p>
              When me get free time, me explore new tech and breakthroughs in
              industry. Currently, me exploring 🦀
              <a
                href="https://www.rust-lang.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                rust
              </a>{" "}
              in AI and embedded world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
