/// <reference types="vite/client" />

import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import globalCss from "@/styles/global.css?url";
import { Footer } from "../components/sections/Footer";
import { Header } from "../components/sections/Header";

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

  const defaultPalette = "starry-night";

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  const themeStore = localStorage.getItem("theme-store");
  if (!themeStore) {
    const theme = getSystemTheme();
    document.documentElement.classList.add(theme);
    document.documentElement.classList.add(`palette-${defaultPalette}`);
    return;
  }

  try {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.remove(...palettesClasses);

    const { state } = JSON.parse(themeStore);
    if (!state) {
      const theme = getSystemTheme();
      document.documentElement.classList.add(theme);
      document.documentElement.classList.add(`palette-${defaultPalette}`);
      return;
    }

    let theme = state.theme;
    if (!theme) {
      theme = getSystemTheme();
    }

    document.documentElement.classList.add(theme);
    document.documentElement.classList.add(
      `palette-${state.palette ?? defaultPalette}`,
    );
  } catch (_) {
    const theme = getSystemTheme();
    document.documentElement.classList.add(theme);
    document.documentElement.classList.add(`palette-${defaultPalette}`);
  }
}

// Minified, so we load a tiny bit faster
const chooseThemeOnLoadMinifiedString =
  // biome-ignore lint: reasonbiome(suspicious/noTemplateCurlyInString)
  'function chooseThemeOnLoad(){let e="starry-night";function t(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}let a=localStorage.getItem("theme-store");if(!a){let l=t();document.documentElement.classList.add(l),document.documentElement.classList.add(`palette-${e}`);return}try{document.documentElement.classList.remove("light","dark"),document.documentElement.classList.remove(...["palette-classic","palette-doom","palette-starry-night","palette-candyland","palette-nature","palette-claude",]);let{state:s}=JSON.parse(a);if(!s){let c=t();document.documentElement.classList.add(c),document.documentElement.classList.add(`palette-${e}`);return}let d=s.theme;d||(d=t()),document.documentElement.classList.add(d),document.documentElement.classList.add(`palette-${s.palette??e}`)}catch(n){let m=t();document.documentElement.classList.add(m),document.documentElement.classList.add(`palette-${e}`)}}chooseThemeOnLoad();';

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
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
        <Header />
        <main>{children}</main>
        <Footer />

        <Scripts />

        <TanStackRouterDevtools position="bottom-left" />
      </body>
    </html>
  );
}
