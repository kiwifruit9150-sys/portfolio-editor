// Variation 2: "Composer" — モダン三ペイン
// 左: セクションナビ + プログレス + ドラッグ並び替え
// 中央: アコーディオン式フォーム + AI下書きボタン
// 右: プレビュー (クリックでジャンプ可)
// ライト基調、明るく、Notion×Linear のいいとこ取り。

const CP = {
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

function CPField({ label, hint, children, tag }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: CP.fg }}>{label}</span>
        {tag && <span style={{ fontSize: 10, color: CP.dim, padding: '1px 6px', border: `1px solid ${CP.hairline}`, borderRadius: 4 }}>{tag}</span>}
      </div>
      {children}
      {hint && <div style={{ fontSize: 11, color: CP.sub, marginTop: 4, lineHeight: 1.5 }}>{hint}</div>}
    </div>
  );
}

function CPInput({ value, multiline, rows = 1, focus }) {
  return (
    <div style={{
      background: CP.panel,
      border: `1px solid ${focus ? CP.accent : CP.hairline}`,
      boxShadow: focus ? `0 0 0 3px ${CP.accent}22` : 'none',
      borderRadius: 8,
      padding: multiline ? '10px 12px' : '9px 12px',
      fontSize: 13, color: CP.fg, lineHeight: 1.6,
      minHeight: multiline ? rows * 22 : 'auto',
      whiteSpace: 'pre-wrap',
    }}>{value}</div>
  );
}

function CPProgressRing({ pct, size = 36 }) {
  const r = (size - 4) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={CP.hairline} strokeWidth={2.5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={CP.accent} strokeWidth={2.5}
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
    </svg>
  );
}

