// Composer v2 — Theme section with portfolio-style picker
// 4 themes: Editorial (paper, serif), Mono (dark, code), Card (Notion-ish), Minimal (white, sans).
// Plus accent color + light/dark toggle.

const C2 = {
  bg: '#fafaf9',
  panel: '#ffffff',
  hairline: '#ececea',
  hairlineSoft: '#f3f3f1',
  fg: '#1a1a1a',
  sub: '#6b6b6b',
  dim: '#a0a0a0',
  accent: '#ea6e3a',
  accentSoft: '#fef0e9',
  ok: '#16a34a',
  font: '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// 4 thumbnail components — abstract miniatures of each portfolio theme.
function ThumbEditorial({ on }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fbf9f4', padding: 10, fontFamily: '"Noto Serif JP", serif' }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#e5dfd2' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 5, color: '#a39884', letterSpacing: '0.18em', marginBottom: 1 }}>PORTFOLIO · 2026</div>
          <div style={{ fontSize: 9, fontWeight: 500, color: '#1c1a17' }}>山田 太郎</div>
        </div>
      </div>
      <div style={{ borderLeft: '1.5px solid #b8472a', paddingLeft: 5, fontStyle: 'italic', fontSize: 6, color: '#1c1a17', marginBottom: 8, lineHeight: 1.4 }}>
        教育現場の非効率を、仕組みで…
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 4, color: '#6b6256' }}>02</span>
        <span style={{ fontSize: 7, color: '#1c1a17' }}>Skills</span>
        <div style={{ flex: 1, height: 1, background: '#e5dfd2' }} />
      </div>
      <div style={{ paddingTop: 3, borderTop: '1px solid transparent' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 6, paddingBottom: 3, borderBottom: '1px solid #e5dfd2' }}>
          <div style={{ fontSize: 4, fontStyle: 'italic', color: '#b8472a' }}>— 技術</div>
          <div style={{ fontSize: 6, fontWeight: 500 }}>TypeScript / React</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 6, paddingTop: 3 }}>
          <div style={{ fontSize: 4, fontStyle: 'italic', color: '#b8472a' }}>— ビジネス</div>
          <div style={{ fontSize: 6, fontWeight: 500 }}>業務改善</div>
        </div>
      </div>
    </div>
  );
}

