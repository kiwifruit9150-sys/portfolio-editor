import { usePortfolio } from '../../store/usePortfolio';
import type { ThemeMode } from '../../types';
import { Icon } from '../../components/Icon';
import { Field } from './Field';
import { THEME_LIST } from '../../preview/themes/registry';

const PRESETS = ['#ea6e3a', '#1a1a1a', '#0ea5e9', '#16a34a', '#7c5cff', '#db2777'];

export function ThemeForm() {
  const theme = usePortfolio((s) => s.theme);
  const setThemeId = usePortfolio((s) => s.setThemeId);
  const setAccent = usePortfolio((s) => s.setAccent);
  const setMode = usePortfolio((s) => s.setMode);
  const setDensity = usePortfolio((s) => s.setDensity);

  return (
    <>
      <Field
        label="ポートフォリオのスタイル"
        hint="クリックすると右のプレビューが切り替わります。"
      >
        <div className="theme-grid">
          {THEME_LIST.map((t) => {
            const on = t.id === theme.id;
            const Thumb = t.Thumb;
            return (
              <button
                key={t.id}
                type="button"
                className={`theme-card ${on ? 'on' : ''}`}
                onClick={() => setThemeId(t.id)}
                aria-pressed={on}
              >
                <div className="theme-thumb">
                  <Thumb />
                  {t.recommended && (
                    <span className="theme-badge">
                      <Icon name="star" size={9} />
                      おすすめ
                    </span>
                  )}
                  {on && (
                    <span className="theme-check">
                      <Icon name="check" size={13} />
                    </span>
                  )}
                </div>
                <div className="theme-meta">
                  <div className="theme-name">
                    <span className="n">{t.name}</span>
                    <span className="t">{t.tag}</span>
                  </div>
                  <div className="theme-desc">{t.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Field>

      <Field
        label="アクセントカラー"
        hint="見出し・リンクに使われる色。ヘッダーにも反映されます。"
      >
        <div className="swatch-row">
          <input
            type="color"
            className="swatch-big"
            value={theme.accent}
            onChange={(e) => setAccent(e.target.value)}
          />
          <input
            type="text"
            className="swatch-hex"
            value={theme.accent}
            onChange={(e) => setAccent(e.target.value)}
          />
          <div className="swatch-presets">
            {PRESETS.map((c) => (
              <button
                key={c}
                type="button"
                className={`swatch-dot ${c.toLowerCase() === theme.accent.toLowerCase() ? 'on' : ''}`}
                style={{ background: c }}
                onClick={() => setAccent(c)}
                aria-label={c}
              />
            ))}
          </div>
        </div>
      </Field>

      <div className="field-row">
        <Field label="モード" hint="現状はテーマ識別性を優先して固定です (Phase 3 で対応予定)">
          <ModeSelect mode={theme.mode} onChange={setMode} />
        </Field>
        <Field label="余白の広さ">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, color: 'var(--dim)' }}>密</span>
            <div className="density-track" style={{ position: 'relative' }}>
              <div className="density-fill" style={{ width: `${theme.density * 100}%` }} />
              <input
                className="density-input"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={theme.density}
                onChange={(e) => setDensity(parseFloat(e.target.value))}
              />
            </div>
            <span style={{ fontSize: 11, color: 'var(--dim)' }}>ゆとり</span>
          </div>
        </Field>
      </div>
    </>
  );
}

function ModeSelect({
  mode,
  onChange,
}: {
  mode: ThemeMode;
  onChange: (m: ThemeMode) => void;
}) {
  return (
    <div className="seg">
      <button type="button" className={mode === 'auto' ? 'on' : ''} onClick={() => onChange('auto')}>
        <Icon name="monitor" size={12} />
        自動
      </button>
      <button type="button" className={mode === 'light' ? 'on' : ''} onClick={() => onChange('light')}>
        <Icon name="sun" size={12} />
        ライト
      </button>
      <button type="button" className={mode === 'dark' ? 'on' : ''} onClick={() => onChange('dark')}>
        <Icon name="moon" size={12} />
        ダーク
      </button>
    </div>
  );
}
