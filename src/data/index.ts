import { CodeXmlIcon, GlobeIcon, GraduationCapIcon } from "lucide-react";
import type { TExperience, TechStack, TProject, TSocialLink } from "../types";

export const SOCIAL_LINKS: TSocialLink[] = [
  {
    icon: "https://assets.chanhdai.com/images/link-icons/github.webp",
    title: "GitHub",
    description: "IshmamR",
    href: "https://github.com/IshmamR",
  },
  {
    icon: "https://assets.chanhdai.com/images/link-icons/linkedin.webp",
    title: "LinkedIn",
    description: "ishmam-r",
    href: "https://linkedin.com/in/ishmam-r",
  },
  {
    icon: "https://assets.chanhdai.com/images/link-icons/x.webp",
    title: "X",
    description: "ishmam_dev",
    href: "https://x.com/ishmam_dev",
  },
  // {
  //   icon: "https://assets.chanhdai.com/images/link-icons/dailydev.webp",
  //   title: "daily.dev",
  //   description: "Ishmam.dev on daily.dev",
  //   href: "https://app.daily.dev/ncdai",
  // },
  // {
  //   icon: "https://assets.chanhdai.com/images/link-icons/youtube.webp",
  //   title: "YouTube",
  //   description: "Ishmam.dev on Youtube",
  //   href: "https://www.youtube.com/ishmam...",
  // },
];

export const TECH_STACK: TechStack[] = [
  {
    slug: "ts",
    title: "TypeScript",
    url: "https://www.typescriptlang.org/",
    categories: ["Language"],
  },
  {
    slug: "js",
    title: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    categories: ["Language"],
  },
  {
    slug: "bun",
    title: "Bun",
    url: "https://bun.sh/",
    categories: ["Runtime Environment"],
  },
  {
    slug: "nodejs",
    title: "Node.js",
    url: "https://nodejs.org/",
    categories: ["Runtime Environment"],
  },
  {
    slug: "react",
    title: "React",
    url: "https://react.dev/",
    categories: ["Library", "UI Library"],
  },
  {
    slug: "hono",
    title: "Hono",
    url: "https://hono.dev/",
    categories: ["Framework"],
  },
  {
    slug: "tanstack",
    title: "Tanstack",
    url: "https://tanstack.com/",
    categories: ["Framework", "Library"],
  },
  {
    slug: "nextjs",
    title: "Next.js",
    url: "https://nextjs.org/",
    categories: ["Framework"],
    theme: true,
  },
  {
    slug: "tailwindcss",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    categories: ["Framework"],
  },
  {
    slug: "shadcn-ui",
    title: "shadcn/ui",
    url: "https://ui.shadcn.com/",
    categories: ["Library", "Component Library"],
    theme: true,
  },
  {
    slug: "zustand",
    title: "Zustand",
    url: "https://zustand-demo.pmnd.rs/",
    categories: ["State management"],
  },
  {
    slug: "motion",
    title: "Motion",
    url: "https://motion.dev/",
    categories: ["Library", "Animation"],
  },
  {
    slug: "antd",
    title: "Ant Design",
    url: "https://ant.design/",
    categories: ["Library", "UI Library"],
  },
  {
    slug: "react-navigation",
    title: "React Navigation",
    url: "https://reactnavigation.org/",
    categories: ["Library", "Navigation"],
  },
  {
    slug: "nativewind",
    title: "Native Wind",
    url: "https://www.nativewind.dev/",
    categories: ["Library", "Ui Framework"],
  },
  {
    slug: "cpp",
    title: "C++",
    url: "https://en.wikipedia.org/wiki/C++",
    categories: ["Language"],
  },
  {
    slug: "arduino",
    title: "Arduino",
    url: "https://www.arduino.cc/en/software/",
    categories: ["Framework", "Embedded"],
  },
  {
    slug: "espressif",
    title: "Espressif",
    url: "https://www.espressif.com/en/products/socs/esp32-h2",
    categories: ["SDK", "Embedded"],
  },
  {
    slug: "rust",
    title: "Rust",
    url: "https://www.rust-lang.org/",
    categories: ["Language"],
    theme: true,
  },
  {
    slug: "sqlite",
    title: "SQLite",
    url: "https://www.sqlite.org/",
    categories: ["Database"],
  },
  {
    slug: "mongodb",
    title: "MongoDB",
    url: "https://www.mongodb.com/",
    categories: ["Database"],
  },
  {
    slug: "redis",
    title: "Redis",
    url: "https://redis.io/",
    categories: ["Database"],
  },
  {
    slug: "git",
    title: "Git",
    url: "https://git-scm.com/",
    categories: ["Version Control"],
  },
  {
    slug: "docker",
    title: "Docker",
    url: "https://www.docker.com/",
    categories: ["Containerization"],
  },
  {
    slug: "ubuntu",
    title: "Ubuntu",
    url: "https://ubuntu.com/",
    categories: ["OS"],
  },
  {
    slug: "vscode",
    title: "VS code",
    url: "https://code.visualstudio.com/",
    categories: ["Text editor"],
  },
  {
    slug: "figma",
    title: "Figma",
    url: "https://www.figma.com/",
    categories: ["Tools", "Design"],
  },
];

