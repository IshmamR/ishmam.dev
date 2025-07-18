import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/theme-demo")({
  component: RouteComponent,
});

const themes = [
  { name: "Classic", key: "classic" },
  { name: "Neon", key: "neon" },
  { name: "Ocean", key: "ocean" },
  { name: "Forest", key: "forest" },
  { name: "Sunset", key: "sunset" },
  { name: "Monokai", key: "monokai" },
];

const modes = [
  { name: "Light", key: "light" },
  { name: "Dark", key: "dark" },
];

function RouteComponent() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [modeIdx, setModeIdx] = useState(0);

  const themeClass = `theme-${themes[themeIdx].key}`;
  const modeClass = modes[modeIdx].key;

  // Apply theme and mode to html element
  useEffect(() => {
    document.documentElement.className = `${themeClass} ${modeClass}`.trim();
    return () => {
      document.documentElement.className = "";
    };
  }, [themeClass, modeClass]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-8">
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded bg-primary text-primary-foreground border border-border"
          onClick={() => setThemeIdx((themeIdx + 1) % themes.length)}
        >
          Switch Theme ({themes[themeIdx].name})
        </button>
        <button
          className="px-4 py-2 rounded bg-secondary text-secondary-foreground border border-border"
          onClick={() => setModeIdx((modeIdx + 1) % modes.length)}
        >
          Switch Mode ({modes[modeIdx].name})
        </button>
      </div>
      <div className="w-full max-w-lg p-8 rounded-lg shadow-lg bg-card text-foreground border border-border">
        <h1 className="text-3xl font-bold mb-4">
          Theme Preview: {themes[themeIdx].name} ({modes[modeIdx].name})
        </h1>
        <p className="mb-2">
          This is a demonstration of your theme system. All colors below use
          Tailwind classes mapped to CSS variables.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded bg-primary text-primary-foreground">
            Primary
          </div>
          <div className="p-4 rounded bg-secondary text-secondary-foreground">
            Secondary
          </div>
          <div className="p-4 rounded bg-accent text-accent-foreground">
            Accent
          </div>
          <div className="p-4 rounded bg-muted text-muted-foreground">
            Muted
          </div>
          <div className="p-4 rounded bg-destructive text-destructive">
            Destructive
          </div>
          <div className="p-4 rounded bg-card text-card-foreground">Card</div>
        </div>
      </div>
    </div>
  );
}
