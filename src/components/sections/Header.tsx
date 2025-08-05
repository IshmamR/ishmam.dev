import { Link, useLocation } from "@tanstack/react-router";
import { MoonStarIcon, PaletteIcon, SunIcon } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { PALETTE, useThemeStore } from "../../stores/theme.store";
import { PALETTE_SWATCH } from "../../styles/theme";
import { CommandMenu } from "../CommandMenu";
import { Logo } from "../icons/Logo";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Header() {
  const location = useLocation();

  const { scrollY } = useScroll();

  const theme = useThemeStore((s) => s.theme);
  const palette = useThemeStore((s) => s.palette);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const setPalette = useThemeStore((s) => s.setPalette);

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setVisible(latestValue >= 200);
  });

  return (
    <header className="border-edge bg-background [&_*]:border-edge sticky inset-x-0 top-0 z-50 mt-2 max-w-screen overflow-hidden border-y px-4">
      <nav className="screen-line-before screen-line-after mx-auto flex h-12 max-w-[1024px] items-center justify-between border-x px-4 py-2">
        <motion.div
          initial={{ opacity: 0, visibility: "hidden" }}
          animate={{
            opacity: visible ? 1 : 0,
            visibility: visible ? "visible" : "hidden",
          }}
        >
          <Link to="/" className="flex items-center gap-2">
            <Logo className="text-foreground aspect-[1/2] h-full" />
          </Link>
        </motion.div>

        <ul className="flex items-center gap-4 max-sm:hidden">
          <li>
            <Link
              to="/"
              className={cn(
                "text-muted-foreground font-mono text-sm font-medium transition-all duration-300",
                location.pathname === "/" && "text-foreground",
              )}
            >
              Ishmam
            </Link>
          </li>
          <li>
            <Link
              to="/"
              hash="projects"
              className={cn(
                "text-muted-foreground font-mono text-sm font-medium transition-all duration-300",
                location.pathname === "/#projects" && "text-foreground",
              )}
            >
              Projects
            </Link>
          </li>
          {/* <li>
            <Link
              to="/"
              className={cn(
                "font-mono text-sm font-medium text-muted-foreground transition-all duration-300",
                location.pathname === "/stats" && "text-foreground"
              )}
            >
              Stats
            </Link>
          </li> */}

          <li>
            <ul className="flex items-center gap-2 max-sm:hidden">
              <li>
                <CommandMenu />
              </li>

              <li>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  asChild
                >
                  <a
                    href="https://github.com/IshmamR/ishmam.dev"
                    target="_blank"
                    rel="noopener"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="Github icon"
                    >
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
              </li>

              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative rounded-full"
                      title={`Current: ${palette} - Click to choose palette`}
                    >
                      <PaletteIcon />
                      <div className="ring-background bg-primary absolute -right-0.5 -bottom-0.5 size-2 rounded-full ring-1"></div>
                      <span className="sr-only">Toggle palette</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <div className={cn("grid grid-cols-3 gap-2 p-2")}>
                      {PALETTE.map((p) => (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => setPalette(p.key)}
                          className={cn(
                            "flex flex-col items-center justify-between gap-1 rounded-sm border p-2 transition-all",
                            palette === p.key
                              ? "border-b-primary"
                              : "hover:border-muted border-transparent",
                          )}
                          tabIndex={0}
                        >
                          <span className="mb-1 font-mono text-xs">
                            {p.name}
                          </span>
                          <div className="flex gap-[1px]">
                            <span
                              className="border-edge h-3 w-3 rounded-xs border"
                              style={{
                                backgroundColor:
                                  PALETTE_SWATCH[p.key][theme].primary,
                              }}
                            />
                            <span
                              className="border-edge h-3 w-3 rounded-xs border"
                              style={{
                                backgroundColor:
                                  PALETTE_SWATCH[p.key][theme].secondary,
                              }}
                            />
                            <span
                              className="border-edge h-3 w-3 rounded-sm border"
                              style={{
                                backgroundColor:
                                  PALETTE_SWATCH[p.key][theme].accent,
                              }}
                            />
                            <span
                              className="border-edge h-3 w-3 rounded-sm border"
                              style={{
                                backgroundColor:
                                  PALETTE_SWATCH[p.key][theme].destructive,
                              }}
                            />
                            <span
                              className="border-edge h-3 w-3 rounded-sm border"
                              style={{
                                backgroundColor:
                                  PALETTE_SWATCH[p.key][theme].muted,
                              }}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              <li>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleTheme}
                >
                  <MoonStarIcon className="hidden [html.dark_&]:block" />
                  <SunIcon className="hidden [html.light_&]:block" />
                  <span className="sr-only">Toggle Theme</span>
                </Button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
