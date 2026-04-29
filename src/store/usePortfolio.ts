import { create } from 'zustand';
import type {
  PortfolioData,
  Project,
  Skill,
  SocialLink,
  ThemeMode,
} from '../types';
import { seedData } from '../seed';

const STORAGE_KEY = 'portfolio-editor:data:v1';

function load(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(seedData);
    const parsed = JSON.parse(raw) as PortfolioData;
    return { ...structuredClone(seedData), ...parsed };
  } catch {
    return structuredClone(seedData);
  }
}

let saveTimer: number | undefined;
function save(data: PortfolioData) {
  if (saveTimer !== undefined) window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage quota exceeded — ignore for MVP
    }
  }, 200);
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

type Store = {
  data: PortfolioData;
  setHero: (patch: Partial<PortfolioData['hero']>) => void;
  setAbout: (about: string) => void;
  setAccent: (accent: string) => void;
  setMode: (mode: ThemeMode) => void;
  addSkill: () => void;
  updateSkill: (id: string, patch: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addLink: () => void;
  updateLink: (id: string, patch: Partial<SocialLink>) => void;
  removeLink: (id: string) => void;
  reset: () => void;
};

function update(
  set: (fn: (s: Store) => Partial<Store>) => void,
  mutate: (data: PortfolioData) => PortfolioData,
) {
  set((s) => {
    const next = mutate(s.data);
    save(next);
    return { data: next };
  });
}

export const usePortfolio = create<Store>((set) => ({
  data: load(),

  setHero: (patch) =>
    update(set, (d) => ({ ...d, hero: { ...d.hero, ...patch } })),

  setAbout: (about) => update(set, (d) => ({ ...d, about })),

  setAccent: (accent) =>
    update(set, (d) => ({ ...d, theme: { ...d.theme, accent } })),

  setMode: (mode) =>
    update(set, (d) => ({ ...d, theme: { ...d.theme, mode } })),

  addSkill: () =>
    update(set, (d) => ({
      ...d,
      skills: [
        ...d.skills,
        { id: uid('s'), category: 'tech', name: '', usage: '' },
      ],
    })),

  updateSkill: (id, patch) =>
    update(set, (d) => ({
      ...d,
      skills: d.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    })),

  removeSkill: (id) =>
    update(set, (d) => ({
      ...d,
      skills: d.skills.filter((s) => s.id !== id),
    })),

  addProject: () =>
    update(set, (d) => ({
      ...d,
      projects: [
        ...d.projects,
        {
          id: uid('p'),
          title: '',
          period: '',
          role: '',
          problem: '',
          action: '',
          result: '',
          tools: '',
          link: '',
        },
      ],
    })),

  updateProject: (id, patch) =>
    update(set, (d) => ({
      ...d,
      projects: d.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),

  removeProject: (id) =>
    update(set, (d) => ({
      ...d,
      projects: d.projects.filter((p) => p.id !== id),
    })),

  addLink: () =>
    update(set, (d) => ({
      ...d,
      links: [
        ...d.links,
        { id: uid('l'), kind: 'other', label: '', url: '' },
      ],
    })),

  updateLink: (id, patch) =>
    update(set, (d) => ({
      ...d,
      links: d.links.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    })),

  removeLink: (id) =>
    update(set, (d) => ({
      ...d,
      links: d.links.filter((l) => l.id !== id),
    })),

  reset: () =>
    update(set, () => structuredClone(seedData)),
}));
