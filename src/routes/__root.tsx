/// <reference types="vite/client" />

import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";
import { lazy, Suspense } from "react";
import globalCss from "@/styles/global.css?url";
import { Footer } from "../components/sections/Footer";
import { Header } from "../components/sections/Header";

const loadFeatures = () => import("motion/react").then((res) => res.domMax);

const LazyScrollTop = lazy(() => import("../components/motion/ScrollTop"));

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ishmam - Full-stack & Beyond" },
      {
        name: "description",
        content: "Minimal portfolio website of Ishmam Rahman.",
      },
      {
        name: "keywords",
        content:
          "Ishmam Rahman, full-stack, developer, portfolio, web, software, engineer, TypeScript, Bun, Tanstack",
      },
      { name: "author", content: "Ishmam Rahman" },
      { name: "theme-color", content: "#18181b" },
      // Open Graph
      { property: "og:title", content: "Ishmam - Full-stack & Beyond" },
      {
        property: "og:description",
        content: "Minimal portfolio website of Ishmam Rahman.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ishmam.dev/" },
      {
        property: "og:image",
        content: "https://ishmam.dev/images/og-image.png",
      },
      // Twitter Card
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Ishmam - Full-stack & Beyond" },
      {
        name: "twitter:description",
        content: "Minimal portfolio website of Ishmam Rahman.",
      },
      {
        name: "twitter:image",
        content: "https://ishmam.dev/images/avatar.gif",
      },
    ],
    links: [{ rel: "stylesheet", href: globalCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function _chooseThemeOnLoad() {
  const palettesClasses = [
    "palette-classic",
    "palette-doom",
    "palette-starry-night",
    "palette-candyland",
    "palette-nature",
    "palette-claude",
  ];

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  let theme = getSystemTheme();
  let palette = "starry-night";

  try {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.remove(...palettesClasses);

    const themeStore = localStorage.getItem("theme-store");
    if (themeStore) {
      const { state } = JSON.parse(themeStore);
      if (state) {
        if (state.theme) theme = state.theme;
        if (state.palette) palette = state.palette;
      }
    }
  } catch (_) {
  } finally {
    document.documentElement.classList.add(theme);
    document.documentElement.classList.add(`palette-${palette}`);
  }

  if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
    document.documentElement.classList.add("os-macos");
  }
}

// Minified, so we load a tiny bit faster
const chooseThemeOnLoadMinifiedString =
  // biome-ignore lint: reasonbiome(suspicious/noTemplateCurlyInString)
  'function ctol(){let e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",t="starry-night";try{document.documentElement.classList.remove("light","dark"),document.documentElement.classList.remove(...["palette-classic","palette-doom","palette-starry-night","palette-candyland","palette-nature","palette-claude",]);let a=localStorage.getItem("theme-store");if(a){let{state:l}=JSON.parse(a);l&&(l.theme&&(e=l.theme),l.palette&&(t=l.palette))}}catch(s){}finally{document.documentElement.classList.add(e),document.documentElement.classList.add(`palette-${t}`)}/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)&&document.documentElement.classList.add("os-macos")}ctol();';

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ishmam Rahman",
  url: "https://ishmam.dev/",
  image: "https://ishmam.dev/images/avatar.gif",
  sameAs: [
    "https://github.com/IshmamR",
    "https://linkedin.com/in/ishmamr",
    "https://www.ishmam.dev/",
    "https://x.com/ishmam_dev",
  ],
  jobTitle: "Senior Software Engineer",
  description: "Minimal portfolio website of Ishmam Rahman.",
  worksFor: {
    "@type": "Organization",
    name: "Headless Technologies LTD.",
    url: "https://headless.ltd/",
  },
};

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: chooseThemeOnLoadMinifiedString,
          }}
        />
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <HeadContent />
      </head>

      <body>
        <LazyMotion features={loadFeatures} strict>
          <Header />
          <main>{children}</main>
          <Suspense fallback={null}>
            <LazyScrollTop />
          </Suspense>
          <Footer />
        </LazyMotion>

        <Scripts />

        <TanStackRouterDevtools position="bottom-left" />
      </body>
    </html>
  );
}
