// Portfolio output designs — what users actually export.
// Two themes: Editorial (light, serif) + Mono (dark, code-ish).

const PO = {
  edBg: '#fbf9f4',
  edInk: '#1c1a17',
  edSub: '#6b6256',
  edHairline: '#e5dfd2',
  edAccent: '#b8472a',
  edSerif: '"Noto Serif JP", "Hiragino Mincho ProN", serif',
  edSans: '"Noto Sans JP", -apple-system, system-ui, sans-serif',

  moBg: '#0a0a0c',
  moPanel: '#111114',
  moInk: '#e6e6e9',
  moSub: '#8a8b94',
  moDim: '#5a5b64',
  moHair: '#1f1f24',
  moAccent: '#7c5cff',
  moAccent2: '#3ad4c8',
  moMono: '"JetBrains Mono", ui-monospace, monospace',
  moSans: '"Noto Sans JP", -apple-system, "Inter", system-ui, sans-serif',
};

function POEditorial() {
  return (
    <div style={{
      width: 760, minHeight: 1100, background: PO.edBg, color: PO.edInk,
      fontFamily: PO.edSans, fontSize: 14, lineHeight: 1.8, padding: '60px 64px 80px',
    }}>
      {/* Hero */}
      <header style={{ marginBottom: 56, display: 'flex', alignItems: 'flex-start', gap: 28 }}>
        <Avatar size={92} bg="#f0eee9" fg={PO.edSub} font={PO.edSerif} />
        <div style={{ flex: 1, paddingTop: 4 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: PO.edSub, marginBottom: 6 }}>
            Portfolio · 2026
          </div>
          <h1 style={{ fontFamily: PO.edSerif, fontSize: 36, fontWeight: 500, margin: '0 0 6px', letterSpacing: '0.01em' }}>
            {MOCK.hero.name}
          </h1>
          <div style={{ fontSize: 13, color: PO.edSub, marginBottom: 14 }}>{MOCK.hero.title}</div>
          <div style={{
            fontFamily: PO.edSerif, fontSize: 17, fontStyle: 'italic',
            paddingLeft: 14, borderLeft: `2px solid ${PO.edAccent}`,
            color: PO.edInk, lineHeight: 1.7,
          }}>
            {MOCK.hero.tagline}
          </div>
        </div>
      </header>

      {/* About */}
      <section style={{ marginBottom: 52 }}>
        <SectionHead num="01" en="About" jp="自己紹介" theme="ed" />
        <p style={{ margin: 0, fontSize: 14, color: PO.edInk, lineHeight: 1.9 }}>{MOCK.about}</p>
      </section>

      {/* Skills */}
      <section style={{ marginBottom: 52 }}>
        <SectionHead num="02" en="Skills" jp="持っている道具" theme="ed" />
        <div>
          {MOCK.skills.map((s, i) => (
            <div key={s.id} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr', gap: 24,
              padding: '16px 0',
              borderBottom: i < MOCK.skills.length - 1 ? `1px solid ${PO.edHairline}` : 'none',
            }}>
              <div style={{ fontFamily: PO.edSerif, fontStyle: 'italic', fontSize: 13, color: PO.edAccent }}>
                — {s.cat}
              </div>
              <div>
                <div style={{ fontFamily: PO.edSerif, fontSize: 19, fontWeight: 500, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 13, color: PO.edSub, lineHeight: 1.7 }}>{s.usage}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section style={{ marginBottom: 48 }}>
        <SectionHead num="03" en="Selected Works" jp="主な仕事" theme="ed" />
        {MOCK.projects.map((p, i) => (
          <article key={p.id} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < MOCK.projects.length - 1 ? `1px solid ${PO.edHairline}` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
              <h3 style={{ fontFamily: PO.edSerif, fontSize: 22, fontWeight: 500, margin: 0 }}>{p.title}</h3>
              <div style={{ fontFamily: 'monospace', fontSize: 10, color: PO.edSub, letterSpacing: '0.08em' }}>{p.period}</div>
            </div>
            <div style={{ fontSize: 12, color: PO.edSub, marginBottom: 16, fontStyle: 'italic', fontFamily: PO.edSerif }}>{p.role}</div>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '70px 1fr', gap: '10px 20px', alignItems: 'baseline' }}>
              {[['課題', p.problem], ['行動', p.action], ['成果', p.result]].map(([l, v]) => (
                <React.Fragment key={l}>
                  <dt style={{ fontFamily: PO.edSerif, fontSize: 12, color: PO.edAccent, fontStyle: 'italic' }}>— {l}</dt>
                  <dd style={{ margin: 0, fontSize: 13.5, lineHeight: 1.8 }}>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
              {p.tools.map(t => (
                <span key={t} style={{
                  fontSize: 11, padding: '3px 9px', border: `1px solid ${PO.edHairline}`,
                  color: PO.edSub, fontFamily: 'monospace',
                }}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Contact */}
      <section>
        <SectionHead num="04" en="Contact" jp="連絡先" theme="ed" />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {MOCK.links.map(l => (
            <a key={l.id} style={{
              padding: '10px 16px', border: `1px solid ${PO.edInk}`, color: PO.edInk,
              fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontFamily: PO.edSerif, fontStyle: 'italic' }}>{l.kind}</span>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: PO.edSub }}>{l.url}</span>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 56, fontSize: 10, color: PO.edSub, fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'center' }}>
          — End of Document —
        </div>
      </section>
    </div>
  );
}

function POMono() {
  return (
    <div style={{
      width: 760, minHeight: 1100, background: PO.moBg, color: PO.moInk,
      fontFamily: PO.moSans, fontSize: 14, lineHeight: 1.7, padding: '56px 56px 72px',
    }}>
      {/* Hero */}
      <header style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: PO.moMono, fontSize: 11, color: PO.moDim, marginBottom: 12, letterSpacing: '0.05em' }}>
          $ whoami
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <Avatar size={84} bg={PO.moPanel} fg={PO.moSub} />
          <div style={{ flex: 1, paddingTop: 4 }}>
            <h1 style={{
              fontSize: 36, fontWeight: 700, margin: '0 0 6px',
              letterSpacing: '-0.02em',
              background: `linear-gradient(120deg, ${PO.moInk}, ${PO.moAccent2})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{MOCK.hero.name}</h1>
            <div style={{ fontSize: 13, color: PO.moSub, marginBottom: 16, fontFamily: PO.moMono }}>{MOCK.hero.title}</div>
            <div style={{ fontSize: 15, color: PO.moInk, lineHeight: 1.7 }}>{MOCK.hero.tagline}</div>
          </div>
        </div>
      </header>

      {/* About */}
      <section style={{ marginBottom: 48 }}>
        <SectionHead num="01" en="About" jp="自己紹介" theme="mo" />
        <p style={{ margin: 0, color: PO.moInk, opacity: 0.9, lineHeight: 1.85 }}>{MOCK.about}</p>
      </section>

      {/* Skills */}
      <section style={{ marginBottom: 48 }}>
        <SectionHead num="02" en="Skills" jp="技能" theme="mo" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {MOCK.skills.map(s => (
            <div key={s.id} style={{
              background: PO.moPanel, border: `1px solid ${PO.moHair}`, borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                <span style={{
                  fontSize: 10, padding: '2px 8px', borderRadius: 999,
                  background: PO.moAccent + '22', color: PO.moAccent, fontFamily: PO.moMono,
                }}>{s.cat}</span>
              </div>
              <div style={{ fontSize: 12, color: PO.moSub, lineHeight: 1.7 }}>{s.usage}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section style={{ marginBottom: 48 }}>
        <SectionHead num="03" en="Projects" jp="案件" theme="mo" />
        {MOCK.projects.map((p, i) => (
          <article key={p.id} style={{
            background: PO.moPanel, border: `1px solid ${PO.moHair}`, borderRadius: 12,
            padding: 22, marginBottom: 14,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
              background: `linear-gradient(180deg, ${PO.moAccent}, ${PO.moAccent2})`,
            }} />
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{p.title}</h3>
              <span style={{ fontFamily: PO.moMono, fontSize: 11, color: PO.moDim }}>{p.period}</span>
            </div>
            <div style={{ fontSize: 12, color: PO.moSub, marginBottom: 14 }}>{p.role}</div>
            <div style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
              {[['課題', p.problem, '#f59e0b'], ['行動', p.action, PO.moAccent2], ['成果', p.result, PO.moAccent]].map(([l, v, c]) => (
                <div key={l} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 12 }}>
                  <div style={{
                    fontFamily: PO.moMono, fontSize: 10, color: c,
                    letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: 3,
                  }}>{l}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.tools.map(t => (
                <span key={t} style={{
                  fontSize: 11, padding: '3px 9px', borderRadius: 5,
                  border: `1px solid ${PO.moHair}`, color: PO.moSub, fontFamily: PO.moMono,
                }}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Contact */}
      <section>
        <SectionHead num="04" en="Contact" jp="連絡先" theme="mo" />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {MOCK.links.map(l => (
            <a key={l.id} style={{
              padding: '10px 16px', borderRadius: 8, background: PO.moPanel, border: `1px solid ${PO.moHair}`,
              color: PO.moInk, fontSize: 13, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontWeight: 600 }}>{l.kind}</span>
              <span style={{ fontFamily: PO.moMono, fontSize: 11, color: PO.moSub }}>{l.url}</span>
              <span style={{ color: PO.moAccent }}>→</span>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 48, fontFamily: PO.moMono, fontSize: 11, color: PO.moDim }}>
          $ exit · generated with portfolio-editor
        </div>
      </section>
    </div>
  );
}

function SectionHead({ num, en, jp, theme }) {
  const isEd = theme === 'ed';
  return (
    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <span style={{
        fontFamily: isEd ? 'monospace' : PO.moMono, fontSize: 10,
        color: isEd ? PO.edSub : PO.moDim, letterSpacing: '0.16em',
      }}>{num}</span>
      <h2 style={{
        fontFamily: isEd ? PO.edSerif : PO.moSans,
        fontSize: isEd ? 22 : 13, fontWeight: isEd ? 500 : 700,
        letterSpacing: isEd ? '0.01em' : '0.18em',
        textTransform: isEd ? 'none' : 'uppercase',
        color: isEd ? PO.edInk : PO.moAccent,
        margin: 0,
      }}>{en}</h2>
      <span style={{
        fontSize: 11, color: isEd ? PO.edSub : PO.moSub, fontStyle: isEd ? 'italic' : 'normal',
        fontFamily: isEd ? PO.edSerif : PO.moSans,
      }}>{jp}</span>
      <div style={{ flex: 1, height: 1, background: isEd ? PO.edHairline : PO.moHair, marginLeft: 6 }} />
    </div>
  );
}

window.POEditorial = POEditorial;
window.POMono = POMono;
