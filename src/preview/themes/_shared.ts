import type { Project, SectionId } from '../../types';

/** SectionIds that themes actually render in the output (theme is form-only). */
export const RENDERABLE_SECTIONS: ReadonlySet<SectionId> = new Set([
  'profile',
  'about',
  'skills',
  'projects',
  'links',
]);


export function initialsOf(name: string): string {
  const t = name.trim();
  if (!t) return '?';
  const parts = t.split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : t.slice(0, 2).toUpperCase();
}

export function formatPeriod(p: Pick<Project, 'periodStart' | 'periodEnd' | 'periodNow'>): string {
  if (!p.periodStart && !p.periodEnd && !p.periodNow) return '';
  const end = p.periodNow ? '現在' : p.periodEnd;
  if (p.periodStart && end) return `${p.periodStart} – ${end}`;
  return p.periodStart || end;
}

export function densityScale(d: number): number {
  return 0.7 + 0.6 * d;
}

export function normalizeUrl(url: string, kind?: string): string {
  const t = url.trim();
  if (!t) return '#';
  if (/^(https?:|mailto:|tel:)/i.test(t)) return t;
  if (kind === 'Email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return `mailto:${t}`;
  return `https://${t}`;
}
