import type { PortfolioData } from '../types';
import { renderHtml } from '../preview/renderHtml';

export function downloadHtml(data: PortfolioData) {
  const html = renderHtml(data);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = (data.hero.name || 'portfolio')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w\-ぁ-んァ-ヴー一-龠]/g, '');
  a.href = url;
  a.download = `${safeName || 'portfolio'}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
