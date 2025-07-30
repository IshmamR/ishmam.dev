import { useCallback, useLayoutEffect, useState } from "react";

const THEME = [
  { name: "Light", key: "light" },
  { name: "Dark", key: "dark" },
] as const;
export const themes = THEME.map((theme) => theme.key);
export type TTheme = (typeof themes)[number];

export const PALETTE = [
  { name: "Classic", key: "classic" },
  { name: "Neon", key: "neon" },
  { name: "Ocean", key: "ocean" },
  { name: "Forest", key: "forest" },
  { name: "Sunset", key: "sunset" },
  { name: "Monokai", key: "monokai" },
] as const;
export const palettes = PALETTE.map((palette) => palette.key);
export type TPalette = (typeof palettes)[number];

export const DEFAULT_THEME = "dark";
export const DEFAULT_PALETTE = "forest";

export function useTheme() {
  const [theme, setTheme] = useState<TTheme>("dark");
  const [palette, setPalette] = useState<TPalette>(DEFAULT_PALETTE);

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem("theme") as TTheme | null;
    const localPalette = localStorage.getItem("palette") as TPalette | null;
    setTheme(localTheme ?? "dark");
    setPalette(localPalette ?? DEFAULT_PALETTE);
  }, []);

  function changeTheme(t: TTheme) {
    document.documentElement.classList.remove(t === "dark" ? "light" : "dark");
    document.documentElement.classList.add(t);
    setTheme(t);
    localStorage.setItem("theme", t);
  }

  const changePalette = useCallback((pal: TPalette) => {
    setPalette((prev) => {
      document.documentElement.classList.remove(`palette-${prev}`);
      document.documentElement.classList.add(`palette-${pal}`);
      localStorage.setItem("palette", pal);
      return pal;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.remove(prev);
      document.documentElement.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  return { theme, palette, changeTheme, changePalette, toggleTheme };
}
