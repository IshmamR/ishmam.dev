import type { LucideProps } from "lucide-react";

export type TSocialLink = {
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
