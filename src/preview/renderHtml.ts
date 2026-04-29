import type { PortfolioData, SkillCategory } from '../types';
import { buildCss } from './styles';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(s: string): string {
  return esc(s).replace(/\n/g, '<br>');
}

const CATEGORY_LABEL: Record<SkillCategory, string> = {
  tech: '技術',
  business: 'ビジネス',
  tool: 'ツール',
};

function safeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function renderHero(d: PortfolioData): string {
  const avatar = d.hero.avatar
    ? `<img class="avatar" src="${esc(d.hero.avatar)}" alt="${esc(d.hero.name)}">`
    : '<div class="avatar" aria-hidden="true"></div>';
  return `
<header class="hero">
  ${avatar}
  <div>
    <h1 class="name">${esc(d.hero.name) || 'Your Name'}</h1>
    <p class="title">${esc(d.hero.title)}</p>
    <p class="tagline">${esc(d.hero.tagline)}</p>
  </div>
</header>`;
}

function renderAbout(d: PortfolioData): string {
  if (!d.about.trim()) return '';
  return `
<section class="section about">
  <h2>About</h2>
  <p>${nl2br(d.about)}</p>
</section>`;
}

function renderSkills(d: PortfolioData): string {
  if (d.skills.length === 0) return '';
  const items = d.skills
    .map(
      (s) => `
  <div class="skill">
    <div class="row">
      <span class="name">${esc(s.name) || '(無題)'}</span>
      <span class="cat">${esc(CATEGORY_LABEL[s.category])}</span>
    </div>
    ${s.usage.trim() ? `<p class="usage">${nl2br(s.usage)}</p>` : ''}
  </div>`,
    )
    .join('');
  return `
<section class="section">
  <h2>Skills</h2>
  <div class="skills">${items}</div>
</section>`;
}

function renderProjects(d: PortfolioData): string {
  if (d.projects.length === 0) return '';
  const items = d.projects
    .map((p) => {
      const tools = p.tools
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => `<span>${esc(t)}</span>`)
        .join('');
      const link = p.link.trim()
        ? `<p class="more"><a href="${esc(safeUrl(p.link))}" target="_blank" rel="noopener">プロジェクトを見る →</a></p>`
        : '';
      const image = p.image
        ? `<img class="image" src="${esc(p.image)}" alt="">`
        : '';
      const blocks: string[] = [];
      if (p.problem.trim())
        blocks.push(`<dt>課題</dt><dd>${nl2br(p.problem)}</dd>`);
      if (p.action.trim())
        blocks.push(`<dt>行動</dt><dd>${nl2br(p.action)}</dd>`);
      if (p.result.trim())
        blocks.push(`<dt>成果</dt><dd>${nl2br(p.result)}</dd>`);
      const meta = [p.period, p.role].filter((s) => s.trim()).join(' / ');
      return `
  <article class="project">
    ${image}
    <h3>${esc(p.title) || '(無題)'}</h3>
    ${meta ? `<p class="meta">${esc(meta)}</p>` : ''}
    ${blocks.length ? `<dl>${blocks.join('')}</dl>` : ''}
    ${tools ? `<div class="tools">${tools}</div>` : ''}
    ${link}
  </article>`;
    })
    .join('');
  return `
<section class="section">
  <h2>Projects</h2>
  <div class="projects">${items}</div>
</section>`;
}

function renderLinks(d: PortfolioData): string {
  const visible = d.links.filter((l) => l.url.trim() || l.label.trim());
  if (visible.length === 0) return '';
  const items = visible
    .map(
      (l) =>
        `<a href="${esc(safeUrl(l.url))}" target="_blank" rel="noopener">${esc(l.label) || esc(l.kind)}</a>`,
    )
    .join('');
  return `
<section class="section">
  <h2>Contact</h2>
  <div class="links">${items}</div>
</section>`;
}

export function renderHtml(d: PortfolioData): string {
  const css = buildCss(d.theme);
  const body = [
    renderHero(d),
    renderAbout(d),
    renderSkills(d),
    renderProjects(d),
    renderLinks(d),
  ].join('\n');
  const title = d.hero.name ? `${d.hero.name} - Portfolio` : 'Portfolio';
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>${css}</style>
</head>
<body>
<main class="container">
${body}
</main>
</body>
</html>`;
}