export const EXPERIENCES: TExperience[] = [
  {
    slug: "headless",
    organization: "Headless Technologies LTD.",
    positions: [
      {
        id: "sr-software-engineer",
        title: "Sr. Software Engineer",
        employmentPeriod: {
          start: "07.2024",
        },
        employmentType: "Full time",
        description: `Me architect and ship E2E cloud, edge device. Me connect dots, me make all talk.

##### What I have done  
- Craft **micro-services**. Spin up event pipelines. Handle big load, stay smooth
- Train, prune, deploy **deep-learning models**. Cloud smart. Cloud scale.
- Build **React / Next.js** front-ends. Instant feel. **SSR**, **ISR**, smart cache. SEO strong.
- Write firmware. FreeRTOS, ESP32, MQTT, OTA. Machines alive, machines run 24/7.
- Ship mobile apps. **React Native**, **BLE** pair. Hardware config. Sync to server.
- Guard every layer. Logs, metrics, fallbacks. User see magic, user feel smooth. No trouble, no mess.
- Me do more: architect DBs, design APIs, set up projects, run CI/CD, manage cloud.

##### Current focus
Turn [Diva](https://diva.com.bd) IoT vending network offline-first. Rural stays up, no net needed. Build sync engine for Diva. Sync engine be state-of-the-art.

Problem jump domains — concept, hardware, UI — me bridge gap. Me make it work.`,
        skills: [
          { title: "Typescript", iconSlug: "ts" },
          { title: "Node.js", iconSlug: "nodejs" },
          { title: "React", iconSlug: "react" },
          { title: "MongoDB", iconSlug: "mongodb" },
          { title: "Nextjs", iconSlug: "nextjs-dark" },
          { title: "React Navigation", iconSlug: "react-navigation" },
          { title: "Embedded", iconSlug: "cpp" },
          { title: "Bun", iconSlug: "bun" },
          { title: "Hono", iconSlug: "hono" },
          { title: "TailwindCSS", iconSlug: "tailwindcss" },
        ],
        icon: CodeXmlIcon,
        defaultExpanded: true,
      },
      {
        id: "software-developer",
        title: "Software Developer",
        employmentPeriod: {
          start: "06.2021",
          end: "06.2024",
        },
        employmentType: "Part time",
        description: `Me code, me build dashboards. User see more, user know more.
- Work ***MERN*** stack. Dozen+ projects, all shapes, all sizes.
- Build mobile app with ***React Native***. Cross-platform, smooth feel.
- Team up with UX/UI. Pixel perfect, user happy.
- Connect front to back. Features flow, no hiccup.
- Ship AI to prod. Models run, workflows smart.

Me learn fast, ship faster. Me code, me study(sometimes). Balance both (not really), level up fast.`,
        skills: [
          { title: "Typescript", iconSlug: "ts" },
          { title: "Node.js", iconSlug: "nodejs" },
          { title: "React", iconSlug: "react" },
          { title: "React Native", iconSlug: "react" },
          { title: "MongoDB", iconSlug: "mongodb" },
          { title: "Nextjs", iconSlug: "nextjs-dark" },
          { title: "Ant design", iconSlug: "antd" },
        ],
        icon: CodeXmlIcon,
        defaultExpanded: false,
      },
    ],
    isCurrent: true,
  },
  {
    slug: "electrode",
    organization: "Freelance",
    positions: [
      {
        id: "web-dev",
        title: "Web Developer",
        employmentPeriod: { start: "06.2020", end: "05.2021" },
        employmentType: "Part time",
        icon: GlobeIcon,
        skills: [
          { title: "Javascript", iconSlug: "js" },
          { title: "Typescript", iconSlug: "ts" },
          { title: "Node.js", iconSlug: "nodejs" },
          { title: "React", iconSlug: "react" },
          { title: "MongoDB", iconSlug: "mongodb" },
          { title: "TailwindCSS", iconSlug: "tailwindcss" },
        ],
      },
    ],
    isCurrent: false,
  },
  {
    slug: "waste-of-time",
    organization: "Education",
    positions: [
      {
        id: "ewu",
        title: "BSc. in Computer Science & Engineering",
        employmentPeriod: { start: "01.2020", end: "04.2024" },
        employmentType: "East West University",
        icon: GraduationCapIcon,
      },
    ],
    isCurrent: false,
  },
];

export const PROJECTS: TProject[] = [
  {
    id: "ishmam.dev",
    title: "Ishmam.dev",
    link: "https://ishmam.dev",
    period: { start: "07.2025" },
    skills: [
      { title: "Tanstack Start", iconSlug: "tanstack" },
      { title: "Tailwind CSS", iconSlug: "tailwindcss" },
      { title: "Shadcn/UI", iconSlug: "shadcn-ui-light" },
      { title: "Bun", iconSlug: "bun" },
    ],
    isExpanded: true,
    description: "",
    slug: "ishmam.dev",
  },
  {
    id: "terminal.pong",
    title: "Terminal Pong",
    link: "https://github.com/IshmamR/terminal.pong",
    period: { start: "06.2025", end: "07.2025" },
    skills: [
      { title: "Rust", iconSlug: "cuddlyferris" },
      { title: "Ratatui", iconSlug: "ratatui" },
    ],
    isExpanded: false,
    description: "",
    slug: "terminal.pong",
  },
  {
    id: "staging.headless.ltd",
    title: "Headless Technologies LTD.",
    link: "https://staging.headless.ltd",
    period: { start: "12.2024", end: "04.2025" },
    skills: [
      { title: "Nextjs", iconSlug: "nextjs-dark" },
      { title: "React", iconSlug: "react" },
      { title: "TailwindCSS", iconSlug: "tailwindcss" },
      { title: "MongoDB", iconSlug: "mongodb" },
      { title: "Typescript", iconSlug: "ts" },
      { title: "SSR" },
      { title: "Server functions" },
    ],
    isExpanded: false,
    description: "",
    slug: "headless",
  },
];
