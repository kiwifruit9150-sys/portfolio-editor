import { create } from 'zustand';
import type {
  AppState,
  AutoSaveStatus,
  LinkKind,
  PortfolioData,
  PreviewDevice,
  Profile,
  Project,
  SectionId,
  Skill,
  ThemeConfig,
  ThemeId,
  ThemeMode,
} from '../types';
import { SECTION_ORDER_DEFAULT, seed } from '../seed';

const STORAGE_KEY = 'portfolio-editor:v1';
const SAVE_DEBOUNCE_MS = 800;

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(seed);
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const merged: AppState = {
      ...structuredClone(seed),
      ...parsed,
      ui: {
        ...seed.ui,
        ...(parsed.ui ?? {}),
        autoSaveStatus: 'idle',
      },
    };
    return merged;
  } catch {
    return structuredClone(seed);
  }
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

type Store = AppState & {
  setProfile: (patch: Partial<Profile>) => void;
  setAbout: (about: string) => void;

  addSkill: () => void;
  updateSkill: (id: string, patch: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addLink: () => void;
  updateLink: (id: string, patch: Partial<{ kind: LinkKind; url: string }>) => void;
  removeLink: (id: string) => void;

  setThemeId: (id: ThemeId) => void;
  setAccent: (accent: string) => void;
  setMode: (mode: ThemeMode) => void;
  setDensity: (density: number) => void;

  setActiveSection: (id: SectionId) => void;
  setSectionOrder: (order: SectionId[]) => void;
  setPreviewDevice: (d: PreviewDevice) => void;

  reset: () => void;
};

let saveTimer: number | undefined;
let savedTimer: number | undefined;

function scheduleSave(get: () => Store, setStatus: (s: AutoSaveStatus) => void) {
  if (saveTimer !== undefined) window.clearTimeout(saveTimer);
  setStatus('saving');
  saveTimer = window.setTimeout(() => {
    try {
      const s = get();
      const snapshot: AppState = {
        profile: s.profile,
        about: s.about,
        skills: s.skills,
        projects: s.projects,
        links: s.links,
        theme: s.theme,
        ui: { ...s.ui, autoSaveStatus: 'idle', lastSavedAt: Date.now() },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      setStatus('saved');
      if (savedTimer !== undefined) window.clearTimeout(savedTimer);
      savedTimer = window.setTimeout(() => setStatus('idle'), 1800);
    } catch {
      setStatus('error');
    }
  }, SAVE_DEBOUNCE_MS);
}

export const usePortfolio = create<Store>((set, get) => {
  const setStatus = (autoSaveStatus: AutoSaveStatus) =>
    set((s) => ({ ui: { ...s.ui, autoSaveStatus } }));

  const mutate = (fn: (s: Store) => Partial<AppState>) => {
    set((s) => fn(s) as Partial<Store>);
    scheduleSave(get, setStatus);
  };

  return {
    ...load(),

    setProfile: (patch) =>
      mutate((s) => ({ profile: { ...s.profile, ...patch } })),

    setAbout: (about) => mutate(() => ({ about })),

    addSkill: () =>
      mutate((s) => ({
        skills: [
          ...s.skills,
          { id: uid('s'), cat: '技術', name: '', usage: '' },
        ],
      })),
    updateSkill: (id, patch) =>
      mutate((s) => ({
        skills: s.skills.map((x) => (x.id === id ? { ...x, ...patch } : x)),
      })),
    removeSkill: (id) =>
      mutate((s) => ({ skills: s.skills.filter((x) => x.id !== id) })),

    addProject: () =>
      mutate((s) => ({
        projects: [
          ...s.projects,
          {
            id: uid('p'),
            title: '',
            periodStart: '',
            periodEnd: '',
            periodNow: false,
            role: '',
            problem: '',
            action: '',
            result: '',
            tools: [],
            link: '',
          },
        ],
      })),
    updateProject: (id, patch) =>
      mutate((s) => ({
        projects: s.projects.map((x) => (x.id === id ? { ...x, ...patch } : x)),
      })),
    removeProject: (id) =>
      mutate((s) => ({ projects: s.projects.filter((x) => x.id !== id) })),

    addLink: () =>
      mutate((s) => ({
        links: [...s.links, { id: uid('l'), kind: 'GitHub', url: '' }],
      })),
    updateLink: (id, patch) =>
      mutate((s) => ({
        links: s.links.map((x) => (x.id === id ? { ...x, ...patch } : x)),
      })),
    removeLink: (id) =>
      mutate((s) => ({ links: s.links.filter((x) => x.id !== id) })),

    setThemeId: (id) =>
      mutate((s) => ({ theme: { ...s.theme, id } as ThemeConfig })),
    setAccent: (accent) =>
      mutate((s) => ({ theme: { ...s.theme, accent } as ThemeConfig })),
    setMode: (mode) =>
      mutate((s) => ({ theme: { ...s.theme, mode } as ThemeConfig })),
    setDensity: (density) =>
      mutate((s) => ({ theme: { ...s.theme, density } as ThemeConfig })),

    setActiveSection: (activeSection) =>
      mutate((s) => ({ ui: { ...s.ui, activeSection } })),
    setSectionOrder: (sectionOrder) =>
      mutate((s) => ({ ui: { ...s.ui, sectionOrder } })),
    setPreviewDevice: (previewDevice) =>
      mutate((s) => ({ ui: { ...s.ui, previewDevice } })),

    reset: () => {
      const fresh = structuredClone(seed);
      set({ ...fresh });
      scheduleSave(get, setStatus);
    },
  };
});

export function selectPortfolio(s: AppState): PortfolioData {
  return {
    profile: s.profile,
    about: s.about,
    skills: s.skills,
    projects: s.projects,
    links: s.links,
    theme: s.theme,
  };
}

export type SectionStats = {
  pct: number;
  count: string;
};

export function sectionPct(state: AppState, id: SectionId): SectionStats {
  switch (id) {
    case 'profile': {
      const p = state.profile;
      const filled =
        (p.name.trim() ? 1 : 0) +
        (p.title.trim() ? 1 : 0) +
        (p.tagline.trim() ? 1 : 0) +
        (p.avatar ? 1 : 0);
      const required =
        (p.name.trim() ? 1 : 0) +
        (p.title.trim() ? 1 : 0) +
        (p.tagline.trim() ? 1 : 0);
      const pct = Math.round((required / 3) * 100);
      return { pct, count: `${filled} / 4` };
    }
    case 'about': {
      const len = [...state.about.trim()].length;
      const pct = Math.min(100, Math.round((len / 100) * 100));
      return { pct, count: `${len} 文字` };
    }
    case 'skills': {
      const n = state.skills.filter((s) => s.name.trim()).length;
      const pct = n >= 3 ? 100 : n >= 1 ? 60 : 0;
      return { pct, count: `${n} 件` };
    }
    case 'projects': {
      const n = state.projects.filter((p) => p.title.trim()).length;
      const pct = n >= 2 ? 100 : n >= 1 ? 60 : 0;
      return { pct, count: `${n} 件` };
    }
    case 'links': {
      const n = state.links.filter((l) => l.url.trim()).length;
      const pct = n >= 2 ? 100 : n >= 1 ? 60 : 0;
      return { pct, count: `${n} 件` };
    }
    case 'theme': {
      const labelMap: Record<ThemeId, string> = {
        editorial: 'Editorial',
        mono: 'Mono',
        card: 'Card',
        minimal: 'Minimal',
      };
      return { pct: 100, count: labelMap[state.theme.id] };
    }
  }
}

export function overallPct(state: AppState): number {
  const weights: Record<SectionId, number> = {
    profile: 1.5,
    about: 1,
    skills: 1,
    projects: 1.5,
    links: 1,
    theme: 1,
  };
  const ids: SectionId[] = SECTION_ORDER_DEFAULT;
  let sum = 0;
  let w = 0;
  for (const id of ids) {
    const { pct } = sectionPct(state, id);
    sum += pct * weights[id];
    w += weights[id];
  }
  return Math.round(sum / w);
}
