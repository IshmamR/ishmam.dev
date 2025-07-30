/// <reference types="vite/client" />

import globalCss from "@/styles/global.css?url";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { Footer } from "../components/sections/Footer";
import { Header } from "../components/sections/Header";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Ishmam - Full-stack & Beyond",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: globalCss,
      },
    ],
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
  let theme = localStorage.getItem("theme");
  if (!theme) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  const palette = localStorage.getItem("palette") || "monokai";
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  document.documentElement.classList.remove(
    "palette-classic",
    "palette-neon",
    "palette-ocean",
    "palette-forest",
    "palette-sunset",
    "palette-monokai"
  );
  document.documentElement.classList.add(`palette-${palette}`);
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
