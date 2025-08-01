import { LucideProps } from "lucide-react";

export type SocialLink = {
  icon: string;
  title: string;
  description?: string;
  href: string;
};

export type TechStack = {
  slug: string;
  title: string;
  url: `https://${string}`;
  categories: string[];
  theme?: boolean; // If `true`, the icon changes based on dark and light mode
  // Icon paths:
  // - Default: ./public/tech-stack-icons/[key].svg
  // - Dark mode (if `theme: true`): ./public/tech-stack-icons/[key]-dark.svg
  // - Light mode (if `theme: true`): ./public/tech-stack-icons/[key]-light.svg
};

type TSkill = {
  title: string;
  iconSlug?: string;
};

export type TExperiencePosition = {
  id: string;
  title: string;
  employmentPeriod: {
    start: string;
    end?: string;
  };
  employmentType?: string;
  /**
   * markdown of some sort
   */
  description?: string;
  icon?: React.ComponentType<LucideProps>;
  skills?: TSkill[];
  defaultExpanded?: boolean;
};

export type TExperience = {
  slug: string;
  organization: string;
  positions: TExperiencePosition[];
  isCurrent?: boolean;
};

export type TProject = {
  id: string;
  title: string;
  period: {
    start: string;
    end?: string;
  };
  link: string;
  skills: TSkill[];
  /**
   * markdown of some sort
   */
  description?: string;
  slug?: string;
  isExpanded?: boolean;
};
