import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "../components/sections/About";
import { HeroSection } from "../components/sections/Hero";
import { OverviewSection } from "../components/sections/Overview";
import { Pattern } from "../components/sections/Pattern";
import { SocialLinksSection } from "../components/sections/SocialLinks";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSection />
      <Pattern />

      <OverviewSection />
      <Pattern />

      <SocialLinksSection />
      <Pattern />

      <AboutSection />
      <Pattern />
    </>
  );
}
