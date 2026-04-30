import { useMemo, useState } from 'react';
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

const PINNED: SectionId = 'theme';

export function LeftNav() {
  const order = usePortfolio((s) => s.ui.sectionOrder);
  const active = usePortfolio((s) => s.ui.activeSection);
  const setActive = usePortfolio((s) => s.setActiveSection);
  const setSectionOrder = usePortfolio((s) => s.setSectionOrder);

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

  const [dragId, setDragId] = useState<SectionId | null>(null);
  const [overId, setOverId] = useState<SectionId | null>(null);

  const reorder = (from: SectionId, to: SectionId) => {
    if (from === to || from === PINNED) return;
    const next = order.filter((id) => id !== from && id !== PINNED);
    const insertAt = to === PINNED ? next.length : next.indexOf(to);
    next.splice(insertAt, 0, from);
    setSectionOrder([...next, PINNED]);
  };

  return (
    <nav className="nav" aria-label="セクション">
      <div className="nav-eyebrow">セクション</div>
      {order.map((id) => {
        const m = META[id];
        const st = stats[id];
        const isPinned = id === PINNED;
        const isActive = id === active;
        const isDragging = id === dragId;
        const isOver = id === overId && dragId !== null && id !== dragId;

        return (
          <button
            key={id}
            type="button"
            className={[
              'nav-row',
              isActive ? 'active' : '',
              isDragging ? 'dragging' : '',
              isOver ? 'drop-over' : '',
            ].filter(Boolean).join(' ')}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => setActive(id)}
            draggable={!isPinned}
            onDragStart={(e) => {
              if (isPinned) return;
              setDragId(id);
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', id);
            }}
            onDragEnd={() => {
              setDragId(null);
              setOverId(null);
            }}
            onDragOver={(e) => {
              if (!dragId || dragId === id) return;
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              if (overId !== id) setOverId(id);
            }}
            onDragLeave={() => {
              if (overId === id) setOverId(null);
            }}
            onDrop={(e) => {
              e.preventDefault();
              const from = (e.dataTransfer.getData('text/plain') || dragId) as SectionId;
              if (from) reorder(from, id);
              setDragId(null);
              setOverId(null);
            }}
          >
            <span
              className="nav-grip"
              title={isPinned ? '末尾固定' : 'ドラッグで並び替え'}
              style={isPinned ? { opacity: 0.2 } : undefined}
            >
              <Icon name="grip" size={13} />
            </span>
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
