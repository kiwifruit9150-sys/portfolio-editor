import { usePortfolio } from '../../store/usePortfolio';
import type { ThemeMode } from '../../types';
import { Icon } from '../../components/Icon';
import { Field } from './Field';

const PRESETS = ['#ea6e3a', '#1a1a1a', '#0ea5e9', '#16a34a', '#7c5cff', '#db2777'];

export function ThemeForm() {
  const theme = usePortfolio((s) => s.theme);
  const setAccent = usePortfolio((s) => s.setAccent);
  const setMode = usePortfolio((s) => s.setMode);
  const setDensity = usePortfolio((s) => s.setDensity);

  return (
    <>
      <Field
        label="ポートフォリオのスタイル"
        hint="Phase 1 では Editorial (紙・セリフ) のみ。今後 Mono / Card / Minimal を追加予定。"
      >
        <div className="item" style={{ borderColor: 'var(--accent)', boxShadow: '0 0 0 3px color-mix(in srgb, var(--accent) 16%, transparent)', margin: 0 }}>
          <div className="item-head">
            <span style={{
              width: 28, height: 28, borderRadius: 6,
              background: '#fbf9f4', border: '1px solid var(--hairline)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-serif)', fontSize: 14, color: '#1c1a17',
            }}>A</span>
            <span className="title">Editorial</span>
            <span className="tag-chip">選択中</span>
          </div>
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
        <Field label="モード">
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

function ModeSelect({ mode, onChange }: { mode: ThemeMode; onChange: (m: ThemeMode) => void }) {
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
