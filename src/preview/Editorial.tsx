import { Fragment } from 'react';
import type { PortfolioData } from '../types';

const ED = {
  bg: '#fbf9f4',
  ink: '#1c1a17',
  sub: '#6b6256',
  hairline: '#e5dfd2',
  serif: '"Noto Serif JP", "Hiragino Mincho ProN", serif',
  sans: '"Noto Sans JP", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

function initialsOf(name: string): string {
  const t = name.trim();
  if (!t) return '?';
  const parts = t.split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : t.slice(0, 2).toUpperCase();
}

function formatPeriod(s: { periodStart: string; periodEnd: string; periodNow: boolean }): string {
  if (!s.periodStart && !s.periodEnd && !s.periodNow) return '';
  const end = s.periodNow ? '現在' : s.periodEnd;
  if (s.periodStart && end) return `${s.periodStart} – ${end}`;
  return s.periodStart || end;
}

function densityScale(d: number) {
  return 0.7 + 0.6 * d;
}

type Props = { data: PortfolioData };

export function Editorial({ data }: Props) {
  const accent = data.theme.accent || '#b8472a';
  const k = densityScale(data.theme.density);
  const px = (n: number) => Math.round(n * k);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        background: ED.bg,
        color: ED.ink,
        fontFamily: ED.sans,
        fontSize: 14,
        lineHeight: 1.8,
        padding: `${px(60)}px ${px(64)}px ${px(80)}px`,
      }}
    >
      {/* Hero */}
      <header style={{ marginBottom: px(56), display: 'flex', alignItems: 'flex-start', gap: 28 }}>
        <div
          style={{
            width: 92, height: 92, borderRadius: '50%',
            background: '#f0eee9', color: ED.sub,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: ED.serif, fontSize: 32, flex: 'none',
            overflow: 'hidden',
          }}
        >
          {data.profile.avatar ? (
            <img src={data.profile.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span>{initialsOf(data.profile.name)}</span>
          )}
        </div>
        <div style={{ flex: 1, paddingTop: 4 }}>
          <div style={{ fontFamily: ED.mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: ED.sub, marginBottom: 6 }}>
            Portfolio
          </div>
          <h1 style={{ fontFamily: ED.serif, fontSize: 36, fontWeight: 500, margin: '0 0 6px', letterSpacing: '0.01em' }}>
            {data.profile.name || 'Your Name'}
          </h1>
          <div style={{ fontSize: 13, color: ED.sub, marginBottom: 14 }}>{data.profile.title}</div>
          {data.profile.tagline && (
            <div style={{
              fontFamily: ED.serif, fontSize: 17, fontStyle: 'italic',
              paddingLeft: 14, borderLeft: `2px solid ${accent}`,
              color: ED.ink, lineHeight: 1.7,
            }}>
              {data.profile.tagline}
            </div>
          )}
        </div>
      </header>

      {/* About */}
      {data.about.trim() && (
        <section style={{ marginBottom: px(52) }}>
          <SectionHead num="01" en="About" jp="自己紹介" accent={accent} />
          <p style={{ margin: 0, fontSize: 14, color: ED.ink, lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
            {data.about}
          </p>
        </section>
      )}

      {/* Skills */}
      {data.skills.filter((s) => s.name.trim()).length > 0 && (
        <section style={{ marginBottom: px(52) }}>
          <SectionHead num="02" en="Skills" jp="持っている道具" accent={accent} />
          {data.skills.filter((s) => s.name.trim()).map((s, i, arr) => (
            <div key={s.id} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr', gap: 24,
              padding: '16px 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${ED.hairline}` : 'none',
            }}>
              <div style={{ fontFamily: ED.serif, fontStyle: 'italic', fontSize: 13, color: accent }}>
                — {s.cat}
              </div>
              <div>
                <div style={{ fontFamily: ED.serif, fontSize: 19, fontWeight: 500, marginBottom: 4 }}>{s.name}</div>
                {s.usage.trim() && <div style={{ fontSize: 13, color: ED.sub, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{s.usage}</div>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.filter((p) => p.title.trim()).length > 0 && (
        <section style={{ marginBottom: px(48) }}>
          <SectionHead num="03" en="Selected Works" jp="主な仕事" accent={accent} />
          {data.projects.filter((p) => p.title.trim()).map((p, i, arr) => (
            <article key={p.id} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < arr.length - 1 ? `1px solid ${ED.hairline}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4, gap: 12 }}>
                <h3 style={{ fontFamily: ED.serif, fontSize: 22, fontWeight: 500, margin: 0 }}>{p.title}</h3>
                {formatPeriod(p) && (
                  <div style={{ fontFamily: ED.mono, fontSize: 10, color: ED.sub, letterSpacing: '0.08em', flex: 'none' }}>
                    {formatPeriod(p)}
                  </div>
                )}
              </div>
              {p.role && (
                <div style={{ fontSize: 12, color: ED.sub, marginBottom: 16, fontStyle: 'italic', fontFamily: ED.serif }}>{p.role}</div>
              )}
              <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '70px 1fr', gap: '10px 20px', alignItems: 'baseline' }}>
                {(['課題', 'problem', '行動', 'action', '成果', 'result'] as const).reduce<Array<[string, string]>>((acc, _, idx, src) => {
                  if (idx % 2 !== 0) return acc;
                  const lbl = src[idx] as string;
                  const key = src[idx + 1] as 'problem' | 'action' | 'result';
                  const val = p[key];
                  if (val.trim()) acc.push([lbl, val]);
                  return acc;
                }, []).map(([l, v]) => (
                  <Fragment key={l}>
                    <dt style={{ fontFamily: ED.serif, fontSize: 12, color: accent, fontStyle: 'italic' }}>— {l}</dt>
                    <dd style={{ margin: 0, fontSize: 13.5, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{v}</dd>
                  </Fragment>
                ))}
              </dl>
              {p.tools.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
                  {p.tools.map((t) => (
                    <span key={t} style={{
                      fontSize: 11, padding: '3px 9px', border: `1px solid ${ED.hairline}`,
                      color: ED.sub, fontFamily: ED.mono,
                    }}>{t}</span>
                  ))}
                </div>
              )}
              {p.link.trim() && (
                <div style={{ marginTop: 14, fontSize: 12 }}>
                  <a
                    href={normalizeUrl(p.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accent, textDecoration: 'none', fontFamily: ED.serif, fontStyle: 'italic' }}
                  >
                    プロジェクトを見る →
                  </a>
                </div>
              )}
            </article>
          ))}
        </section>
      )}

      {/* Contact */}
      {data.links.filter((l) => l.url.trim()).length > 0 && (
        <section>
          <SectionHead num="04" en="Contact" jp="連絡先" accent={accent} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {data.links.filter((l) => l.url.trim()).map((l) => (
              <a
                key={l.id}
                href={normalizeUrl(l.url, l.kind)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 16px', border: `1px solid ${ED.ink}`, color: ED.ink,
                  fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                }}
              >
                <span style={{ fontFamily: ED.serif, fontStyle: 'italic' }}>{l.kind}</span>
                <span style={{ fontFamily: ED.mono, fontSize: 11, color: ED.sub }}>{l.url}</span>
              </a>
            ))}
          </div>
          <div style={{
            marginTop: 56, fontSize: 10, color: ED.sub,
            fontFamily: ED.mono, letterSpacing: '0.16em',
            textTransform: 'uppercase', textAlign: 'center',
          }}>
            — End of Document —
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHead({ num, en, jp, accent }: { num: string; en: string; jp: string; accent: string }) {
  return (
    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <span style={{ fontFamily: ED.mono, fontSize: 10, color: ED.sub, letterSpacing: '0.16em' }}>{num}</span>
      <h2 style={{
        fontFamily: ED.serif, fontSize: 22, fontWeight: 500,
        letterSpacing: '0.01em', color: ED.ink, margin: 0,
      }}>{en}</h2>
      <span style={{ fontSize: 11, color: ED.sub, fontStyle: 'italic', fontFamily: ED.serif }}>{jp}</span>
      <div style={{ flex: 1, height: 1, background: ED.hairline, marginLeft: 6 }} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, opacity: .6 }} />
    </div>
  );
}

function normalizeUrl(url: string, kind?: string): string {
  const t = url.trim();
  if (!t) return '#';
  if (/^(https?:|mailto:|tel:)/i.test(t)) return t;
  if (kind === 'Email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return `mailto:${t}`;
  return `https://${t}`;
}
