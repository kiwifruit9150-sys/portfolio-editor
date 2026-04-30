import type { PortfolioData } from '../../types';
import { densityScale, formatPeriod, normalizeUrl } from './_shared';

const MN = {
  bg: '#ffffff',
  ink: '#1a1a1a',
  sub: '#6b6b6b',
  dim: '#a0a0a0',
  hair: '#ececea',
  sans: '"Noto Sans JP", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

type Props = { data: PortfolioData };

export function Minimal({ data }: Props) {
  const accent = data.theme.accent || '#1a1a1a';
  const k = densityScale(data.theme.density);
  const px = (n: number) => Math.round(n * k);

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: MN.bg, color: MN.ink,
      fontFamily: MN.sans, fontSize: 14, lineHeight: 1.8,
      padding: `${px(80)}px ${px(80)}px ${px(96)}px`,
    }}>
      <header style={{ marginBottom: px(64) }}>
        <h1 style={{ fontSize: 44, fontWeight: 700, margin: 0, letterSpacing: '-0.025em' }}>
          {data.profile.name || 'Your Name'}
        </h1>
        <div style={{ width: 32, height: 2, background: accent, margin: '14px 0' }} />
        {data.profile.title && (
          <div style={{ fontSize: 14, color: MN.sub, marginBottom: 18 }}>{data.profile.title}</div>
        )}
        {data.profile.tagline && (
          <div style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 540 }}>{data.profile.tagline}</div>
        )}
      </header>

      {data.about.trim() && (
        <section style={{ marginBottom: px(56) }}>
          <SectionLabel>ABOUT</SectionLabel>
          <p style={{ margin: 0, fontSize: 14, color: MN.ink, lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
            {data.about}
          </p>
        </section>
      )}

      {data.skills.filter((s) => s.name.trim()).length > 0 && (
        <section style={{ marginBottom: px(56) }}>
          <SectionLabel>SKILLS</SectionLabel>
          <div style={{ display: 'grid', gap: 14 }}>
            {data.skills.filter((s) => s.name.trim()).map((s) => (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16, alignItems: 'baseline' }}>
                <div style={{ fontFamily: MN.mono, fontSize: 11, color: MN.dim, letterSpacing: '0.06em' }}>{s.cat}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{s.name}</div>
                  {s.usage.trim() && (
                    <div style={{ fontSize: 13, color: MN.sub, marginTop: 4, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{s.usage}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.filter((p) => p.title.trim()).length > 0 && (
        <section style={{ marginBottom: px(56) }}>
          <SectionLabel>WORKS</SectionLabel>
          {data.projects.filter((p) => p.title.trim()).map((p) => (
            <div key={p.id} style={{ paddingTop: 24, paddingBottom: 24, borderTop: `1px solid ${MN.hair}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4, gap: 12 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{p.title}</h3>
                {formatPeriod(p) && (
                  <div style={{ fontFamily: MN.mono, fontSize: 11, color: MN.dim, flex: 'none' }}>{formatPeriod(p)}</div>
                )}
              </div>
              {p.role && <div style={{ fontSize: 12, color: MN.sub, marginBottom: 14 }}>{p.role}</div>}
              {p.action.trim() && (
                <div style={{ fontSize: 14, color: MN.ink, marginBottom: 10, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{p.action}</div>
              )}
              {p.result.trim() && (
                <div style={{ fontSize: 13, color: MN.sub, whiteSpace: 'pre-wrap' }}>
                  <span style={{ color: accent, marginRight: 6 }}>→</span>{p.result}
                </div>
              )}
              {p.link.trim() && (
                <div style={{ marginTop: 12, fontSize: 13 }}>
                  <a href={normalizeUrl(p.link)} target="_blank" rel="noopener noreferrer"
                    style={{ color: accent, textDecoration: 'none' }}>
                    詳細 →
                  </a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {data.links.filter((l) => l.url.trim()).length > 0 && (
        <section>
          <SectionLabel>CONTACT</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {data.links.filter((l) => l.url.trim()).map((l) => (
              <div key={l.id} style={{
                display: 'flex', gap: 16, paddingBottom: 8, borderBottom: `1px solid ${MN.hair}`, alignItems: 'baseline',
              }}>
                <div style={{ fontSize: 11, color: MN.sub, letterSpacing: '0.16em', width: 80, flex: 'none' }}>
                  {l.kind.toUpperCase()}
                </div>
                <a href={normalizeUrl(l.url, l.kind)} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: MN.mono, fontSize: 13, color: MN.ink, textDecoration: 'none', wordBreak: 'break-all' }}>
                  {l.url}
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', marginBottom: 18 }}>
      {children}
    </div>
  );
}
