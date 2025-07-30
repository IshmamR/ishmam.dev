import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      customViteReactPlugin: true,
      target: "bun",
      pages: [
        { path: "/", prerender: { enabled: true, outputPath: "/index.html" } },
      ],
    }),
    viteReact(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          start: ["@tanstack/react-start"],
        },
      },
    },
  },
});
