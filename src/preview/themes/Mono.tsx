import type { ReactElement } from 'react';
import type { SectionId } from '../../types';
import {
  RENDERABLE_SECTIONS,
  densityScale,
  formatPeriod,
  initialsOf,
  normalizeUrl,
} from './_shared';
import { SectionWrap } from './SectionWrap';
import type { ThemeProps } from './registry';

const MO = {
  bg: '#0a0a0c',
  panel: '#111114',
  ink: '#e6e6e9',
  sub: '#8a8b94',
  dim: '#5a5b64',
  hair: '#1f1f24',
  accent2: '#3ad4c8',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  sans: '"Noto Sans JP", -apple-system, "Inter", system-ui, sans-serif',
};

function SectionHead({ num, en, jp, accent }: { num: string; en: string; jp: string; accent: string }) {
  return (
    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <span style={{ fontFamily: MO.mono, fontSize: 10, color: MO.dim, letterSpacing: '0.16em' }}>{num}</span>
      <h2 style={{
        fontFamily: MO.sans, fontSize: 13, fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: accent, margin: 0,
      }}>{en}</h2>
      <span style={{ fontSize: 11, color: MO.sub, fontFamily: MO.sans }}>{jp}</span>
      <div style={{ flex: 1, height: 1, background: MO.hair, marginLeft: 6 }} />
    </div>
  );
}

