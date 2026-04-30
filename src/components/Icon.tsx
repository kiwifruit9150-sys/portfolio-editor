import type { CSSProperties, ReactElement } from 'react';

export type IconName =
  | 'user' | 'text' | 'sparkles' | 'box' | 'link' | 'palette'
  | 'plus' | 'minus' | 'check' | 'chevDown' | 'chevRight' | 'chevLeft'
  | 'grip' | 'download' | 'refresh' | 'monitor' | 'smartphone'
  | 'eye' | 'edit' | 'cloud' | 'arrowUp' | 'arrowDown'
  | 'star' | 'search' | 'moon' | 'sun' | 'save' | 'x' | 'trash' | 'help';

type Props = {
  name: IconName;
  size?: number;
  stroke?: number;
  style?: CSSProperties;
  className?: string;
};

export function Icon({ name, size = 16, stroke = 1.5, style, className }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style,
    className,
  };
  const paths: Record<IconName, ReactElement> = {
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>,
    text: <path d="M4 6h16M4 12h12M4 18h8" />,
    sparkles: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.5 2.5M16 16l2.5 2.5M5.5 18.5L8 16M16 8l2.5-2.5" />,
    box: <><path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 7v10l9 4 9-4V7" /></>,
    link: <><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></>,
    palette: <><circle cx="12" cy="12" r="9" /><circle cx="7.5" cy="10.5" r=".8" fill="currentColor" /><circle cx="12" cy="7.5" r=".8" fill="currentColor" /><circle cx="16.5" cy="10.5" r=".8" fill="currentColor" /><path d="M12 21a3 3 0 0 0 0-6 2 2 0 0 1 0-4" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    check: <path d="M5 12l5 5L20 7" />,
    chevDown: <path d="M6 9l6 6 6-6" />,
    chevRight: <path d="M9 6l6 6-6 6" />,
    chevLeft: <path d="M15 6l-6 6 6 6" />,
    grip: <><circle cx="9" cy="6" r="1.2" fill="currentColor" /><circle cx="9" cy="12" r="1.2" fill="currentColor" /><circle cx="9" cy="18" r="1.2" fill="currentColor" /><circle cx="15" cy="6" r="1.2" fill="currentColor" /><circle cx="15" cy="12" r="1.2" fill="currentColor" /><circle cx="15" cy="18" r="1.2" fill="currentColor" /></>,
    download: <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />,
    refresh: <><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></>,
    monitor: <><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></>,
    smartphone: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    edit: <><path d="M4 20h4l10-10-4-4L4 16v4z" /><path d="M14 6l4 4" /></>,
    cloud: <path d="M7 18a4 4 0 0 1-.9-7.9A6 6 0 0 1 17 9a4.5 4.5 0 0 1 0 9H7z" />,
    arrowUp: <path d="M12 19V5M5 12l7-7 7 7" />,
    arrowDown: <path d="M12 5v14M5 12l7 7 7-7" />,
    star: <path d="M12 3l2.6 6 6.4.5-4.9 4.2 1.5 6.3L12 16.8 6.4 20l1.5-6.3L3 9.5 9.4 9z" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.4-4.4" /></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" /></>,
    save: <><path d="M5 5h11l3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /><path d="M8 5v5h7V5M8 19v-7h8v7" /></>,
    x: <path d="M6 6l12 12M18 6L6 18" />,
    trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4M12 17h.01" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
