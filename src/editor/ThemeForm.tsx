import { usePortfolio } from '../store/usePortfolio';
import { Field } from '../components/Field';

const PRESETS = ['#2f6feb', '#16a34a', '#db2777', '#f97316', '#7c3aed', '#0ea5e9'];

export function ThemeForm() {
  const theme = usePortfolio((s) => s.data.theme);
  const setAccent = usePortfolio((s) => s.setAccent);
  const setMode = usePortfolio((s) => s.setMode);

  return (
    <section className="form-section">
      <h2 className="form-section-title">テーマ</h2>
      <Field label="アクセントカラー">
        <div className="theme-row">
          <input
            type="color"
            value={theme.accent}
            onChange={(e) => setAccent(e.target.value)}
          />
          <input
            type="text"
            className="theme-hex"
            value={theme.accent}
            onChange={(e) => setAccent(e.target.value)}
          />
        </div>
        <div className="theme-presets">
          {PRESETS.map((c) => (
            <button
              key={c}
              type="button"
              className="preset"
              style={{ background: c }}
              aria-label={c}
              onClick={() => setAccent(c)}
            />
          ))}
        </div>
      </Field>
      <Field label="モード">
        <div className="seg-control">
          <button
            type="button"
            className={theme.mode === 'light' ? 'active' : ''}
            onClick={() => setMode('light')}
          >
            ライト
          </button>
          <button
            type="button"
            className={theme.mode === 'dark' ? 'active' : ''}
            onClick={() => setMode('dark')}
          >
            ダーク
          </button>
        </div>
      </Field>
    </section>
  );
}
