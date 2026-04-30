// 4 abstract miniatures used in the theme picker cards.
// They are intentionally fixed-size mock visuals (no real data) — they need to
// fit a 168px-tall, ~250px-wide card so users can spot the style at a glance.

export function ThumbEditorial() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fbf9f4', padding: 14, fontFamily: '"Noto Serif JP", serif' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#e5dfd2' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 6, color: '#a39884', letterSpacing: '0.18em', marginBottom: 1 }}>PORTFOLIO</div>
          <div style={{ fontSize: 11, fontWeight: 500, color: '#1c1a17' }}>山田 太郎</div>
        </div>
      </div>
      <div style={{ borderLeft: '1.5px solid #b8472a', paddingLeft: 6, fontStyle: 'italic', fontSize: 7, color: '#1c1a17', marginBottom: 10, lineHeight: 1.4 }}>
        教育現場の非効率を仕組みで…
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 5, color: '#6b6256' }}>02</span>
        <span style={{ fontSize: 8, color: '#1c1a17' }}>Skills</span>
        <div style={{ flex: 1, height: 1, background: '#e5dfd2' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 7, paddingBottom: 4, borderBottom: '1px solid #e5dfd2' }}>
        <div style={{ fontSize: 5, fontStyle: 'italic', color: '#b8472a' }}>— 技術</div>
        <div style={{ fontSize: 7, fontWeight: 500 }}>TypeScript</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 7, paddingTop: 4 }}>
        <div style={{ fontSize: 5, fontStyle: 'italic', color: '#b8472a' }}>— 業務</div>
        <div style={{ fontSize: 7, fontWeight: 500 }}>業務改善</div>
      </div>
    </div>
  );
}

export function ThumbMono() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0c', padding: 14, fontFamily: '"Noto Sans JP", sans-serif' }}>
      <div style={{ fontFamily: 'monospace', fontSize: 6, color: '#5a5b64', marginBottom: 4 }}>$ whoami</div>
      <div style={{
        fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em',
        background: 'linear-gradient(120deg, #e6e6e9, #3ad4c8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>山田 太郎</div>
      <div style={{ fontFamily: 'monospace', fontSize: 6, color: '#8a8b94', marginBottom: 10 }}>Web / 教育DX</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 5, color: '#5a5b64' }}>03</span>
        <span style={{ fontSize: 6, color: '#7c5cff', letterSpacing: '0.18em', fontWeight: 700 }}>PROJECTS</span>
        <div style={{ flex: 1, height: 1, background: '#1f1f24' }} />
      </div>
      <div style={{ background: '#111114', border: '1px solid #1f1f24', borderRadius: 4, padding: 7, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1.5, background: 'linear-gradient(180deg, #7c5cff, #3ad4c8)' }} />
        <div style={{ fontSize: 7, fontWeight: 700, color: '#e6e6e9', marginBottom: 4 }}>自動リマインダー</div>
        <div style={{ display: 'flex', gap: 3 }}>
          {['GAS', 'Sheets', 'Cal'].map((t) => (
            <span key={t} style={{ fontSize: 5, padding: '1px 4px', borderRadius: 2, border: '1px solid #1f1f24', color: '#8a8b94', fontFamily: 'monospace' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ThumbCard() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f7f7f5', padding: 14, fontFamily: '"Noto Sans JP", sans-serif' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10, padding: 8, background: '#fff', border: '1px solid #ececea', borderRadius: 4 }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700 }}>山</div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700 }}>山田 太郎</div>
          <div style={{ fontSize: 6, color: '#6b6b6b' }}>Web / 教育DX</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginBottom: 5 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ececea', borderRadius: 4, padding: 5 }}>
            <div style={{ width: '50%', height: 3, background: '#1a1a1a', borderRadius: 1, marginBottom: 3 }} />
            <div style={{ width: '90%', height: 2, background: '#ececea', borderRadius: 1, marginBottom: 1 }} />
            <div style={{ width: '70%', height: 2, background: '#ececea', borderRadius: 1 }} />
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid #ececea', borderRadius: 4, padding: 6 }}>
        <div style={{ fontSize: 6, fontWeight: 700, marginBottom: 3 }}>主なプロジェクト</div>
        <div style={{ width: '90%', height: 2, background: '#ececea', borderRadius: 1, marginBottom: 1 }} />
        <div style={{ width: '70%', height: 2, background: '#ececea', borderRadius: 1 }} />
      </div>
    </div>
  );
}

export function ThumbMinimal() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', padding: '18px 16px', fontFamily: '"Noto Sans JP", sans-serif' }}>
      <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 2 }}>山田 太郎</div>
      <div style={{ width: 16, height: 1.5, background: '#1a1a1a', marginBottom: 6 }} />
      <div style={{ fontSize: 6, color: '#6b6b6b', marginBottom: 10 }}>大学生 / Webアプリ開発</div>
      <div style={{ fontSize: 7, color: '#1a1a1a', lineHeight: 1.6, marginBottom: 10 }}>
        教育現場の非効率を仕組みで改善することに関心。
      </div>
      <div style={{ fontSize: 6, fontWeight: 600, letterSpacing: '0.18em', color: '#1a1a1a', marginBottom: 5 }}>WORKS</div>
      {[1, 2].map((i) => (
        <div key={i} style={{ paddingTop: 4, paddingBottom: 4, borderTop: '1px solid #ececea', display: 'grid', gridTemplateColumns: '1fr auto', gap: 5 }}>
          <div style={{ width: '70%', height: 3, background: '#1a1a1a', borderRadius: 1 }} />
          <div style={{ width: 14, height: 2, background: '#a0a0a0', borderRadius: 1 }} />
        </div>
      ))}
    </div>
  );
}
