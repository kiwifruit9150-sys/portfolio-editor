// Variation 1: "Quiet Studio" — Linear/Vercel風ダーク定番
// 中央寄り、密度高め、等幅見出し、accent gradient。
// 完成された硬派な開発者ツール感。

const QS = {
  bg: '#0a0a0c',
  bg2: '#0f0f12',
  panel: '#111114',
  hairline: '#1f1f24',
  hairlineSoft: '#181820',
  fg: '#e6e6e9',
  sub: '#8a8b94',
  dim: '#5a5b64',
  accent: '#7c5cff',
  accent2: '#3ad4c8',
  ok: '#22c55e',
  warn: '#f59e0b',
  font: '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", "Berkeley Mono", ui-monospace, "SFMono-Regular", monospace',
};

function QSChip({ children, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 999,
      fontSize: 11, fontWeight: 500,
      background: color ? `${color}22` : QS.hairline,
      color: color || QS.sub,
      border: `1px solid ${color ? color + '33' : QS.hairlineSoft}`,
    }}>{children}</span>
  );
}

function QSField({ label, hint, children, optional }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 500, color: QS.sub, letterSpacing: '0.02em' }}>
        {label}
        {optional && <span style={{ color: QS.dim, fontSize: 10 }}>optional</span>}
      </span>
      {children}
      {hint && <span style={{ fontSize: 11, color: QS.dim, lineHeight: 1.5 }}>{hint}</span>}
    </label>
  );
}

function QSInput({ value, multiline, rows = 1, mono }) {
  const Tag = multiline ? 'div' : 'div';
  return (
    <Tag style={{
      background: QS.bg2,
      border: `1px solid ${QS.hairline}`,
      borderRadius: 6,
      padding: multiline ? '10px 12px' : '8px 12px',
      fontSize: 13, color: QS.fg,
      fontFamily: mono ? QS.mono : QS.font,
      lineHeight: 1.6,
      minHeight: multiline ? rows * 22 : 'auto',
      whiteSpace: 'pre-wrap',
    }}>{value}</Tag>
  );
}

