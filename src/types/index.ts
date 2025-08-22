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

export type TIpWhoisFlag = {
  img: `https://${string}`;
  emoji: string;
  emoji_unicode: string;
};

export type TIpWhoisConnection = {
  asn: number;
  org: string;
  isp: string;
  domain: string;
};

export type TIpWhoisTimezone = {
  id: string;
  abbr: string;
  is_dst: boolean;
  offset: number; // seconds offset from UTC
  utc: string; // "+06:00"
  current_time: string; // ISO8601 with offset
};

export type TIpWhoisResponse = {
  "About Us": `https://${string}`;
  ip: string;
  success: boolean;
  type: "IPv4" | "IPv6" | string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  postal: string | null;
  calling_code: string;
  capital: string;
  borders: string; // e.g. "IN,MM"
  flag: TIpWhoisFlag;
  connection: TIpWhoisConnection;
  timezone: TIpWhoisTimezone;
};

// Compact country identifier (ISO 3166-1 alpha-2) -> small integer
// Use this enum to send a single byte/short over WebSocket instead of strings.
// Note: Numeric enums in TS provide reverse lookup (CountryId[0] -> "AF").
export enum CountryId {
  AF,
  AX,
  AL,
  DZ,
  AS,
  AD,
  AO,
  AI,
  AQ,
  AG,
  AR,
  AM,
  AW,
  AU,
  AT,
  AZ,
  BS,
  BH,
  BD,
  BB,
  BY,
  BE,
  BZ,
  BJ,
  BM,
  BT,
  BO,
  BQ,
  BA,
  BW,
  BV,
  BR,
  IO,
  BN,
  BG,
  BF,
  BI,
  CV,
  KH,
  CM,
  CA,
  KY,
  CF,
  TD,
  CL,
  CN,
  CX,
  CC,
  CO,
  KM,
  CG,
  CD,
  CK,
  CR,
  CI,
  HR,
  CU,
  CW,
  CY,
  CZ,
  DK,
  DJ,
  DM,
  DO,
  EC,
  EG,
  SV,
  GQ,
  ER,
  EE,
  SZ,
  ET,
  FK,
  FO,
  FJ,
  FI,
  FR,
  GF,
  PF,
  TF,
  GA,
  GM,
  GE,
  DE,
  GH,
  GI,
  GR,
  GL,
  GD,
  GP,
  GU,
  GT,
  GG,
  GN,
  GW,
  GY,
  HT,
  HM,
  VA,
  HN,
  HK,
  HU,
  IS,
  IN,
  ID,
  IR,
  IQ,
  IE,
  IM,
  IL,
  IT,
  JM,
  JP,
  JE,
  JO,
  KZ,
  KE,
  KI,
  KP,
  KR,
  KW,
  KG,
  LA,
  LV,
  LB,
  LS,
  LR,
  LY,
  LI,
  LT,
  LU,
  MO,
  MK,
  MG,
  MW,
  MY,
  MV,
  ML,
  MT,
  MH,
  MQ,
  MR,
  MU,
  YT,
  MX,
  FM,
  MD,
  MC,
  MN,
  ME,
  MS,
  MA,
  MZ,
  MM,
  NA,
  NR,
  NP,
  NL,
  NC,
  NZ,
  NI,
  NE,
  NG,
  NU,
  NF,
  MP,
  NO,
  OM,
  PK,
  PW,
  PS,
  PA,
  PG,
  PY,
  PE,
  PH,
  PN,
  PL,
  PT,
  PR,
  QA,
  RE,
  RO,
  RU,
  RW,
  BL,
  SH,
  KN,
  LC,
  MF,
  PM,
  VC,
  WS,
  SM,
  ST,
  SA,
  SN,
  RS,
  SC,
  SL,
  SG,
  SX,
  SK,
  SI,
  SB,
  SO,
  ZA,
  GS,
  SS,
  ES,
  LK,
  SD,
  SR,
  SJ,
  SE,
  CH,
  SY,
  TW,
  TJ,
  TZ,
  TH,
  TL,
  TG,
  TK,
  TO,
  TT,
  TN,
  TR,
  TM,
  TC,
  TV,
  UG,
  UA,
  AE,
  GB,
  US,
  UM,
  UY,
  UZ,
  VU,
  VE,
  VN,
  VG,
  VI,
  WF,
  EH,
  YE,
  ZM,
  ZW,
}

export type CountryAlpha2 = Extract<keyof typeof CountryId, string>;

export function countryIdFromAlpha2(code: string): CountryId | undefined {
  const k = code?.toUpperCase();
  const table = CountryId as unknown as Record<string, number>;
  const id = table[k];
  return typeof id === "number" ? (id as CountryId) : undefined;
}

export function alpha2FromCountryId(id: number): CountryAlpha2 | undefined {
  return CountryId[id] as unknown as CountryAlpha2 | undefined;
}
