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
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Ishmam - Full-stack & Beyond" },
      {
        name: "description",
        content: "Minimal portfolio website of Ishmam Rahman.",
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

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            // __html: `(${_chooseThemeOnLoad.toString()})()`,
            __html: chooseThemeOnLoadMinifiedString,
          }}
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