function QSEditor() {
  return (
    <div style={{
      width: 1440, height: 900, background: QS.bg, color: QS.fg,
      fontFamily: QS.font, fontSize: 13, display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: 48, borderBottom: `1px solid ${QS.hairline}`,
        background: QS.bg, flex: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              background: `linear-gradient(135deg, ${QS.accent}, ${QS.accent2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: QS.mono, fontSize: 11, color: '#0a0a0c', fontWeight: 700,
            }}>P</div>
            <span style={{ fontWeight: 600, fontSize: 13, letterSpacing: '-0.01em' }}>Portfolio</span>
            <span style={{ color: QS.dim }}>/</span>
            <span style={{ color: QS.sub, fontSize: 13 }}>yamada-taro</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8, color: QS.dim, fontSize: 11 }}>
            <Icon name="cloud" size={13} />
            <span>すべての変更を保存しました · 2秒前</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px',
            border: `1px solid ${QS.hairline}`, borderRadius: 6, color: QS.sub, fontSize: 12,
          }}>
            <Icon name="search" size={13} />
            <span>クイック検索</span>
            <span style={{ fontFamily: QS.mono, fontSize: 10, color: QS.dim, marginLeft: 18 }}>⌘K</span>
          </div>
          <button style={{
            background: 'transparent', border: `1px solid ${QS.hairline}`, color: QS.fg,
            padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer',
            fontFamily: QS.font,
          }}>リセット</button>
          <button style={{
            background: QS.fg, color: QS.bg, border: 0,
            padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: QS.font,
          }}>
            <Icon name="download" size={13} />
            HTMLをエクスポート
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '460px 1fr', minHeight: 0 }}>
        {/* Left: Editor */}
        <div style={{
          borderRight: `1px solid ${QS.hairline}`,
          display: 'flex', flexDirection: 'column', minHeight: 0,
        }}>
          {/* Progress */}
          <div style={{ padding: '14px 24px 12px', borderBottom: `1px solid ${QS.hairlineSoft}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: QS.sub, letterSpacing: '0.08em', textTransform: 'uppercase' }}>完成度</span>
              <span style={{ fontFamily: QS.mono, fontSize: 13, color: QS.fg }}>{PROGRESS.overall}<span style={{ color: QS.dim }}>%</span></span>
            </div>
            <div style={{ height: 3, background: QS.hairline, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                width: `${PROGRESS.overall}%`, height: '100%',
                background: `linear-gradient(90deg, ${QS.accent}, ${QS.accent2})`,
              }} />
            </div>
          </div>

          {/* Section list / form */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            {[
              { id: 'profile', icon: 'user', label: 'プロフィール', count: '4/4', open: true },
              { id: 'about', icon: 'text', label: '自己紹介', count: '1/1' },
              { id: 'skills', icon: 'sparkles', label: 'スキル', count: '4 件' },
              { id: 'projects', icon: 'box', label: 'プロジェクト', count: '2 件', warn: '1 件未完成' },
              { id: 'links', icon: 'link', label: 'SNS / 連絡先', count: '2 件' },
              { id: 'theme', icon: 'palette', label: 'テーマ', count: 'Indigo' },
            ].map((s, i) => (
              <div key={s.id}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 24px', cursor: 'pointer',
                  background: s.open ? QS.panel : 'transparent',
                  borderLeft: `2px solid ${s.open ? QS.accent : 'transparent'}`,
                }}>
                  <Icon name="grip" size={14} style={{ color: QS.dim, opacity: 0.5 }} />
                  <Icon name={s.icon} size={14} style={{ color: s.open ? QS.fg : QS.sub }} />
                  <span style={{ flex: 1, color: s.open ? QS.fg : QS.sub, fontSize: 13, fontWeight: s.open ? 500 : 400 }}>{s.label}</span>
                  {s.warn && <span style={{ fontSize: 10, color: QS.warn }}>● {s.warn}</span>}
                  <span style={{ fontFamily: QS.mono, fontSize: 11, color: QS.dim }}>{s.count}</span>
                  <Icon name="chevDown" size={13} style={{ color: QS.dim, transform: s.open ? 'none' : 'rotate(-90deg)' }} />
                </div>
                {/* Open: profile form inline */}
                {s.open && (
                  <div style={{ padding: '12px 24px 18px', background: QS.panel }}>
                    <QSField label="名前">
                      <QSInput value={MOCK.hero.name} />
                    </QSField>
                    <QSField label="肩書き" hint="採用担当者が30秒で「何をしてきた人か」を理解できる1文">
                      <QSInput value={MOCK.hero.title} />
                    </QSField>
                    <QSField label="一言キャッチ">
                      <QSInput value={MOCK.hero.tagline} multiline rows={2} />
                    </QSField>
                    <QSField label="アイコン画像" optional>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: 8,
                          background: QS.hairline, border: `1px dashed ${QS.hairlineSoft}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: QS.dim,
                        }}>
                          <Icon name="user" size={18} />
                        </div>
                        <button style={{
                          background: 'transparent', border: `1px solid ${QS.hairline}`, color: QS.fg,
                          padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: QS.font,
                        }}>画像を選択</button>
                      </div>
                    </QSField>
                    <button style={{
                      marginTop: 4, fontSize: 11, color: QS.accent, background: 'transparent', border: 0,
                      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, padding: 0,
                      fontFamily: QS.font,
                    }}>
                      <Icon name="sparkles" size={12} />
                      AIで「肩書き」を整える
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', background: QS.bg2, minHeight: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 20px', height: 44, borderBottom: `1px solid ${QS.hairline}`, flex: 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 11, color: QS.sub, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Preview</span>
              <span style={{ fontFamily: QS.mono, fontSize: 11, color: QS.dim }}>1280 × auto</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'inline-flex', border: `1px solid ${QS.hairline}`, borderRadius: 6, overflow: 'hidden' }}>
                {['Desktop', 'Tablet', 'Mobile'].map((d, i) => (
                  <button key={d} style={{
                    background: i === 0 ? QS.hairline : 'transparent', color: i === 0 ? QS.fg : QS.sub,
                    border: 0, padding: '5px 11px', fontSize: 11, cursor: 'pointer', fontFamily: QS.font,
                  }}>{d}</button>
                ))}
              </div>
              <button style={{
                background: 'transparent', border: `1px solid ${QS.hairline}`, color: QS.sub,
                padding: '5px 8px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: QS.font,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <Icon name="eye" size={12} />
                クリックでフォームへ
              </button>
            </div>
          </div>
          <div style={{ flex: 1, padding: 20, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 720, background: '#fff', borderRadius: 8, overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
              color: '#1a1d23', fontSize: 13, lineHeight: 1.7,
            }}>
              {/* mini preview content */}
              <div style={{ padding: '40px 48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32 }}>
                  <Avatar size={64} bg="#eef0f3" fg="#5b6473" />
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>{MOCK.hero.name}</div>
                    <div style={{ fontSize: 12, color: '#5b6473' }}>{MOCK.hero.title}</div>
                  </div>
                </div>
                <div style={{ fontSize: 14, marginBottom: 28, color: '#1a1d23' }}>{MOCK.hero.tagline}</div>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: QS.accent, fontWeight: 700, marginBottom: 12 }}>About</div>
                <div style={{ fontSize: 13, color: '#1a1d23', marginBottom: 24 }}>{MOCK.about}</div>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: QS.accent, fontWeight: 700, marginBottom: 12 }}>Skills</div>
                <div style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
                  {MOCK.skills.slice(0, 3).map(s => (
                    <div key={s.id} style={{ background: '#f6f7f9', border: '1px solid #e6e8ec', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</span>
                        <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 999, background: QS.accent + '22', color: QS.accent }}>{s.cat}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#5b6473', marginTop: 4 }}>{s.usage}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: QS.accent, fontWeight: 700, marginBottom: 12 }}>Projects</div>
                <div style={{ background: '#f6f7f9', border: '1px solid #e6e8ec', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{MOCK.projects[0].title}</div>
                  <div style={{ fontSize: 11, color: '#5b6473', marginTop: 2 }}>{MOCK.projects[0].period} · {MOCK.projects[0].role}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                    {MOCK.projects[0].tools.map(t => (
                      <span key={t} style={{ fontSize: 11, padding: '2px 7px', borderRadius: 4, border: '1px solid #e6e8ec', color: '#5b6473' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.QSEditor = QSEditor;
