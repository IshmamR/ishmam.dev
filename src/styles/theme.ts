import { TPalette, TTheme } from "../hooks/useTheme";

export const PALETTE_SWATCH: Record<
  TPalette,
  Record<
    TTheme,
    Record<
      "primary" | "secondary" | "accent" | "destructive" | "muted",
      `oklch(${number} ${number} ${number})`
    >
  >
> = {
  classic: {
    light: {
      primary: "oklch(0.179 0.005 285.823)",
      secondary: "oklch(0.967 0.001 286.375)",
      accent: "oklch(0.967 0.001 286.375)",
      destructive: "oklch(0.577 0.245 27.325)",
      muted: "oklch(0.967 0.001 286.375)",
    },
    dark: {
      primary: "oklch(0.985 0 0)",
      secondary: "oklch(0.274 0.006 286.033)",
      accent: "oklch(0.274 0.006 286.033)",
      destructive: "oklch(0.577 0.245 27.325)",
      muted: "oklch(0.274 0.006 286.033)",
    },
  },
  neon: {
    light: {
      primary: "oklch(0.7 0.25 150)",
      secondary: "oklch(0.97 0.02 150)",
      accent: "oklch(0.925 0.04 150)",
      destructive: "oklch(0.65 0.25 0)",
      muted: "oklch(0.97 0.02 150)",
    },
    dark: {
      primary: "oklch(0.7 0.25 150)",
      secondary: "oklch(0.15 0.05 150)",
      accent: "oklch(0.15 0.05 150)",
      destructive: "oklch(0.7 0.25 0)",
      muted: "oklch(0.15 0.05 150)",
    },
  },
  ocean: {
    light: {
      primary: "oklch(0.55 0.15 220)",
      secondary: "oklch(0.9 0.02 220)",
      accent: "oklch(0.85 0.04 220)",
      destructive: "oklch(0.6 0.2 20)",
      muted: "oklch(0.9 0.02 220)",
    },
    dark: {
      primary: "oklch(0.7 0.15 220)",
      secondary: "oklch(0.25 0.06 220)",
      accent: "oklch(0.35 0.08 220)",
      destructive: "oklch(0.7 0.2 20)",
      muted: "oklch(0.25 0.06 220)",
    },
  },
  forest: {
    light: {
      primary: "oklch(0.55 0.18 140)",
      secondary: "oklch(0.85 0.04 110)",
      accent: "oklch(0.8 0.1 170)",
      destructive: "oklch(0.7 0.18 30)",
      muted: "oklch(0.9 0.03 140)",
    },
    dark: {
      primary: "oklch(0.68 0.16 140)",
      secondary: "oklch(0.28 0.09 110)",
      accent: "oklch(0.38 0.1 170)",
      destructive: "oklch(0.6 0.18 30)",
      muted: "oklch(0.22 0.07 140)",
    },
  },
  sunset: {
    light: {
      primary: "oklch(0.55 0.15 30)",
      secondary: "oklch(0.9 0.04 30)",
      accent: "oklch(0.85 0.06 30)",
      destructive: "oklch(0.6 0.2 20)",
      muted: "oklch(0.9 0.04 30)",
    },
    dark: {
      primary: "oklch(0.7 0.12 30)",
      secondary: "oklch(0.25 0.02 286)",
      accent: "oklch(0.35 0.03 286)",
      destructive: "oklch(0.75 0.15 20)",
      muted: "oklch(0.25 0.02 286)",
    },
  },
  monokai: {
    light: {
      primary: "oklch(0.247 0.045 142.6)",
      secondary: "oklch(0.899 0.125 104.6)",
      accent: "oklch(0.819 0.184 134.2)",
      destructive: "oklch(0.547 0.233 22.2)",
      muted: "oklch(0.965 0.005 104.6)",
    },
    dark: {
      primary: "oklch(0.972 0.006 112.5)",
      secondary: "oklch(0.347 0.035 104.6)",
      accent: "oklch(0.819 0.184 134.2)",
      destructive: "oklch(0.547 0.233 22.2)",
      muted: "oklch(0.298 0.031 104.6)",
    },
  },
};
