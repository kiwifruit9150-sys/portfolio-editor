import type { PortfolioData } from '../types';

export function buildCss(theme: PortfolioData['theme']): string {
  const isDark = theme.mode === 'dark';
  const bg = isDark ? '#0f1115' : '#ffffff';
  const fg = isDark ? '#e7e9ee' : '#1a1d23';
  const sub = isDark ? '#a0a6b3' : '#5b6473';
  const card = isDark ? '#171a21' : '#f6f7f9';
  const border = isDark ? '#262a33' : '#e6e8ec';

  return `
:root {
  --accent: ${theme.accent};
  --bg: ${bg};
  --fg: ${fg};
  --sub: ${sub};
  --card: ${card};
  --border: ${border};
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--fg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans",
    "Hiragino Kaku Gothic ProN", "Noto Sans JP", Meiryo, sans-serif;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
.container { max-width: 760px; margin: 0 auto; padding: 56px 24px 96px; }
.hero { display: flex; gap: 24px; align-items: center; margin-bottom: 48px; }
.hero .avatar {
  width: 88px; height: 88px; border-radius: 50%;
  background: var(--card); object-fit: cover; flex: none;
  border: 1px solid var(--border);
}
.hero .name { font-size: 28px; font-weight: 700; margin: 0 0 4px; }
.hero .title { color: var(--sub); margin: 0 0 8px; font-size: 14px; }
.hero .tagline { margin: 0; font-size: 16px; }
.section { margin-bottom: 48px; }
.section h2 {
  font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
  color: var(--accent); margin: 0 0 16px; font-weight: 700;
}
.about p { margin: 0; white-space: pre-wrap; }
.skills { display: grid; gap: 12px; }
.skill {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 10px; padding: 14px 16px;
}
.skill .row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.skill .name { font-weight: 600; }
.skill .cat {
  font-size: 11px; padding: 2px 8px; border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent);
}
.skill .usage { color: var(--sub); margin: 6px 0 0; font-size: 14px; }
.projects { display: grid; gap: 16px; }
.project {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 12px; padding: 20px; overflow: hidden;
}
.project h3 { margin: 0 0 4px; font-size: 18px; }
.project .meta { color: var(--sub); font-size: 13px; margin: 0 0 14px; }
.project .image { width: 100%; border-radius: 8px; margin: 0 0 14px; display: block; }
.project dl { margin: 0; display: grid; gap: 10px; }
.project dt {
  font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
  color: var(--accent); font-weight: 700;
}
.project dd { margin: 2px 0 0; white-space: pre-wrap; }
.project .tools {
  margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px;
}
.project .tools span {
  font-size: 12px; padding: 3px 8px; border-radius: 6px;
  border: 1px solid var(--border); color: var(--sub);
}
.project .more { margin-top: 12px; font-size: 14px; }
.links { display: flex; flex-wrap: wrap; gap: 10px; }
.links a {
  border: 1px solid var(--border); padding: 8px 14px; border-radius: 8px;
  font-size: 14px; color: var(--fg);
}
.links a:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }
@media (max-width: 540px) {
  .container { padding: 32px 18px 64px; }
  .hero { flex-direction: column; align-items: flex-start; gap: 16px; }
  .hero .name { font-size: 24px; }
}
`;
}
