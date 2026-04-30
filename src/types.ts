export type SectionId =
  | 'profile'
  | 'about'
  | 'skills'
  | 'projects'
  | 'links'
  | 'theme';

export type SkillCategory = '技術' | 'ビジネス' | 'ツール' | 'その他';

export type Skill = {
  id: string;
  cat: SkillCategory;
  name: string;
  usage: string;
};

export type Project = {
  id: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  periodNow: boolean;
  role: string;
  problem: string;
  action: string;
  result: string;
  tools: string[];
  link: string;
};

export type LinkKind = 'GitHub' | 'Email' | 'X' | 'LinkedIn' | 'Web' | 'その他';

export type SocialLink = {
  id: string;
  kind: LinkKind;
  url: string;
};

export type ThemeId = 'editorial' | 'mono' | 'card' | 'minimal';

export type ThemeMode = 'auto' | 'light' | 'dark';

export type ThemeConfig = {
  id: ThemeId;
  accent: string;
  mode: ThemeMode;
  density: number;
};

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  avatar?: string;
};

export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export type PreviewDevice = 'desktop' | 'mobile';

export type AppState = {
  profile: Profile;
  about: string;
  skills: Skill[];
  projects: Project[];
  links: SocialLink[];
  theme: ThemeConfig;
  ui: {
    activeSection: SectionId;
    sectionOrder: SectionId[];
    previewDevice: PreviewDevice;
    autoSaveStatus: AutoSaveStatus;
    lastSavedAt: number;
  };
};

export type PortfolioData = Pick<
  AppState,
  'profile' | 'about' | 'skills' | 'projects' | 'links' | 'theme'
>;