function ThumbMono() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0c', padding: 10, fontFamily: '"Noto Sans JP", sans-serif' }}>
      <div style={{ fontFamily: 'monospace', fontSize: 5, color: '#5a5b64', marginBottom: 4 }}>$ whoami</div>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '-0.02em',
        background: 'linear-gradient(120deg, #e6e6e9, #3ad4c8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 1,
      }}>山田 太郎</div>
      <div style={{ fontFamily: 'monospace', fontSize: 5, color: '#8a8b94', marginBottom: 8 }}>Web / 教育DX</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 4, color: '#5a5b64' }}>03</span>
        <span style={{ fontSize: 5, color: '#7c5cff', letterSpacing: '0.18em', fontWeight: 700 }}>PROJECTS</span>
        <div style={{ flex: 1, height: 1, background: '#1f1f24' }} />
      </div>
      <div style={{ background: '#111114', border: '1px solid #1f1f24', borderRadius: 4, padding: 5, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1.5, background: 'linear-gradient(180deg, #7c5cff, #3ad4c8)' }} />
        <div style={{ fontSize: 6, fontWeight: 700, color: '#e6e6e9', marginBottom: 3 }}>自動リマインダー</div>
        <div style={{ display: 'flex', gap: 2 }}>
          {['GAS', 'Sheets', 'Cal'].map(t => (
            <span key={t} style={{ fontSize: 4, padding: '1px 3px', borderRadius: 2, border: '1px solid #1f1f24', color: '#8a8b94', fontFamily: 'monospace' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThumbCard() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f7f7f5', padding: 10, fontFamily: '"Noto Sans JP", sans-serif' }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, background: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700 }}>山</div>
        <div>
          <div style={{ fontSize: 8, fontWeight: 700 }}>山田 太郎</div>
          <div style={{ fontSize: 5, color: '#6b6b6b' }}>Web / 教育DX</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 4 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ececea', borderRadius: 4, padding: 4 }}>
            <div style={{ width: '50%', height: 3, background: '#1a1a1a', borderRadius: 1, marginBottom: 2 }} />
            <div style={{ width: '90%', height: 2, background: '#ececea', borderRadius: 1, marginBottom: 1 }} />
            <div style={{ width: '70%', height: 2, background: '#ececea', borderRadius: 1 }} />
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid #ececea', borderRadius: 4, padding: 5 }}>
        <div style={{ fontSize: 5, fontWeight: 700, marginBottom: 2 }}>主なプロジェクト</div>
        <div style={{ width: '90%', height: 2, background: '#ececea', borderRadius: 1, marginBottom: 1 }} />
        <div style={{ width: '70%', height: 2, background: '#ececea', borderRadius: 1 }} />
      </div>
    </div>
  );
}

function ThumbMinimal() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', padding: '14px 12px', fontFamily: '"Noto Sans JP", sans-serif' }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 1 }}>山田 太郎</div>
      <div style={{ width: 14, height: 1, background: '#1a1a1a', marginBottom: 5 }} />
      <div style={{ fontSize: 5, color: '#6b6b6b', marginBottom: 9 }}>大学生 / Webアプリ開発</div>
      <div style={{ fontSize: 6, color: '#1a1a1a', lineHeight: 1.6, marginBottom: 9 }}>
        教育現場の非効率を、仕組みとテクノロジーで改善することに関心があります。
      </div>
      <div style={{ fontSize: 5, fontWeight: 600, letterSpacing: '0.18em', color: '#1a1a1a', marginBottom: 4 }}>WORKS</div>
      {[1, 2].map(i => (
        <div key={i} style={{ paddingTop: 3, paddingBottom: 3, borderTop: '1px solid #ececea', display: 'grid', gridTemplateColumns: '1fr auto', gap: 4 }}>
          <div style={{ width: '70%', height: 2.5, background: '#1a1a1a', borderRadius: 1 }} />
          <div style={{ width: 12, height: 2, background: '#a0a0a0', borderRadius: 1 }} />
        </div>
      ))}
    </div>
  );
}

const THEMES = [
  { id: 'editorial', name: 'Editorial', tag: '紙・セリフ', desc: '読み物として読ませたい人向け。明朝×等幅。', Thumb: ThumbEditorial, recommended: true },
  { id: 'mono', name: 'Mono', tag: 'ダーク・コード', desc: 'エンジニア寄り。ターミナル風の硬質さ。', Thumb: ThumbMono },
  { id: 'card', name: 'Card', tag: 'カード・整列', desc: 'スキル/作品の点数が多い人に。Notion風。', Thumb: ThumbCard },
  { id: 'minimal', name: 'Minimal', tag: '白・余白多め', desc: '一発で「品がいい」と思わせる定番。', Thumb: ThumbMinimal },
];

const ACCENTS = ['#ea6e3a', '#1a1a1a', '#0ea5e9', '#16a34a', '#7c5cff', '#db2777'];

function CPThemeSection() {
  const selected = 'editorial';
  return (
    <div>
      <div style={{ marginBottom: 4, fontSize: 11, color: C2.dim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>セクション 06 / 06</div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>テーマ</h1>
        <div style={{ fontSize: 11, color: C2.sub, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="eye" size={12} />
          選んだ瞬間にプレビューに反映されます
        </div>
      </div>
      <div style={{ fontSize: 13, color: C2.sub, marginBottom: 24, lineHeight: 1.6 }}>
        書き出される .html ファイルの見た目を選びます。後からいつでも切り替え可能。
      </div>

      {/* Style picker */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>ポートフォリオのスタイル</span>
          <span style={{ fontSize: 11, color: C2.dim, fontWeight: 400 }}>4 種類</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {THEMES.map(t => {
            const isOn = t.id === selected;
            return (
              <div key={t.id} style={{
                background: C2.panel,
                border: `1px solid ${isOn ? C2.accent : C2.hairline}`,
                boxShadow: isOn ? `0 0 0 3px ${C2.accent}1f` : 'none',
                borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                position: 'relative',
              }}>
                {/* Thumbnail */}
                <div style={{
                  height: 168, borderBottom: `1px solid ${C2.hairlineSoft}`,
                  background: '#fafaf9', position: 'relative', overflow: 'hidden',
                }}>
                  <t.Thumb />
                  {t.recommended && (
                    <span style={{
                      position: 'absolute', top: 8, left: 8,
                      fontSize: 10, padding: '2px 8px', borderRadius: 999,
                      background: C2.fg, color: C2.panel, fontWeight: 500,
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                    }}>
                      <Icon name="star" size={9} />
                      おすすめ
                    </span>
                  )}
                  {isOn && (
                    <span style={{
                      position: 'absolute', top: 8, right: 8,
                      width: 22, height: 22, borderRadius: '50%',
                      background: C2.accent, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><Icon name="check" size={13} /></span>
                  )}
                </div>
                {/* Meta */}
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C2.fg }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: C2.dim }}>{t.tag}</div>
                  </div>
                  <div style={{ fontSize: 12, color: C2.sub, lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accent color */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>アクセントカラー</div>
        <div style={{ fontSize: 11, color: C2.sub, marginBottom: 10, lineHeight: 1.6 }}>見出しやリンクに使われる色。テーマに合わせて自動で調整されます。</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            background: C2.accent, border: `1px solid ${C2.hairline}`,
          }} />
          <div style={{
            background: C2.panel, border: `1px solid ${C2.hairline}`, borderRadius: 8,
            padding: '8px 12px', fontFamily: C2.mono, fontSize: 13, color: C2.fg, minWidth: 120,
          }}>{C2.accent}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {ACCENTS.map(c => (
              <div key={c} style={{
                width: 24, height: 24, borderRadius: '50%',
                background: c, cursor: 'pointer',
                border: c === C2.accent ? `2px solid ${C2.fg}` : `1px solid ${C2.hairline}`,
                boxShadow: c === C2.accent ? `0 0 0 2px ${C2.panel}, 0 0 0 4px ${c}33` : 'none',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Mode + density */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10 }}>モード</div>
          <div style={{ display: 'inline-flex', border: `1px solid ${C2.hairline}`, borderRadius: 8, overflow: 'hidden', background: C2.panel }}>
            {[
              { id: 'auto', label: '自動', icon: 'monitor' },
              { id: 'light', label: 'ライト', icon: 'sun', active: true },
              { id: 'dark', label: 'ダーク', icon: 'moon' },
            ].map(m => (
              <div key={m.id} style={{
                padding: '8px 14px', fontSize: 12, cursor: 'pointer',
                background: m.active ? C2.fg : 'transparent',
                color: m.active ? C2.panel : C2.sub,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                borderRight: m.id !== 'dark' ? `1px solid ${C2.hairline}` : 'none',
              }}>
                <Icon name={m.icon} size={12} />
                {m.label}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10 }}>余白の広さ</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, color: C2.dim }}>密</span>
            <div style={{ flex: 1, position: 'relative', height: 4, background: C2.hairline, borderRadius: 2 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '60%', background: C2.accent, borderRadius: 2 }} />
              <div style={{
                position: 'absolute', left: 'calc(60% - 8px)', top: -6,
                width: 16, height: 16, borderRadius: '50%', background: '#fff',
                border: `2px solid ${C2.accent}`, boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }} />
            </div>
            <span style={{ fontSize: 11, color: C2.dim }}>ゆとり</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reuse Composer chrome but show Theme section content
function CP2Editor() {
  const sections = [
    { id: 'profile', icon: 'user', label: 'プロフィール', pct: 100, count: '4 / 4' },
    { id: 'about', icon: 'text', label: '自己紹介', pct: 100, count: '142 文字' },
    { id: 'skills', icon: 'sparkles', label: 'スキル', pct: 100, count: '4 件' },
    { id: 'projects', icon: 'box', label: 'プロジェクト', pct: 75, count: '2 件' },
    { id: 'links', icon: 'link', label: 'SNS / 連絡先', pct: 60, count: '2 件' },
    { id: 'theme', icon: 'palette', label: 'テーマ', pct: 100, count: 'Editorial', active: true },
  ];
  return (
    <div style={{
      width: 1440, height: 900, background: C2.bg, color: C2.fg,
      fontFamily: C2.font, fontSize: 13, display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        height: 52, background: C2.panel, borderBottom: `1px solid ${C2.hairline}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', flex: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 7, background: C2.fg, color: C2.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, fontFamily: C2.mono,
            }}>P</div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Portfolio Editor</span>
          </div>
          <div style={{ width: 1, height: 18, background: C2.hairline }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C2.sub }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: C2.ok }} />
            自動保存済み · 2秒前
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width={28} height={28} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={14} cy={14} r={12} fill="none" stroke={C2.hairline} strokeWidth={2.5} />
              <circle cx={14} cy={14} r={12} fill="none" stroke={C2.accent} strokeWidth={2.5}
                strokeDasharray={2 * Math.PI * 12} strokeDashoffset={2 * Math.PI * 12 * (1 - PROGRESS.overall / 100)}
                strokeLinecap="round" />
            </svg>
            <div style={{ fontSize: 12, color: C2.sub }}>
              <span style={{ color: C2.fg, fontWeight: 600, fontFamily: C2.mono }}>{PROGRESS.overall}%</span> 完成
            </div>
          </div>
          <button style={{
            background: C2.fg, color: C2.panel, border: 0,
            padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: C2.font,
          }}>
            <Icon name="download" size={13} />
            エクスポート
          </button>
        </div>
      </div>

      {/* 3 panes */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px 1fr 480px', minHeight: 0 }}>
        {/* Left nav */}
        <div style={{ background: C2.panel, borderRight: `1px solid ${C2.hairline}`, padding: '14px 12px' }}>
          <div style={{ fontSize: 10, color: C2.dim, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px 8px' }}>セクション</div>
          {sections.map(s => (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
              borderRadius: 7, cursor: 'pointer', marginBottom: 2,
              background: s.active ? C2.accentSoft : 'transparent',
            }}>
              <Icon name="grip" size={13} style={{ color: C2.dim, opacity: 0.6 }} />
              <Icon name={s.icon} size={14} style={{ color: s.active ? C2.accent : C2.sub }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: s.active ? 600 : 500, color: s.active ? C2.accent : C2.fg }}>{s.label}</div>
                <div style={{ fontSize: 10.5, color: C2.dim, marginTop: 1 }}>{s.count}</div>
              </div>
              <div style={{ width: 22, height: 4, borderRadius: 2, background: C2.hairlineSoft, overflow: 'hidden' }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: s.pct === 100 ? C2.ok : C2.accent }} />
              </div>
            </div>
          ))}
        </div>

        {/* Middle: Theme form */}
        <div style={{ overflowY: 'auto', padding: '24px 32px' }}>
          <CPThemeSection />
        </div>

        {/* Right: live preview, Editorial style */}
        <div style={{ background: '#f0eee9', borderLeft: `1px solid ${C2.hairline}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            height: 40, padding: '0 14px', borderBottom: `1px solid ${C2.hairline}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C2.panel,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C2.sub }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: C2.ok }} />
              ライブプレビュー · <span style={{ color: C2.fg, fontWeight: 600 }}>Editorial</span>
            </div>
            <div style={{ display: 'inline-flex', border: `1px solid ${C2.hairline}`, borderRadius: 6 }}>
              <button style={{ background: C2.fg, color: C2.panel, border: 0, padding: '4px 9px', cursor: 'pointer', borderRadius: 5 }}>
                <Icon name="monitor" size={13} />
              </button>
              <button style={{ background: 'transparent', color: C2.sub, border: 0, padding: '4px 9px', cursor: 'pointer' }}>
                <Icon name="smartphone" size={13} />
              </button>
            </div>
          </div>
          <div style={{ flex: 1, padding: 16, overflow: 'hidden' }}>
            <div style={{
              background: '#fbf9f4', borderRadius: 10, height: '100%', overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              fontFamily: '"Noto Serif JP", serif',
            }}>
              <div style={{ padding: '28px 32px 0' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.22em', color: '#6b6256', marginBottom: 8 }}>
                  PORTFOLIO · 2026
                </div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18 }}>
                  <Avatar size={56} bg="#f0eee9" fg="#6b6256" font={'"Noto Serif JP", serif'} />
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 2 }}>{MOCK.hero.name}</div>
                    <div style={{ fontFamily: '"Noto Sans JP", sans-serif', fontSize: 11, color: '#6b6256' }}>{MOCK.hero.title}</div>
                  </div>
                </div>
                <div style={{
                  borderLeft: '2px solid #b8472a', paddingLeft: 12, fontStyle: 'italic',
                  fontSize: 13, color: '#1c1a17', marginBottom: 22, lineHeight: 1.7,
                }}>{MOCK.hero.tagline}</div>
              </div>
              <div style={{ padding: '0 32px 24px', fontFamily: '"Noto Sans JP", sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#6b6256', letterSpacing: '0.16em' }}>02</span>
                  <span style={{ fontFamily: '"Noto Serif JP", serif', fontSize: 16, fontWeight: 500, color: '#1c1a17' }}>Skills</span>
                  <div style={{ flex: 1, height: 1, background: '#e5dfd2' }} />
                </div>
                {MOCK.skills.slice(0, 3).map((s, i) => (
                  <div key={s.id} style={{
                    display: 'grid', gridTemplateColumns: '70px 1fr', gap: 16,
                    padding: '10px 0', borderBottom: i < 2 ? '1px solid #e5dfd2' : 'none',
                  }}>
                    <div style={{ fontFamily: '"Noto Serif JP", serif', fontStyle: 'italic', fontSize: 11, color: '#b8472a' }}>— {s.cat}</div>
                    <div>
                      <div style={{ fontFamily: '"Noto Serif JP", serif', fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: '#6b6256', lineHeight: 1.6 }}>{s.usage}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.CP2Editor = CP2Editor;
