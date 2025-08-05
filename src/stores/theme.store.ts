import { create } from "zustand";
import { persist } from "zustand/middleware";

const THEME = [
  { name: "Light", key: "light" },
  { name: "Dark", key: "dark" },
] as const;
export const themes = THEME.map((theme) => theme.key);
export type TTheme = (typeof themes)[number];

export const PALETTE = [
  { name: "Classic", key: "classic" },
  { name: "Doom", key: "doom" },
  { name: "Starry Night", key: "starry-night" },
  { name: "Candyland", key: "candyland" },
  { name: "Nature", key: "nature" },
  { name: "Claude", key: "claude" },
] as const;
export const palettes = PALETTE.map((palette) => palette.key);
export type TPalette = (typeof palettes)[number];

interface IThemStore {
  theme: TTheme;
  palette: TPalette;
  setTheme: (theme: TTheme) => void;
  setPalette: (pal: TPalette) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<IThemStore>()(
  persist(
    (set, get) => ({
      theme: "dark",
      palette: "starry-night",
      setTheme: (theme) => {
        const currentTheme = get().theme;
        document.documentElement.classList.remove(currentTheme);
        document.documentElement.classList.add(theme);
        set({ theme });
      },
      setPalette: (palette) => {
        const currentPalette = get().palette;
        document.documentElement.classList.remove(`palette-${currentPalette}`);
        document.documentElement.classList.add(`palette-${palette}`);
        set({ palette });
      },
      toggleTheme: () => {
        const currentTheme = get().theme;
        document.documentElement.classList.remove(currentTheme);
        const theme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.classList.add(theme);
        set({ theme });
      },
    }),
    { name: "theme-store" },
  ),
);
