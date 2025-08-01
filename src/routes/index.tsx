import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "../components/sections/About";
import { ExperienceSection } from "../components/sections/Experience";
import { HeroSection } from "../components/sections/Hero";
import { OverviewSection } from "../components/sections/Overview";
import { ProjectsSection } from "../components/sections/Projects";
import { SeparatorPattern } from "../components/sections/SeparatorPattern";
import { SocialLinksSection } from "../components/sections/SocialLinks";
import { TechStackSection } from "../components/sections/TechStack";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSection />
      <SeparatorPattern />

      <OverviewSection />
      <SeparatorPattern />

      <SocialLinksSection />
      <SeparatorPattern />

      <AboutSection />
      <SeparatorPattern />

      <TechStackSection />
      <SeparatorPattern />

      <ExperienceSection />
      <SeparatorPattern />

      <ProjectsSection />
      <SeparatorPattern />
    </>
  );
}