export function Mono({ data, order, onJump }: ThemeProps) {
  const accent = data.theme.accent || '#7c5cff';
  const k = densityScale(data.theme.density);
  const px = (n: number) => Math.round(n * k);

  const renderable = order.filter((id) => RENDERABLE_SECTIONS.has(id));
  const headIdx: Record<SectionId, string> = {} as Record<SectionId, string>;
  let n = 1;
  for (const id of renderable) {
    if (id === 'profile') continue;
    headIdx[id] = String(n++).padStart(2, '0');
  }

  const sections: Partial<Record<SectionId, () => ReactElement | null>> = {
    profile: () => (
      <header style={{ marginBottom: px(56) }}>
        <div style={{ fontFamily: MO.mono, fontSize: 11, color: MO.dim, marginBottom: 12, letterSpacing: '0.05em' }}>
          $ whoami
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div style={{
            width: 84, height: 84, borderRadius: '50%',
            background: MO.panel, color: MO.sub, flex: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, overflow: 'hidden',
          }}>
            {data.profile.avatar
              ? <img src={data.profile.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span>{initialsOf(data.profile.name)}</span>}
          </div>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <h1 style={{
              fontSize: 36, fontWeight: 700, margin: '0 0 6px',
              letterSpacing: '-0.02em',
              background: `linear-gradient(120deg, ${MO.ink}, ${MO.accent2})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{data.profile.name || 'Your Name'}</h1>
            <div style={{ fontSize: 13, color: MO.sub, marginBottom: 16, fontFamily: MO.mono }}>
              {data.profile.title}
            </div>
            {data.profile.tagline && (
              <div style={{ fontSize: 15, color: MO.ink, lineHeight: 1.7 }}>{data.profile.tagline}</div>
            )}
          </div>
        </div>
      </header>
    ),
    about: () => data.about.trim() ? (
      <section style={{ marginBottom: px(48) }}>
        <SectionHead num={headIdx.about} en="ABOUT" jp="自己紹介" accent={accent} />
        <p style={{ margin: 0, color: MO.ink, opacity: 0.9, lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>
          {data.about}
        </p>
      </section>
    ) : null,
    skills: () => {
      const filled = data.skills.filter((s) => s.name.trim());
      if (filled.length === 0) return null;
      return (
        <section style={{ marginBottom: px(48) }}>
          <SectionHead num={headIdx.skills} en="SKILLS" jp="技能" accent={accent} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {filled.map((s) => (
              <div key={s.id} style={{
                background: MO.panel, border: `1px solid ${MO.hair}`, borderRadius: 8, padding: '14px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6, gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                  <span style={{
                    fontSize: 10, padding: '2px 8px', borderRadius: 999,
                    background: `${accent}22`, color: accent, fontFamily: MO.mono,
                  }}>{s.cat}</span>
                </div>
                {s.usage.trim() && (
                  <div style={{ fontSize: 12, color: MO.sub, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{s.usage}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    },
    projects: () => {
      const filled = data.projects.filter((p) => p.title.trim());
      if (filled.length === 0) return null;
      return (
        <section style={{ marginBottom: px(48) }}>
          <SectionHead num={headIdx.projects} en="PROJECTS" jp="案件" accent={accent} />
          {filled.map((p) => (
            <article key={p.id} style={{
              background: MO.panel, border: `1px solid ${MO.hair}`, borderRadius: 12,
              padding: 22, marginBottom: 14,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
                background: `linear-gradient(180deg, ${accent}, ${MO.accent2})`,
              }} />
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4, gap: 12 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{p.title}</h3>
                {formatPeriod(p) && (
                  <span style={{ fontFamily: MO.mono, fontSize: 11, color: MO.dim, flex: 'none' }}>{formatPeriod(p)}</span>
                )}
              </div>
              {p.role && <div style={{ fontSize: 12, color: MO.sub, marginBottom: 14 }}>{p.role}</div>}
              <div style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
                {([
                  ['課題', p.problem, '#f59e0b'] as const,
                  ['行動', p.action, MO.accent2] as const,
                  ['成果', p.result, accent] as const,
                ]).filter(([, v]) => v.trim()).map(([l, v, c]) => (
                  <div key={l} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 12 }}>
                    <div style={{
                      fontFamily: MO.mono, fontSize: 10, color: c,
                      letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: 3,
                    }}>{l}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{v}</div>
                  </div>
                ))}
              </div>
              {p.tools.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tools.map((t) => (
                    <span key={t} style={{
                      fontSize: 11, padding: '3px 9px', borderRadius: 5,
                      border: `1px solid ${MO.hair}`, color: MO.sub, fontFamily: MO.mono,
                    }}>{t}</span>
                  ))}
                </div>
              )}
              {p.link.trim() && (
                <div style={{ marginTop: 12 }}>
                  <a href={normalizeUrl(p.link)} target="_blank" rel="noopener noreferrer"
                    style={{ color: accent, textDecoration: 'none', fontSize: 12, fontFamily: MO.mono }}>
                    → open
                  </a>
                </div>
              )}
            </article>
          ))}
        </section>
      );
    },
    links: () => {
      const filled = data.links.filter((l) => l.url.trim());
      if (filled.length === 0) return null;
      return (
        <section>
          <SectionHead num={headIdx.links} en="CONTACT" jp="連絡先" accent={accent} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {filled.map((l) => (
              <a key={l.id} href={normalizeUrl(l.url, l.kind)} target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '10px 16px', borderRadius: 8, background: MO.panel, border: `1px solid ${MO.hair}`,
                  color: MO.ink, fontSize: 13, textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                }}>
                <span style={{ fontWeight: 600 }}>{l.kind}</span>
                <span style={{ fontFamily: MO.mono, fontSize: 11, color: MO.sub }}>{l.url}</span>
                <span style={{ color: accent }}>→</span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 48, fontFamily: MO.mono, fontSize: 11, color: MO.dim }}>
            $ exit · generated with portfolio-editor
          </div>
        </section>
      );
    },
  };

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: MO.bg, color: MO.ink,
      fontFamily: MO.sans, fontSize: 14, lineHeight: 1.7,
      padding: `${px(56)}px ${px(56)}px ${px(72)}px`,
    }}>
      {renderable.map((id) => {
        const render = sections[id];
        if (!render) return null;
        const node = render();
        if (!node) return null;
        return (
          <SectionWrap key={id} id={id} onJump={onJump}>
            {node}
          </SectionWrap>
        );
      })}
    </div>
  );
}