function CPEditor() {
  const sections = [
    { id: 'profile', icon: 'user', label: 'プロフィール', pct: 100, count: '4 / 4' },
    { id: 'about', icon: 'text', label: '自己紹介', pct: 100, count: '142 文字' },
    { id: 'skills', icon: 'sparkles', label: 'スキル', pct: 100, count: '4 件', active: true },
    { id: 'projects', icon: 'box', label: 'プロジェクト', pct: 75, count: '2 件 · 1 件未完成' },
    { id: 'links', icon: 'link', label: 'SNS / 連絡先', pct: 60, count: '2 件' },
    { id: 'theme', icon: 'palette', label: 'テーマ', pct: 100, count: 'Indigo · Light' },
  ];
  return (
    <div style={{
      width: 1440, height: 900, background: CP.bg, color: CP.fg,
      fontFamily: CP.font, fontSize: 13, display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        height: 52, background: CP.panel, borderBottom: `1px solid ${CP.hairline}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', flex: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 7,
              background: CP.fg, color: CP.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, fontFamily: CP.mono,
            }}>P</div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Portfolio Editor</span>
          </div>
          <div style={{ width: 1, height: 18, background: CP.hairline }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: CP.sub }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: CP.ok, display: 'inline-block' }} />
            自動保存済み · 2秒前
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: CP.dim }}>
            <Icon name="refresh" size={12} />
            <span>履歴 (12)</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CPProgressRing pct={PROGRESS.overall} size={28} />
            <div style={{ fontSize: 12, color: CP.sub }}>
              <span style={{ color: CP.fg, fontWeight: 600, fontFamily: CP.mono }}>{PROGRESS.overall}%</span> 完成
            </div>
          </div>
          <button style={{
            background: 'transparent', border: `1px solid ${CP.hairline}`, color: CP.fg,
            padding: '7px 12px', borderRadius: 7, fontSize: 12, cursor: 'pointer', fontFamily: CP.font,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="eye" size={13} />
            プレビュー
          </button>
          <button style={{
            background: CP.fg, color: CP.panel, border: 0,
            padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: CP.font,
          }}>
            <Icon name="download" size={13} />
            エクスポート
          </button>
        </div>
      </div>

      {/* 3 panes */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px 1fr 480px', minHeight: 0 }}>
        {/* Left: section nav */}
        <div style={{ background: CP.panel, borderRight: `1px solid ${CP.hairline}`, padding: '14px 12px', overflowY: 'auto' }}>
          <div style={{ fontSize: 10, color: CP.dim, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px 8px' }}>セクション</div>
          {sections.map((s, i) => (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
              borderRadius: 7, cursor: 'pointer', marginBottom: 2,
              background: s.active ? CP.accentSoft : 'transparent',
            }}>
              <Icon name="grip" size={13} style={{ color: CP.dim, opacity: 0.6 }} />
              <Icon name={s.icon} size={14} style={{ color: s.active ? CP.accent : CP.sub }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: s.active ? 600 : 500, color: s.active ? CP.accent : CP.fg }}>{s.label}</div>
                <div style={{ fontSize: 10.5, color: CP.dim, marginTop: 1 }}>{s.count}</div>
              </div>
              <div style={{
                width: 22, height: 4, borderRadius: 2,
                background: CP.hairlineSoft, overflow: 'hidden',
              }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: s.pct === 100 ? CP.ok : CP.accent }} />
              </div>
            </div>
          ))}
          <div style={{ height: 1, background: CP.hairline, margin: '14px 6px' }} />
          <div style={{ padding: '6px 10px' }}>
            <div style={{ fontSize: 10, color: CP.dim, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>テンプレート</div>
            {[
              ['新卒エンジニア', '#0ea5e9'],
              ['デザイナー志望', '#db2777'],
              ['業務改善・PM', CP.accent],
            ].map(([n, c]) => (
              <div key={n} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 6,
                fontSize: 12, color: CP.sub, cursor: 'pointer',
              }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: c, flex: 'none' }} />
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Middle: form (Skills section, accordion-style with one project open) */}
        <div style={{ overflowY: 'auto', padding: '24px 32px' }}>
          <div style={{ marginBottom: 4, fontSize: 11, color: CP.dim, letterSpacing: '0.08em', textTransform: 'uppercase' }}>セクション 04 / 06</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>プロジェクト</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{
                background: 'transparent', border: `1px dashed ${CP.hairline}`, color: CP.sub,
                padding: '6px 10px', borderRadius: 7, fontSize: 12, cursor: 'pointer', fontFamily: CP.font,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <Icon name="sparkles" size={12} />
                サンプル文を入れる
              </button>
              <button style={{
                background: CP.fg, color: CP.panel, border: 0,
                padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: CP.font,
              }}>
                <Icon name="plus" size={12} />
                プロジェクトを追加
              </button>
            </div>
          </div>
          <div style={{ fontSize: 13, color: CP.sub, marginBottom: 22, lineHeight: 1.6 }}>
            課題 → 行動 → 成果 の順で、できれば数字で語れる経験を載せましょう。
          </div>

          {/* Project 1 — collapsed */}
          <div style={{ background: CP.panel, border: `1px solid ${CP.hairline}`, borderRadius: 12, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
              <Icon name="grip" size={14} style={{ color: CP.dim }} />
              <span style={{ fontFamily: CP.mono, fontSize: 11, color: CP.dim }}>01</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{MOCK.projects[0].title}</div>
                <div style={{ fontSize: 11, color: CP.sub, marginTop: 2 }}>{MOCK.projects[0].period} · {MOCK.projects[0].role}</div>
              </div>
              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: CP.ok + '18', color: CP.ok }}>完成</span>
              <Icon name="chevDown" size={14} style={{ color: CP.dim, transform: 'rotate(-90deg)' }} />
            </div>
          </div>

          {/* Project 2 — expanded */}
          <div style={{ background: CP.panel, border: `1px solid ${CP.accent}`, borderRadius: 12, boxShadow: `0 0 0 3px ${CP.accent}1a` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${CP.hairlineSoft}` }}>
              <Icon name="grip" size={14} style={{ color: CP.dim }} />
              <span style={{ fontFamily: CP.mono, fontSize: 11, color: CP.dim }}>02</span>
              <div style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{MOCK.projects[1].title}</div>
              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: '#fef3c7', color: '#92400e' }}>未完成 · 成果が空欄</span>
              <Icon name="chevDown" size={14} style={{ color: CP.sub }} />
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 4 }}>
                <CPField label="期間"><CPInput value={MOCK.projects[1].period} /></CPField>
                <CPField label="役割"><CPInput value={MOCK.projects[1].role} /></CPField>
              </div>
              <CPField label="課題" tag="STAR-1" hint="何に困っていたか？ 状況を1〜2文で。">
                <CPInput value={MOCK.projects[1].problem} multiline rows={2} />
              </CPField>
              <CPField label="行動" tag="STAR-2" hint="自分は何をしたか？">
                <CPInput value={MOCK.projects[1].action} multiline rows={2} focus />
              </CPField>
              <CPField label="成果" tag="STAR-3" hint="数字や変化はあったか？ 数字があると説得力が一気に上がります。">
                <div style={{
                  background: CP.panel, border: `1px dashed ${CP.hairline}`, borderRadius: 8,
                  padding: '12px', fontSize: 12, color: CP.dim, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span>例: 「期限3日前の提出率を80% → 90%に改善」</span>
                  <button style={{
                    background: CP.accent, color: '#fff', border: 0, padding: '5px 10px', borderRadius: 6,
                    fontSize: 11, cursor: 'pointer', fontFamily: CP.font, display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    <Icon name="sparkles" size={11} />
                    AI下書き
                  </button>
                </div>
              </CPField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <CPField label="使用ツール" hint="カンマ区切り">
                  <CPInput value={MOCK.projects[1].tools.join(', ')} />
                </CPField>
                <CPField label="リンク" tag="任意"><CPInput value="https://" /></CPField>
              </div>
            </div>
          </div>
        </div>

        {/* Right: preview */}
        <div style={{ background: '#f0eee9', borderLeft: `1px solid ${CP.hairline}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            height: 40, padding: '0 14px', borderBottom: `1px solid ${CP.hairline}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: CP.panel,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: CP.sub }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: CP.ok }} />
              ライブプレビュー
            </div>
            <div style={{ display: 'inline-flex', border: `1px solid ${CP.hairline}`, borderRadius: 6 }}>
              {[['monitor', true], ['smartphone', false]].map(([n, on], i) => (
                <button key={n} style={{
                  background: on ? CP.fg : 'transparent', color: on ? CP.panel : CP.sub, border: 0,
                  padding: '4px 9px', cursor: 'pointer', borderRadius: 5,
                }}><Icon name={n} size={13} /></button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, padding: 16, overflow: 'hidden' }}>
            <div style={{
              background: '#fff', borderRadius: 10, height: '100%', overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)', position: 'relative',
            }}>
              <div style={{ padding: '32px 32px 24px', fontSize: 12, lineHeight: 1.7 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 22 }}>
                  <Avatar size={56} bg="#f0eee9" fg="#6b6b6b" />
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{MOCK.hero.name}</div>
                    <div style={{ fontSize: 11, color: '#6b6b6b' }}>{MOCK.hero.title}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, marginBottom: 24 }}>{MOCK.hero.tagline}</div>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: CP.accent, fontWeight: 700, marginBottom: 10 }}>Projects</div>
                {/* Highlighted (clicked) project */}
                <div style={{
                  background: '#fff', border: `2px solid ${CP.accent}`, borderRadius: 10, padding: 14,
                  boxShadow: `0 0 0 4px ${CP.accent}22`, position: 'relative', marginBottom: 8,
                }}>
                  <div style={{
                    position: 'absolute', top: -10, right: 12, background: CP.accent, color: '#fff',
                    fontSize: 10, padding: '2px 7px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}>
                    <Icon name="edit" size={10} />
                    クリックで編集
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{MOCK.projects[1].title}</div>
                  <div style={{ fontSize: 10, color: '#6b6b6b', marginTop: 2 }}>{MOCK.projects[1].period}</div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 10 }}>
                    {MOCK.projects[1].tools.map(t => (
                      <span key={t} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, border: '1px solid #ececea', color: '#6b6b6b' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{
                  background: '#fafaf9', border: '1px solid #ececea', borderRadius: 10, padding: 14, marginBottom: 8,
                }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{MOCK.projects[0].title}</div>
                  <div style={{ fontSize: 10, color: '#6b6b6b', marginTop: 2 }}>{MOCK.projects[0].period}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.CPEditor = CPEditor;
