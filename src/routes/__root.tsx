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

function chooseThemeOnLoad() {
  const palettesClasses = [
    "palette-classic",
    "palette-neon",
    "palette-ocean",
    "palette-forest",
    "palette-sunset",
    "palette-monokai",
  ];

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  const themeStore = localStorage.getItem("theme-store");
  if (!themeStore) {
    const theme = getSystemTheme();
    document.documentElement.classList.add(theme);
    document.documentElement.classList.add("palette-classic");
    return;
  }

  try {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.remove(...palettesClasses);

    const { state } = JSON.parse(themeStore);
    if (!state) {
      const theme = getSystemTheme();
      document.documentElement.classList.add(theme);
      document.documentElement.classList.add("palette-classic");
      return;
    }

    let theme = state.theme;
    if (!theme) {
      theme = getSystemTheme();
    }

    document.documentElement.classList.add(theme);
    document.documentElement.classList.add(
      `palette-${state.palette ?? "classic"}`
    );
  } catch (_e) {
    const theme = getSystemTheme();
    document.documentElement.classList.add(theme);
    document.documentElement.classList.add("palette-classic");
  }
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${chooseThemeOnLoad.toString()})()`,
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
