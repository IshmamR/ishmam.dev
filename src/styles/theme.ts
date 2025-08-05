import type { TPalette, TTheme } from "../stores/theme.store";

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
      primary: "oklch(0 0 0)",
      secondary: "oklch(0.9400 0 0)",
      accent: "oklch(0.9400 0 0)",
      destructive: "oklch(0.6300 0.1900 23.0300)",
      muted: "oklch(0.9700 0 0)",
    },
    dark: {
      primary: "oklch(1 0 0)",
      secondary: "oklch(0.37 0.013 285.805)",
      accent: "oklch(0.3200 0 0)",
      destructive: "oklch(0.6900 0.2000 23.9100)",
      muted: "oklch(0.2300 0 0)",
    },
  },
  doom: {
    light: {
      primary: "oklch(0.5016 0.1887 27.4816)",
      secondary: "oklch(0.4955 0.0896 126.1858)",
      accent: "oklch(0.5880 0.0993 245.7394)",
      destructive: "oklch(0.7076 0.1975 46.4558)",
      muted: "oklch(0.7826 0 0)",
    },
    dark: {
      primary: "oklch(0.6083 0.2090 27.0276)",
      secondary: "oklch(0.6423 0.1467 133.0145)",
      accent: "oklch(0.7482 0.1235 244.7492)",
      destructive: "oklch(0.7839 0.1719 68.0943)",
      muted: "oklch(0.2645 0 0)",
    },
  },
  "starry-night": {
    light: {
      primary: "oklch(0.4815 0.1178 263.3758)",
      secondary: "oklch(0.8567 0.1164 81.0092)",
      accent: "oklch(0.6896 0.0714 234.0387)",
      destructive: "oklch(0.2611 0.0376 322.5267)",
      muted: "oklch(0.9202 0.0080 106.5563)",
    },
    dark: {
      primary: "oklch(0.4815 0.1178 263.3758)",
      secondary: "oklch(0.9097 0.1440 95.1120)",
      accent: "oklch(0.8469 0.0524 264.7751)",
      destructive: "oklch(0.5280 0.1200 357.1130)",
      muted: "oklch(0.2703 0.0407 281.3036)",
    },
  },
  candyland: {
    light: {
      primary: "oklch(0.8677 0.0735 7.0855)",
      secondary: "oklch(0.8148 0.0819 225.7537)",
      accent: "oklch(0.9680 0.2110 109.7692)",
      destructive: "oklch(0.6368 0.2078 25.3313)",
      muted: "oklch(0.8828 0.0285 98.1033)",
    },
    dark: {
      primary: "oklch(0.8027 0.1355 349.2347)",
      secondary: "oklch(0.7395 0.2268 142.8504)",
      accent: "oklch(0.8148 0.0819 225.7537)",
      destructive: "oklch(0.6368 0.2078 25.3313)",
      muted: "oklch(0.3867 0 0)",
    },
  },
  claude: {
    light: {
      primary: "oklch(0.6171 0.1375 39.0427)",
      secondary: "oklch(0.9245 0.0138 92.9892)",
      accent: "oklch(0.9245 0.0138 92.9892)",
      destructive: "oklch(0.1908 0.0020 106.5859)",
      muted: "oklch(0.9341 0.0153 90.2390)",
    },
    dark: {
      primary: "oklch(0.6724 0.1308 38.7559)",
      secondary: "oklch(0.9818 0.0054 95.0986)",
      accent: "oklch(0.2130 0.0078 95.4245)",
      destructive: "oklch(0.6368 0.2078 25.3313)",
      muted: "oklch(0.2213 0.0038 106.7070)",
    },
  },
  nature: {
    light: {
      primary: "oklch(0.5234 0.1347 144.1672)",
      secondary: "oklch(0.645 0.246 16.439)",
      accent: "oklch(0.8952 0.0504 146.0366)",
      destructive: "oklch(0.5386 0.1937 26.7249)",
      muted: "oklch(0.9370 0.0142 74.4218)",
    },
    dark: {
      primary: "oklch(0.6731 0.1624 144.2083)",
      secondary: "oklch(0.455 0.188 13.697)",
      accent: "oklch(0.5752 0.1446 144.1813)",
      destructive: "oklch(0.5386 0.1937 26.7249)",
      muted: "oklch(0.3327 0.0271 146.9867)",
    },
  },
};
