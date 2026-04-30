// Variation 3: "Atelier" — 個性的・編集者風
// 紙のような明るい背景、セリフ見出し、フォーム = 原稿。
// セクションを横スクロール式の"章"カードで切り替え。
// プレビューは右側に小さくフレーム表示。

const AT = {
  bg: '#f4f1ea',
  paper: '#fbf9f4',
  ink: '#1c1a17',
  sub: '#6b6256',
  dim: '#a39884',
  hairline: '#e5dfd2',
  accent: '#b8472a',
  ok: '#3d6b3a',
  serif: '"Noto Serif JP", "Hiragino Mincho ProN", serif',
  sans: '"Noto Sans JP", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

function ATEditor() {
  const sections = [
    { num: '01', label: 'Profile', jp: 'プロフィール', done: true },
    { num: '02', label: 'About', jp: '自己紹介', done: true },
    { num: '03', label: 'Skills', jp: 'スキル', done: true, active: true },
    { num: '04', label: 'Works', jp: 'プロジェクト', done: false },
    { num: '05', label: 'Contact', jp: 'リンク', done: false },
    { num: '06', label: 'Style', jp: 'テーマ', done: true },
  ];
  return (
    <div style={{
      width: 1440, height: 900, background: AT.bg, color: AT.ink,
      fontFamily: AT.sans, fontSize: 13, display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 36px 14px', borderBottom: `1px solid ${AT.hairline}`,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flex: 'none',
      }}>
        <div>
          <div style={{ fontFamily: AT.mono, fontSize: 10, color: AT.dim, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>
            Portfolio · Editorial Edition
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <h1 style={{ fontFamily: AT.serif, fontSize: 28, margin: 0, fontWeight: 500, letterSpacing: '0.02em' }}>
              山田 太郎 <span style={{ color: AT.dim, fontStyle: 'italic', fontSize: 18 }}>の手帖</span>
            </h1>
            <div style={{ fontSize: 11, color: AT.sub, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: AT.ok }} />
              自動保存 · 14:32
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            background: 'transparent', border: `1px solid ${AT.ink}`, color: AT.ink,
            padding: '7px 14px', borderRadius: 0, fontSize: 12, cursor: 'pointer', fontFamily: AT.sans,
            letterSpacing: '0.05em',
          }}>プレビュー</button>
          <button style={{
            background: AT.ink, color: AT.paper, border: `1px solid ${AT.ink}`,
            padding: '7px 16px', borderRadius: 0, fontSize: 12, cursor: 'pointer', fontFamily: AT.sans,
            letterSpacing: '0.05em', fontWeight: 500,
          }}>HTMLとして書き出す →</button>
        </div>
      </div>

      {/* Chapter strip */}
      <div style={{
        padding: '14px 36px', borderBottom: `1px solid ${AT.hairline}`,
        display: 'flex', alignItems: 'center', gap: 0, flex: 'none', overflowX: 'auto',
      }}>
        {sections.map((s, i) => (
          <React.Fragment key={s.num}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px',
              background: s.active ? AT.ink : 'transparent', color: s.active ? AT.paper : AT.ink,
              cursor: 'pointer', flex: 'none',
            }}>
              <span style={{ fontFamily: AT.mono, fontSize: 10, opacity: 0.7 }}>{s.num}</span>
              <span style={{ fontFamily: AT.serif, fontSize: 14, fontStyle: 'italic' }}>{s.label}</span>
              <span style={{ fontSize: 11, opacity: 0.7 }}>· {s.jp}</span>
              {s.done && <span style={{ fontSize: 10, color: s.active ? AT.paper : AT.ok }}>✓</span>}
            </div>
            {i < sections.length - 1 && <div style={{ width: 14, height: 1, background: AT.hairline, flex: 'none' }} />}
          </React.Fragment>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{
          marginLeft: 14, padding: '6px 12px', border: `1px dashed ${AT.dim}`,
          fontSize: 11, color: AT.sub, fontFamily: AT.mono, flex: 'none',
        }}>
          全体: <span style={{ color: AT.ink }}>{PROGRESS.overall}%</span> 完成
        </div>
      </div>

      {/* Body — manuscript metaphor */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 460px', minHeight: 0 }}>
        {/* Manuscript area */}
        <div style={{ overflowY: 'auto', padding: '32px 56px 60px', background: AT.bg }}>
          <div style={{
            background: AT.paper, border: `1px solid ${AT.hairline}`,
            padding: '40px 56px', maxWidth: 760, margin: '0 auto',
            position: 'relative',
            boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 14px 30px rgba(120,100,70,0.06)',
          }}>
            {/* margin tick marks */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: 28, width: 1,
              borderLeft: `1px dashed ${AT.hairline}`,
            }} />
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: AT.mono, fontSize: 10, color: AT.dim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Chapter 03</div>
              <h2 style={{ fontFamily: AT.serif, fontSize: 30, margin: '4px 0 6px', fontWeight: 500 }}>
                Skills <span style={{ color: AT.dim, fontStyle: 'italic', fontSize: 18 }}>— 持っている道具と、それをどう使ってきたか</span>
              </h2>
              <p style={{ fontSize: 12, color: AT.sub, margin: 0, lineHeight: 1.7 }}>
                「使える」より「どう使ったか」を1〜2文で。<button style={{ background: 'transparent', border: 0, color: AT.accent, padding: 0, fontSize: 12, cursor: 'pointer', fontFamily: AT.sans, textDecoration: 'underline' }}>サンプルを挿入</button>
              </p>
            </div>

            {/* Skill rows — list with grip */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {MOCK.skills.map((s, i) => (
                <div key={s.id} style={{
                  display: 'grid', gridTemplateColumns: '24px 90px 1fr 24px',
                  gap: 16, alignItems: 'flex-start',
                  padding: '14px 0', borderBottom: i < MOCK.skills.length - 1 ? `1px solid ${AT.hairline}` : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: AT.dim, paddingTop: 4 }}>
                    <Icon name="grip" size={12} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: AT.serif, fontSize: 11, fontStyle: 'italic',
                      color: AT.accent, letterSpacing: '0.04em',
                    }}>— {s.cat}</div>
                    <div style={{ fontFamily: AT.mono, fontSize: 9, color: AT.dim, marginTop: 2 }}>{String(i + 1).padStart(2, '0')}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: AT.serif, fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 13, color: AT.ink, lineHeight: 1.7, opacity: 0.85 }}>{s.usage}</div>
                  </div>
                  <div style={{ color: AT.dim, fontSize: 14, cursor: 'pointer' }}>×</div>
                </div>
              ))}
              {/* add row — paper feel */}
              <div style={{
                marginTop: 16, padding: '14px 16px',
                border: `1px dashed ${AT.dim}`, color: AT.sub,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontSize: 13,
              }}>
                <span>+ スキルを書き足す</span>
                <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                  <span style={{ padding: '2px 8px', background: AT.bg, border: `1px solid ${AT.hairline}` }}>技術</span>
                  <span style={{ padding: '2px 8px', background: AT.bg, border: `1px solid ${AT.hairline}` }}>ビジネス</span>
                  <span style={{ padding: '2px 8px', background: AT.bg, border: `1px solid ${AT.hairline}` }}>ツール</span>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: 36, paddingTop: 18, borderTop: `1px solid ${AT.hairline}`,
              display: 'flex', justifyContent: 'space-between', fontFamily: AT.mono, fontSize: 11, color: AT.dim,
            }}>
              <span>← 02 About</span>
              <span>p.3 / 6</span>
              <span>04 Works →</span>
            </div>
          </div>
        </div>

        {/* Side preview */}
        <div style={{
          borderLeft: `1px solid ${AT.hairline}`, background: AT.bg,
          display: 'flex', flexDirection: 'column', padding: '24px 24px 32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontFamily: AT.mono, fontSize: 10, color: AT.dim, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Live Preview</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['PC', 'SP'].map((d, i) => (
                <span key={d} style={{
                  fontSize: 10, padding: '3px 8px',
                  background: i === 0 ? AT.ink : 'transparent', color: i === 0 ? AT.paper : AT.sub,
                  border: `1px solid ${AT.ink}`, fontFamily: AT.mono, cursor: 'pointer',
                }}>{d}</span>
              ))}
            </div>
          </div>
          <div style={{
            flex: 1, background: '#fff', boxShadow: '0 14px 28px rgba(0,0,0,0.07)',
            border: `1px solid ${AT.hairline}`, overflow: 'hidden', position: 'relative',
            fontFamily: AT.serif,
          }}>
            <div style={{ padding: '32px 32px 28px', borderBottom: `1px solid #ece7dc` }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
                <Avatar size={56} bg="#f4f1ea" fg="#6b6256" font={AT.serif} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 500, fontFamily: AT.serif }}>{MOCK.hero.name}</div>
                  <div style={{ fontSize: 11, color: AT.sub, fontFamily: AT.sans, marginTop: 2 }}>{MOCK.hero.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.8, fontFamily: AT.sans, color: AT.ink }}>
                {MOCK.hero.tagline}
              </div>
            </div>
            <div style={{ padding: '24px 32px' }}>
              <div style={{ fontFamily: AT.mono, fontSize: 9, letterSpacing: '0.18em', color: AT.accent, textTransform: 'uppercase', marginBottom: 8 }}>— Skills</div>
              {MOCK.skills.slice(0, 3).map((s, i) => (
                <div key={s.id} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < 2 ? `1px solid ${AT.hairline}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</span>
                    <span style={{ fontFamily: AT.mono, fontSize: 9, color: AT.dim }}>{s.cat}</span>
                  </div>
                  <div style={{ fontSize: 11, color: AT.sub, marginTop: 3, fontFamily: AT.sans, lineHeight: 1.6 }}>{s.usage}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            marginTop: 14, padding: '12px 14px', background: AT.paper, border: `1px solid ${AT.hairline}`,
            fontSize: 11, color: AT.sub, lineHeight: 1.6,
          }}>
            <span style={{ fontFamily: AT.serif, fontStyle: 'italic', color: AT.accent }}>Tip </span>
            プレビュー内の要素をクリックすると、対応するフォーム欄にジャンプします。
          </div>
        </div>
      </div>
    </div>
  );
}

window.ATEditor = ATEditor;
