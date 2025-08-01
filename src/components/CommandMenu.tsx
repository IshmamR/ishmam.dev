"use client";

import { useRouter } from "@tanstack/react-router";
import { useCommandState } from "cmdk";
import type { LucideProps } from "lucide-react";
import {
  BoxIcon,
  BriefcaseBusinessIcon,
  CircleUserIcon,
  CornerDownLeftIcon,
  DownloadIcon,
  FileBadgeIcon,
  LetterTextIcon,
  MoonStarIcon,
  SquareTerminalIcon,
  SunIcon,
  TriangleDashedIcon,
  TrophyIcon,
  TypeIcon,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn, copyText } from "@/lib/utils";
import { SOCIAL_LINKS } from "../data";
import type { TTheme } from "../stores/theme.store";
import { useThemeStore } from "../stores/theme.store";
import { Logo } from "./icons/Logo";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type CommandLinkItem = {
  title: string;
  href: string;

  icon?: React.ComponentType<LucideProps>;
  iconImage?: string;
  keywords?: string[];
  openInNewTab?: boolean;
};

function LogoInMenu() {
  return <Logo width={24} height={12} className="text-foreground" />;
}

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: "Ishmam.dev",
    href: "/",
    icon: LogoInMenu,
  },
  // {
  //   title: "Blog",
  //   href: "/blog",
  //   icon: RssIcon,
  // },
  // {
  //   title: "Components",
  //   href: "/components",
  //   // icon: Icons.react,
  // },
];

const PORTFOLIO_PAGE_HASHES: CommandLinkItem[] = [
  {
    title: "About",
    href: "/#about",
    icon: LetterTextIcon,
  },
  {
    title: "Tech Stack",
    href: "/#stack",
    icon: SquareTerminalIcon,
  },
  {
    title: "Experience",
    href: "/#experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Projects",
    href: "/#projects",
    icon: BoxIcon,
  },
  {
    title: "Certifications",
    href: "/#certs",
    icon: FileBadgeIcon,
  },
  {
    title: "Awards",
    href: "/#awards",
    icon: TrophyIcon,
  },
  {
    title: "Download vCard",
    href: "/vcard",
    icon: CircleUserIcon,
  },
];

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
  title: item.title,
  href: item.href,
  iconImage: item.icon,
  openInNewTab: true,
}));

export function CommandMenu() {
  const router = useRouter();

  const setTheme = useThemeStore((s) => s.setTheme);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
          if (
            (e.target instanceof HTMLElement && e.target.isContentEditable) ||
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLSelectElement
          ) {
            return;
          }

          e.preventDefault();
          setOpen((open) => !open);
        }
      },
      { signal },
    );

    return () => abortController.abort();
  }, []);

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false);

      if (openInNewTab) {
        window.open(href, "_blank", "noopener");
      } else {
        router.navigate({ to: href });
      }
    },
    [router],
  );

  const handleCopyText = useCallback((text: string, message: string) => {
    setOpen(false);
    copyText(text);
    toast.success(message);
  }, []);

  const handleThemeChange = useCallback(
    (theme: TTheme) => {
      setOpen(false);
      setTheme(theme);
    },
    [setTheme],
  );

  // const { blogLinks, componentLinks } = useMemo(
  //   () => ({
  //     blogLinks: posts
  //       .filter((post) => post.metadata?.category !== "components")
  //       .map(postToCommandLinkItem),
  //     componentLinks: posts
  //       .filter((post) => post.metadata?.category === "components")
  //       .map(postToCommandLinkItem),
  //   }),
  //   [posts]
  // );

  return (
    <>
      <Button
        variant="secondary"
        className={cn(
          "text-muted-foreground h-8 gap-1.5 rounded-full bg-zinc-50 px-2.5 select-none hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-900",
          "not-dark:border dark:inset-shadow-[1px_1px_1px,0px_0px_1px] dark:inset-shadow-white/15",
        )}
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          aria-hidden
        >
          <title>Command Icon</title>
          <path
            d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>

        <span className="font-sans text-sm/4 font-medium sm:hidden">
          Search
        </span>

        <CommandMenuKbd className="hidden tracking-wider sm:in-[.os-macos_&]:flex">
          ⌘K
        </CommandMenuKbd>
        <CommandMenuKbd className="hidden sm:not-[.os-macos_&]:flex">
          Ctrl K
        </CommandMenuKbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />

        <CommandList className="min-h-80">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandLinkGroup
            heading="Pages"
            links={MENU_LINKS}
            onLinkSelect={handleOpenLink}
          />
          <CommandSeparator />

          <CommandLinkGroup
            heading="Ishmam.dev"
            links={PORTFOLIO_PAGE_HASHES}
            onLinkSelect={handleOpenLink}
          />
          <CommandSeparator />

          <CommandLinkGroup
            heading="Social Links"
            links={SOCIAL_LINK_ITEMS}
            onLinkSelect={handleOpenLink}
          />
          <CommandSeparator />

          {/* <CommandLinkGroup
            heading="Blog"
            links={blogLinks}
            fallbackIcon={TextIcon}
            onLinkSelect={handleOpenLink}
          />
          <CommandSeparator /> */}

          {/* <CommandLinkGroup
            heading="Components"
            links={componentLinks}
            // fallbackIcon={Icons.react}
            onLinkSelect={handleOpenLink}
          />
          <CommandSeparator /> */}

          <CommandGroup heading="Theme">
            <CommandItem
              keywords={["theme", "light"]}
              onSelect={() => handleThemeChange("light")}
            >
              <SunIcon />
              Light
            </CommandItem>
            <CommandItem
              keywords={["theme", "dark"]}
              onSelect={() => handleThemeChange("dark")}
            >
              <MoonStarIcon />
              Dark
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Brand Assets">
            <CommandItem
              onSelect={() => {
                handleCopyText(
                  "",
                  // getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  "Copied Mark as SVG",
                );
              }}
            >
              {/* <ChanhDaiMark /> */}
              Copy Mark as SVG
            </CommandItem>

            <CommandItem
              onSelect={() => {
                handleCopyText(
                  "",
                  // getWordmarkSVG(resolvedTheme === "light" ? "#000" : "#fff"),
                  "Copied Logotype as SVG",
                );
              }}
            >
              <TypeIcon />
              Copy Logotype as SVG
            </CommandItem>

            <CommandItem
              onSelect={() => handleOpenLink("/blog/chanhdai-brand")}
            >
              <TriangleDashedIcon />
              Brand Guidelines
            </CommandItem>

            <CommandItem asChild>
              <a href="https://assets.chanhdai.com/chanhdai-brand.zip" download>
                <DownloadIcon />
                Download Brand Assets
              </a>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>

        <CommandMenuFooter />
      </CommandDialog>
    </>
  );
}

