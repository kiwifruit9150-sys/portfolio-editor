import type { ComponentType } from 'react';
import type { PortfolioData, SectionId, ThemeId } from '../../types';
import { Editorial } from './Editorial';
import { Mono } from './Mono';
import { Card } from './Card';
import { Minimal } from './Minimal';
import { ThumbCard, ThumbEditorial, ThumbMinimal, ThumbMono } from './thumbs';

export type ThemeProps = {
  data: PortfolioData;
  /** Section ids in the order they should render. Filtered to renderable ids. */
  order: SectionId[];
  /** When set, the live preview can navigate the editor to a section on click. */
  onJump?: (id: SectionId) => void;
};

export type ThemeMeta = {
  id: ThemeId;
  name: string;
  tag: string;
  desc: string;
  Component: ComponentType<ThemeProps>;
  Thumb: ComponentType;
  recommended?: boolean;
  /** Background color used for the preview stage backdrop. */
  stageBg: string;
};

export const THEMES: Record<ThemeId, ThemeMeta> = {
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    tag: '紙・セリフ',
    desc: '読み物として読まれやすい人向き、丁寧×端正。',
    Component: Editorial,
    Thumb: ThumbEditorial,
    recommended: true,
    stageBg: '#f0eee9',
  },
  mono: {
    id: 'mono',
    name: 'Mono',
    tag: 'ダーク・コード',
    desc: 'エンジニア寄り、ターミナル風の硬質さ。',
    Component: Mono,
    Thumb: ThumbMono,
    stageBg: '#0a0a0c',
  },
  card: {
    id: 'card',
    name: 'Card',
    tag: 'カード・整列',
    desc: 'スキル/作品の点数が多い人に、Notion風。',
    Component: Card,
    Thumb: ThumbCard,
    stageBg: '#f7f7f5',
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    tag: '白・余白多め',
    desc: '一発で「分かりやすい」と思わせる定番。',
    Component: Minimal,
    Thumb: ThumbMinimal,
    stageBg: '#ffffff',
  },
};

export const THEME_LIST: ThemeMeta[] = [
  THEMES.editorial,
  THEMES.mono,
  THEMES.card,
  THEMES.minimal,
];
