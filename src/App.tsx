import { useEffect, useRef, useState } from 'react';
import { Header } from './editor/Header';
import { LeftNav } from './editor/LeftNav';
import { FormPane } from './editor/FormPane';
import { PreviewPane } from './preview/PreviewPane';
import { Resizer } from './components/Resizer';
import { usePortfolio } from './store/usePortfolio';

const NAV_MIN = 200;
const NAV_MAX = 420;
const PV_MIN = 360;

const NAV_KEY = 'portfolio-editor:layout:nav';
const PV_KEY = 'portfolio-editor:layout:pv';

function loadInt(key: string, fallback: number): number {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const accent = usePortfolio((s) => s.theme.accent);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [navW, setNavW] = useState(() => loadInt(NAV_KEY, 260));
  const [pvW, setPvW] = useState(() => loadInt(PV_KEY, 600));

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty(
      '--accent-soft',
      `color-mix(in srgb, ${accent} 12%, transparent)`,
    );
  }, [accent]);

  useEffect(() => {
    try { localStorage.setItem(NAV_KEY, String(navW)); } catch { /* ignore */ }
  }, [navW]);
  useEffect(() => {
    try { localStorage.setItem(PV_KEY, String(pvW)); } catch { /* ignore */ }
  }, [pvW]);

  // Right pane is constrained by the available width minus nav and a sensible
  // minimum form width.
  const pvMax = () => {
    const w = bodyRef.current?.clientWidth ?? window.innerWidth;
    return Math.max(PV_MIN, w - navW - 360 - 12);
  };

  return (
    <div className="app">
      <Header />
      <div
        className="app-body"
        ref={bodyRef}
        style={{
          ['--nav-w' as string]: `${navW}px`,
          ['--pv-w' as string]: `${Math.min(pvW, pvMax())}px`,
        }}
      >
        <LeftNav />
        <Resizer
          className="r-nav"
          min={NAV_MIN}
          max={NAV_MAX}
          toWidth={(x) => x - (bodyRef.current?.getBoundingClientRect().left ?? 0)}
          onChange={setNavW}
        />
        <FormPane />
        <Resizer
          className="r-pv"
          min={PV_MIN}
          max={2000}
          toWidth={(x) => {
            const r = bodyRef.current?.getBoundingClientRect();
            if (!r) return pvW;
            return r.right - x;
          }}
          onChange={(w) => setPvW(Math.min(w, pvMax()))}
        />
        <PreviewPane />
      </div>
    </div>
  );
}