function CommandLinkGroup({
  heading,
  links,
  fallbackIcon,
  onLinkSelect,
}: {
  heading: string;
  links: CommandLinkItem[];
  fallbackIcon?: React.ComponentType<LucideProps>;
  onLinkSelect: (href: string, openInNewTab?: boolean) => void;
}) {
  return (
    <CommandGroup heading={heading}>
      {links.map((link) => {
        const Icon = link?.icon ?? fallbackIcon ?? React.Fragment;

        return (
          <CommandItem
            key={link.href}
            keywords={link.keywords}
            onSelect={() => onLinkSelect(link.href, link.openInNewTab)}
          >
            {link?.iconImage ? (
              <img
                className="rounded-sm"
                src={link.iconImage}
                alt={link.title}
                width={16}
                height={16}
              />
            ) : (
              <Icon />
            )}
            {link.title}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

type CommandKind = "command" | "page" | "link";

type CommandMetaMap = Map<
  string,
  {
    commandKind: CommandKind;
  }
>;

function buildCommandMetaMap() {
  const commandMetaMap: CommandMetaMap = new Map();

  commandMetaMap.set("Download vCard", { commandKind: "command" });

  commandMetaMap.set("Light", { commandKind: "command" });
  commandMetaMap.set("Dark", { commandKind: "command" });
  commandMetaMap.set("Auto", { commandKind: "command" });

  commandMetaMap.set("Copy Mark as SVG", {
    commandKind: "command",
  });
  commandMetaMap.set("Copy Logotype as SVG", {
    commandKind: "command",
  });
  commandMetaMap.set("Download Brand Assets", {
    commandKind: "command",
  });

  SOCIAL_LINK_ITEMS.forEach((item) => {
    commandMetaMap.set(item.title, {
      commandKind: "link",
    });
  });

  return commandMetaMap;
}

const COMMAND_META_MAP = buildCommandMetaMap();

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  command: "Run Command",
  page: "Go to Page",
  link: "Open Link",
};

function CommandMenuFooter() {
  const selectedCommandKind = useCommandState(
    (state) => COMMAND_META_MAP.get(state.value)?.commandKind ?? "page",
  );

  return (
    <>
      <div className="flex h-10" />

      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 border-t bg-zinc-100/30 px-4 text-xs font-medium dark:bg-zinc-800/30">
        {/* <ChanhDaiMark className="size-6 text-muted-foreground" aria-hidden /> */}

        <div className="flex shrink-0 items-center gap-2">
          <span>{ENTER_ACTION_LABELS[selectedCommandKind]}</span>
          <CommandMenuKbd>
            <CornerDownLeftIcon />
          </CommandMenuKbd>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <span className="text-muted-foreground">Exit</span>
          <CommandMenuKbd>Esc</CommandMenuKbd>
        </div>
      </div>
    </>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "text-muted-foreground pointer-events-none flex h-5 min-w-6 items-center justify-center gap-1 rounded-sm bg-black/5 px-1 font-sans text-[13px] font-normal shadow-[inset_0_-1px_2px] shadow-black/10 select-none dark:bg-white/10 dark:shadow-white/10 dark:text-shadow-xs [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}

// biome-ignore lint/suspicious/noExplicitAny: Post type from external API, needs flexible typing
export function postToCommandLinkItem(post: any): CommandLinkItem {
  const isComponent = post.metadata?.category === "components";

  return {
    title: post.metadata.title,
    href: isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`,
    keywords: isComponent ? ["component"] : undefined,
  };
}
