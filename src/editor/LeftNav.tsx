import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { sectionPct, usePortfolio } from '../store/usePortfolio';
import type { SectionId } from '../types';
import { Icon, type IconName } from '../components/Icon';

const META: Record<SectionId, { label: string; icon: IconName }> = {
  profile: { label: 'プロフィール', icon: 'user' },
  about: { label: '自己紹介', icon: 'text' },
  skills: { label: 'スキル', icon: 'sparkles' },
  projects: { label: 'プロジェクト', icon: 'box' },
  links: { label: 'SNS / 連絡先', icon: 'link' },
  theme: { label: 'テーマ', icon: 'palette' },
};

export function LeftNav() {
  const order = usePortfolio((s) => s.ui.sectionOrder);
  const active = usePortfolio((s) => s.ui.activeSection);
  const setActive = usePortfolio((s) => s.setActiveSection);

  // Subscribe to the slices that actually feed sectionPct. Shallow compare on
  // the slice references is stable across unrelated UI state updates.
  const slice = usePortfolio(
    useShallow((s) => ({
      profile: s.profile,
      about: s.about,
      skills: s.skills,
      projects: s.projects,
      links: s.links,
      theme: s.theme,
    })),
  );

  const stats = useMemo(() => {
    const dummyUi = {
      activeSection: active,
      sectionOrder: order,
      previewDevice: 'desktop' as const,
      autoSaveStatus: 'idle' as const,
      lastSavedAt: 0,
    };
    return Object.fromEntries(
      order.map((id) => [id, sectionPct({ ...slice, ui: dummyUi }, id)]),
    ) as Record<SectionId, ReturnType<typeof sectionPct>>;
  }, [slice, order, active]);

  return (
    <nav className="nav" aria-label="セクション">
      <div className="nav-eyebrow">セクション</div>
      {order.map((id) => {
        const m = META[id];
        const st = stats[id];
        return (
          <button
            key={id}
            type="button"
            className={`nav-row ${id === active ? 'active' : ''}`}
            aria-current={id === active ? 'page' : undefined}
            onClick={() => setActive(id)}
          >
            <span className="nav-grip"><Icon name="grip" size={13} /></span>
            <span className="nav-icon"><Icon name={m.icon} size={14} /></span>
            <span className="nav-text">
              <div className="nav-label">{m.label}</div>
              <div className="nav-count">{st.count}</div>
            </span>
            <span className="nav-bar">
              <i className={st.pct >= 100 ? 'full' : ''} style={{ width: `${st.pct}%` }} />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
