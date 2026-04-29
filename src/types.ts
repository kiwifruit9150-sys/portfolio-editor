export type SkillCategory = 'tech' | 'business' | 'tool';

export type Skill = {
  id: string;
  category: SkillCategory;
  name: string;
  usage: string;
};

export type Project = {
  id: string;
  title: string;
  period: string;
  role: string;
  problem: string;
  action: string;
  result: string;
  tools: string;
  link: string;
  image?: string;
};

export type LinkKind = 'github' | 'x' | 'note' | 'linkedin' | 'email' | 'other';

export type SocialLink = {
  id: string;
  kind: LinkKind;
  label: string;
  url: string;
};

export type ThemeMode = 'light' | 'dark';

export type PortfolioData = {
  hero: {
    name: string;
    title: string;
    tagline: string;
    avatar?: string;
  };
  about: string;
  skills: Skill[];
  projects: Project[];
  links: SocialLink[];
  theme: {
    accent: string;
    mode: ThemeMode;
  };
};
