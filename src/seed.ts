import type { PortfolioData } from './types';

export const seedData: PortfolioData = {
  hero: {
    name: '山田 太郎',
    title: '大学生 / Webアプリ開発 / 教育DXに関心',
    tagline:
      '教育現場の非効率を、仕組みとテクノロジーで改善することに関心があります。',
  },
  about:
    '教育現場の業務改善に関心を持つ大学生です。塾運営のインターンでは、スケジュール提出の遅れによる業務負担を減らすため、Google Apps Scriptを使った自動通知の仕組みを作りました。現在は、業務改善・データ活用・Web制作を中心に学んでいます。',
  skills: [
    {
      id: 's1',
      category: 'tech',
      name: 'TypeScript / React',
      usage: '個人開発のWebアプリ複数本で、UI設計から実装まで担当。',
    },
    {
      id: 's2',
      category: 'tech',
      name: 'Google Apps Script',
      usage:
        '塾運営インターンで、未提出者の抽出・自動通知の仕組みを作成。',
    },
    {
      id: 's3',
      category: 'business',
      name: '業務改善',
      usage:
        '現場のヒアリングから課題を整理し、ツール化・運用設計まで一貫して実施。',
    },
    {
      id: 's4',
      category: 'tool',
      name: 'Figma',
      usage: 'プロジェクトの画面設計・プロトタイプ作成に使用。',
    },
  ],
  projects: [
    {
      id: 'p1',
      title: 'スケジュール提出 自動リマインダー',
      period: '2025/04 - 2025/09',
      role: 'インターン / 設計・開発',
      problem:
        '講師のスケジュール提出遅延により、シフト確定が直前まで決まらず業務負担が発生。',
      action:
        'Google Apps Scriptで未提出者の抽出と段階的なリマインドを自動化し、運用フローを整備。',
      result:
        '期限3日前の提出完了率を約80%から85〜90%に改善。シフト確定までの所要時間を短縮。',
      tools: 'Google Apps Script, Sheets, Calendar',
      link: '',
    },
    {
      id: 'p2',
      title: 'ポートフォリオエディター',
      period: '2026/04 -',
      role: '個人開発',
      problem:
        '就活用ポートフォリオを作るとき、初心者ほど「何をどう書くか」で詰まる。',
      action:
        '型に沿った入力欄とライブプレビュー、HTML書き出しを備えたWebエディターを開発中。',
      result:
        'MVPとして単一HTMLとして公開できる状態まで実装。継続的に改善中。',
      tools: 'React, TypeScript, Vite, Zustand',
      link: '',
    },
  ],
  links: [
    { id: 'l1', kind: 'github', label: 'GitHub', url: 'https://github.com/' },
    { id: 'l2', kind: 'email', label: 'Email', url: 'mailto:you@example.com' },
  ],
  theme: {
    accent: '#2f6feb',
    mode: 'light',
  },
};
