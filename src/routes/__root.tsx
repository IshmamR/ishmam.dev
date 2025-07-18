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
        title: "Ishmam",
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

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="min-h-dvh">
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
        <Scripts />

        <TanStackRouterDevtools position="bottom-left" />
      </body>
    </html>
  );
}
