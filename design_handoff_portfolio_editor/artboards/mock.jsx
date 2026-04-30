// Shared mock data + tiny atoms used across artboards.
// Pulled directly from src/seed.ts of the portfolio-editor repo.

const MOCK = {
  hero: {
    name: '山田 太郎',
    title: '大学生 / Webアプリ開発 / 教育DXに関心',
    tagline:
      '教育現場の非効率を、仕組みとテクノロジーで改善することに関心があります。',
  },
  about:
    '教育現場の業務改善に関心を持つ大学生です。塾運営のインターンでは、スケジュール提出の遅れによる業務負担を減らすため、Google Apps Scriptを使った自動通知の仕組みを作りました。現在は、業務改善・データ活用・Web制作を中心に学んでいます。',
  skills: [
    { id: 's1', cat: '技術', name: 'TypeScript / React', usage: '個人開発のWebアプリ複数本で、UI設計から実装まで担当。' },
    { id: 's2', cat: '技術', name: 'Google Apps Script', usage: '塾運営インターンで、未提出者の抽出・自動通知の仕組みを作成。' },
    { id: 's3', cat: 'ビジネス', name: '業務改善', usage: '現場のヒアリングから課題を整理し、ツール化・運用設計まで一貫して実施。' },
    { id: 's4', cat: 'ツール', name: 'Figma', usage: 'プロジェクトの画面設計・プロトタイプ作成に使用。' },
  ],
  projects: [
    {
      id: 'p1',
      title: 'スケジュール提出 自動リマインダー',
      period: '2025/04 — 2025/09',
      role: 'インターン / 設計・開発',
      problem: '講師のスケジュール提出遅延により、シフト確定が直前まで決まらず業務負担が発生。',
      action: 'Google Apps Scriptで未提出者の抽出と段階的なリマインドを自動化し、運用フローを整備。',
      result: '期限3日前の提出完了率を約80%から85〜90%に改善。シフト確定までの所要時間を短縮。',
      tools: ['Google Apps Script', 'Sheets', 'Calendar'],
    },
    {
      id: 'p2',
      title: 'ポートフォリオエディター',
      period: '2026/04 —',
      role: '個人開発',
      problem: '就活用ポートフォリオを作るとき、初心者ほど「何をどう書くか」で詰まる。',
      action: '型に沿った入力欄とライブプレビュー、HTML書き出しを備えたWebエディターを開発中。',
      result: 'MVPとして単一HTMLとして公開できる状態まで実装。継続的に改善中。',
      tools: ['React', 'TypeScript', 'Vite', 'Zustand'],
    },
  ],
  links: [
    { id: 'l1', kind: 'GitHub', url: 'github.com/yamada' },
    { id: 'l2', kind: 'Email', url: 'you@example.com' },
  ],
};

// Progress for the editor variations — % of fields filled.
const PROGRESS = {
  profile: 100,
  about: 100,
  skills: 100,
  projects: 75,  // shown as 1.5/2 filled
  links: 60,
  theme: 100,
  overall: 88,
};

// SVG icon helper — tiny Lucide-ish strokes, sized to currentColor.
function Icon({ name, size = 16, stroke = 1.5, style }) {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style,
  };
  const paths = {
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>,
    text: <><path d="M4 6h16M4 12h12M4 18h8" /></>,
    sparkles: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.5 2.5M16 16l2.5 2.5M5.5 18.5L8 16M16 8l2.5-2.5"/></>,
    box: <><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/></>,
    link: <><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></>,
    palette: <><circle cx="12" cy="12" r="9"/><circle cx="7.5" cy="10.5" r=".8" fill="currentColor"/><circle cx="12" cy="7.5" r=".8" fill="currentColor"/><circle cx="16.5" cy="10.5" r=".8" fill="currentColor"/><path d="M12 21a3 3 0 0 0 0-6 2 2 0 0 1 0-4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <><path d="M5 12h14"/></>,
    check: <><path d="M5 12l5 5L20 7"/></>,
    chevDown: <><path d="M6 9l6 6 6-6"/></>,
    chevRight: <><path d="M9 6l6 6-6 6"/></>,
    chevLeft: <><path d="M15 6l-6 6 6 6"/></>,
    grip: <><circle cx="9" cy="6" r="1.2" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="18" r="1.2" fill="currentColor"/><circle cx="15" cy="6" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="18" r="1.2" fill="currentColor"/></>,
    download: <><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/></>,
    refresh: <><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></>,
    monitor: <><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></>,
    smartphone: <><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    edit: <><path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="M14 6l4 4"/></>,
    cmd: <><path d="M9 6h6v6m0 3v3m-3 0h-3m-3-3v-3m0-3V6m0 0a3 3 0 1 0 3 3m6-3a3 3 0 1 1 3 3m-6 6a3 3 0 1 0-3 3m9-3a3 3 0 1 1-3 3"/></>,
    cloud: <><path d="M7 18a4 4 0 0 1-.9-7.9A6 6 0 0 1 17 9a4.5 4.5 0 0 1 0 9H7z"/></>,
    arrowUp: <><path d="M12 19V5M5 12l7-7 7 7"/></>,
    arrowDown: <><path d="M12 5v14M5 12l7 7 7-7"/></>,
    code: <><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></>,
    folder: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></>,
    star: <><path d="M12 3l2.6 6 6.4.5-4.9 4.2 1.5 6.3L12 16.8 6.4 20l1.5-6.3L3 9.5 9.4 9z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.4-4.4"/></>,
    moon: <><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></>,
    save: <><path d="M5 5h11l3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M8 5v5h7V5M8 19v-7h8v7"/></>,
    type: <><path d="M4 7V5h16v2M9 5v14M15 19h-3"/></>,
    layers: <><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5M3 18l9 5 9-5"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></>,
  };
  return <svg {...props}>{paths[name] || null}</svg>;
}

// Avatar placeholder (initials) for hero blocks
function Avatar({ size = 88, bg = '#1f2630', fg = '#9aa4b2', initials = 'YT', font = 'inherit' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 500, letterSpacing: '0.05em',
      fontFamily: font, flex: 'none',
    }}>
      {initials}
    </div>
  );
}

window.MOCK = MOCK;
window.PROGRESS = PROGRESS;
window.Icon = Icon;
window.Avatar = Avatar;
