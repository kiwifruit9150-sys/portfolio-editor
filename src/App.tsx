import { useEffect } from 'react';
import { Header } from './editor/Header';
import { LeftNav } from './editor/LeftNav';
import { FormPane } from './editor/FormPane';
import { PreviewPane } from './preview/PreviewPane';
import { usePortfolio } from './store/usePortfolio';

export default function App() {
  const accent = usePortfolio((s) => s.theme.accent);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty(
      '--accent-soft',
      `color-mix(in srgb, ${accent} 12%, transparent)`,
    );
  }, [accent]);

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <LeftNav />
        <FormPane />
        <PreviewPane />
      </div>
    </div>
  );
}
