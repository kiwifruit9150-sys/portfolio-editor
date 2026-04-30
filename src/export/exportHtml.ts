import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import type { PortfolioData } from '../types';
import { Editorial } from '../preview/Editorial';

export function buildHtml(data: PortfolioData): string {
  const body = renderToStaticMarkup(createElement(Editorial, { data }));
  const title = data.profile.name
    ? `${data.profile.name} – Portfolio`
    : 'Portfolio';
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Noto+Serif+JP:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  html, body { margin: 0; padding: 0; background: #fbf9f4; }
  body { -webkit-font-smoothing: antialiased; }
  a:hover { text-decoration: underline; }
  @media (max-width: 640px) {
    body > div { padding-left: 24px !important; padding-right: 24px !important; }
  }
</style>
</head>
<body>
${body}
</body>
</html>`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function downloadHtml(data: PortfolioData) {
  const html = buildHtml(data);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const name = (data.profile.name || 'portfolio')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w\-ぁ-んァ-ヴー一-龠]/g, '');
  a.href = url;
  a.download = `${name || 'portfolio'}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
