import type { PortfolioData } from '../../types';
import { densityScale, formatPeriod, initialsOf, normalizeUrl } from './_shared';

const CD = {
  bg: '#f7f7f5',
  panel: '#ffffff',
  ink: '#1a1a1a',
  sub: '#6b6b6b',
  hair: '#ececea',
  sans: '"Noto Sans JP", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

type Props = { data: PortfolioData };

export function Card({ data }: Props) {
  const accent = data.theme.accent || '#1a1a1a';
  const k = densityScale(data.theme.density);
  const px = (n: number) => Math.round(n * k);

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: CD.bg, color: CD.ink,
      fontFamily: CD.sans, fontSize: 14, lineHeight: 1.7,
      padding: `${px(48)}px ${px(48)}px ${px(64)}px`,
    }}>
      <header style={{
        display: 'flex', gap: 20, alignItems: 'center',
        marginBottom: px(32),
        padding: 24, background: CD.panel, border: `1px solid ${CD.hair}`, borderRadius: 16,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', flex: 'none',
          background: '#f0eee9', color: CD.sub,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, overflow: 'hidden',
        }}>
          {data.profile.avatar
            ? <img src={data.profile.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span>{initialsOf(data.profile.name)}</span>}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>
            {data.profile.name || 'Your Name'}
          </div>
          <div style={{ fontSize: 13, color: CD.sub, marginTop: 4 }}>{data.profile.title}</div>
          {data.profile.tagline && (
            <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>{data.profile.tagline}</div>
          )}
        </div>
      </header>

      {data.about.trim() && (
        <section style={{ marginBottom: px(28) }}>
          <SectionLabel accent={accent}>ABOUT</SectionLabel>
          <div style={{
            background: CD.panel, border: `1px solid ${CD.hair}`,
            borderRadius: 12, padding: 18, fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap',
          }}>
            {data.about}
          </div>
        </section>
      )}

      {data.skills.filter((s) => s.name.trim()).length > 0 && (
        <section style={{ marginBottom: px(28) }}>
          <SectionLabel accent={accent}>SKILLS</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {data.skills.filter((s) => s.name.trim()).map((s) => (
              <div key={s.id} style={{ background: CD.panel, border: `1px solid ${CD.hair}`, borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6, gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: CD.bg, color: CD.sub, fontFamily: CD.mono }}>{s.cat}</span>
                </div>
                {s.usage.trim() && (
                  <div style={{ fontSize: 12, color: CD.sub, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{s.usage}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.filter((p) => p.title.trim()).length > 0 && (
        <section style={{ marginBottom: px(28) }}>
          <SectionLabel accent={accent}>PROJECTS</SectionLabel>
          {data.projects.filter((p) => p.title.trim()).map((p) => (
            <div key={p.id} style={{
              background: CD.panel, border: `1px solid ${CD.hair}`, borderRadius: 14,
              padding: 20, marginBottom: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{p.title}</div>
                {formatPeriod(p) && (
                  <div style={{ fontFamily: CD.mono, fontSize: 11, color: CD.sub, flex: 'none' }}>{formatPeriod(p)}</div>
                )}
              </div>
              {p.role && <div style={{ fontSize: 12, color: CD.sub, marginBottom: 12 }}>{p.role}</div>}
              <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
                {([['課題', p.problem], ['行動', p.action], ['成果', p.result]] as const)
                  .filter(([, v]) => v.trim())
                  .map(([l, v]) => (
                    <div key={l} style={{ display: 'grid', gridTemplateColumns: '50px 1fr', gap: 12 }}>
                      <div style={{ fontSize: 11, color: accent, fontWeight: 700, paddingTop: 2 }}>{l}</div>
                      <div style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{v}</div>
                    </div>
                  ))}
              </div>
              {p.tools.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tools.map((t) => (
                    <span key={t} style={{
                      fontSize: 11, padding: '3px 9px', borderRadius: 6,
                      background: CD.bg, color: CD.sub, fontFamily: CD.mono,
                    }}>{t}</span>
                  ))}
                </div>
              )}
              {p.link.trim() && (
                <div style={{ marginTop: 12, fontSize: 13 }}>
                  <a href={normalizeUrl(p.link)} target="_blank" rel="noopener noreferrer"
                    style={{ color: accent, textDecoration: 'none', fontWeight: 500 }}>
                    プロジェクトを見る →
                  </a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {data.links.filter((l) => l.url.trim()).length > 0 && (
        <section>
          <SectionLabel accent={accent}>CONTACT</SectionLabel>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {data.links.filter((l) => l.url.trim()).map((l) => (
              <a key={l.id} href={normalizeUrl(l.url, l.kind)} target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '10px 16px', borderRadius: 10, background: CD.panel, border: `1px solid ${CD.hair}`,
                  color: CD.ink, fontSize: 13, textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                <span style={{ fontWeight: 600 }}>{l.kind}</span>
                <span style={{ fontFamily: CD.mono, fontSize: 11, color: CD.sub }}>{l.url}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionLabel({ children, accent }: { children: string; accent: string }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
      color: accent, marginBottom: 14,
    }}>
      {children}
    </div>
  );
}

