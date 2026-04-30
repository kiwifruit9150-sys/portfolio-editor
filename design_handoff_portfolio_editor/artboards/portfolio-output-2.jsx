// Portfolio output — Card theme + Minimal theme (full-size)

const POC = {
  bg: '#f7f7f5', panel: '#fff', ink: '#1a1a1a', sub: '#6b6b6b', dim: '#a0a0a0',
  hair: '#ececea', accent: '#1a1a1a',
  sans: '"Noto Sans JP", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

function POCard() {
  return (
    <div style={{ width: 760, minHeight: 1100, background: POC.bg, color: POC.ink, fontFamily: POC.sans, fontSize: 14, lineHeight: 1.7, padding: '48px 48px 64px' }}>
      <header style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 36, padding: 24, background: POC.panel, border: `1px solid ${POC.hair}`, borderRadius: 16 }}>
        <Avatar size={72} bg="#f0eee9" fg={POC.sub} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>{MOCK.hero.name}</div>
          <div style={{ fontSize: 13, color: POC.sub, marginTop: 4 }}>{MOCK.hero.title}</div>
          <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>{MOCK.hero.tagline}</div>
        </div>
      </header>

      <section style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: POC.sub, marginBottom: 14 }}>SKILLS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {MOCK.skills.map(s => (
            <div key={s.id} style={{ background: POC.panel, border: `1px solid ${POC.hair}`, borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: POC.bg, color: POC.sub, fontFamily: POC.mono }}>{s.cat}</span>
              </div>
              <div style={{ fontSize: 12, color: POC.sub, lineHeight: 1.7 }}>{s.usage}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: POC.sub, marginBottom: 14 }}>PROJECTS</div>
        {MOCK.projects.map(p => (
          <div key={p.id} style={{ background: POC.panel, border: `1px solid ${POC.hair}`, borderRadius: 14, padding: 20, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 17, fontWeight: 700 }}>{p.title}</div>
              <div style={{ fontFamily: POC.mono, fontSize: 11, color: POC.sub }}>{p.period}</div>
            </div>
            <div style={{ fontSize: 12, color: POC.sub, marginBottom: 12 }}>{p.role}</div>
            <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
              {[['課題', p.problem], ['行動', p.action], ['成果', p.result]].map(([l, v]) => (
                <div key={l} style={{ display: 'grid', gridTemplateColumns: '50px 1fr', gap: 12 }}>
                  <div style={{ fontSize: 11, color: POC.sub, fontWeight: 600 }}>{l}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.tools.map(t => (
                <span key={t} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 6, background: POC.bg, color: POC.sub, fontFamily: POC.mono }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: POC.sub, marginBottom: 14 }}>CONTACT</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {MOCK.links.map(l => (
            <a key={l.id} style={{ padding: '10px 16px', borderRadius: 10, background: POC.panel, border: `1px solid ${POC.hair}`, color: POC.ink, fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600 }}>{l.kind}</span>
              <span style={{ fontFamily: POC.mono, fontSize: 11, color: POC.sub }}>{l.url}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function POMinimal() {
  return (
    <div style={{ width: 760, minHeight: 1100, background: '#fff', color: '#1a1a1a', fontFamily: POC.sans, fontSize: 14, lineHeight: 1.8, padding: '80px 80px 96px' }}>
      <header style={{ marginBottom: 64 }}>
        <h1 style={{ fontSize: 44, fontWeight: 700, margin: 0, letterSpacing: '-0.025em' }}>{MOCK.hero.name}</h1>
        <div style={{ width: 32, height: 2, background: '#1a1a1a', margin: '14px 0' }} />
        <div style={{ fontSize: 14, color: '#6b6b6b', marginBottom: 18 }}>{MOCK.hero.title}</div>
        <div style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 540 }}>{MOCK.hero.tagline}</div>
      </header>

      <section style={{ marginBottom: 56 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', marginBottom: 18 }}>ABOUT</div>
        <p style={{ margin: 0, fontSize: 14, color: '#1a1a1a', lineHeight: 1.9 }}>{MOCK.about}</p>
      </section>

      <section style={{ marginBottom: 56 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', marginBottom: 18 }}>WORKS</div>
        {MOCK.projects.map(p => (
          <div key={p.id} style={{ paddingTop: 24, paddingBottom: 24, borderTop: '1px solid #ececea' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{p.title}</h3>
              <div style={{ fontFamily: POC.mono, fontSize: 11, color: '#a0a0a0' }}>{p.period}</div>
            </div>
            <div style={{ fontSize: 12, color: '#6b6b6b', marginBottom: 14 }}>{p.role}</div>
            <div style={{ fontSize: 14, color: '#1a1a1a', marginBottom: 14, lineHeight: 1.8 }}>{p.action}</div>
            <div style={{ fontSize: 13, color: '#6b6b6b' }}>→ {p.result}</div>
          </div>
        ))}
      </section>

      <section>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', marginBottom: 18 }}>CONTACT</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MOCK.links.map(l => (
            <div key={l.id} style={{ display: 'flex', gap: 16, paddingBottom: 8, borderBottom: '1px solid #ececea', alignItems: 'baseline' }}>
              <div style={{ fontSize: 11, color: '#6b6b6b', letterSpacing: '0.16em', width: 80 }}>{l.kind.toUpperCase()}</div>
              <div style={{ fontFamily: POC.mono, fontSize: 13 }}>{l.url}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

window.POCard = POCard;
window.POMinimal = POMinimal;
