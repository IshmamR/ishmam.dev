import { ProseMd } from "../ProseMD";

const ABOUT_MD = `
Me Ishmam. Me software engineer. Me have **_5+_** years of experience in web. But me try to be a **_generalist_**. \
Me like work on interesting projects — be it web, native, AI, or even embedded. Me like pushing tech to it limit.

> "Why waste time say lot word when few word do trick?"
> — Future president

Me happiest in small teams, shipping fast. Me like building projects from scratch. Me build **_scalable_** software even if user is only bot attacks.

> "Many small time, make big time."

When me get free time, me explore new tech and breakthroughs in industry. Currently, me exploring 🦀\
[rust](https://www.rust-lang.org/) in AI and embedded world.
`;

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-edge [&_*]:border-edge overflow-clip border-y px-4"
    >
      <div className="mx-auto max-w-[1024px] border-x">
        <div className="screen-line-after px-4">
          <h2 className="font-heading text-3xl font-medium">About</h2>
        </div>

        <div className="p-4">
          <ProseMd>{ABOUT_MD}</ProseMd>
        </div>
      </div>
    </section>
  );
}
