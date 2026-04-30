import { useMemo } from 'react';
import { overallPct, usePortfolio } from '../store/usePortfolio';
import { downloadHtml } from '../export/exportHtml';
import { Icon } from '../components/Icon';

export function Header() {
  const status = usePortfolio((s) => s.ui.autoSaveStatus);
  const lastSavedAt = usePortfolio((s) => s.ui.lastSavedAt);
  const reset = usePortfolio((s) => s.reset);
  const pct = usePortfolio((s) => overallPct(s));

  const data = usePortfolio((s) => ({
    profile: s.profile,
    about: s.about,
    skills: s.skills,
    projects: s.projects,
    links: s.links,
    theme: s.theme,
  }));

  const saveLabel = useMemo(() => {
    if (status === 'saving') return '保存中…';
    if (status === 'error') return '保存に失敗';
    if (status === 'saved') return '保存しました';
    if (lastSavedAt > 0) {
      const sec = Math.max(1, Math.round((Date.now() - lastSavedAt) / 1000));
      return `自動保存済み · ${sec}秒前`;
    }
    return '自動保存待機中';
  }, [status, lastSavedAt]);

  return (
    <header className="hd">
      <div className="hd-l">
        <div className="hd-logo">P</div>
        <div className="hd-title">Portfolio Editor</div>
        <div className="hd-sep" />
        <div className={`hd-save ${status}`}>
          <span className="dot" />
          {saveLabel}
        </div>
      </div>
      <div className="hd-r">
        <div className="hd-progress" title={`完成度 ${pct}%`}>
          <ProgressRing pct={pct} />
          <div className="hd-lbl">
            <span className="num">{pct}%</span>
            <span className="lbl"> 完成</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            if (
              window.confirm(
                '編集内容をリセットして初期サンプルに戻します。よろしいですか？',
              )
            ) {
              reset();
            }
          }}
        >
          リセット
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => downloadHtml(data)}
        >
          <Icon name="download" size={13} />
          HTMLエクスポート
        </button>
      </div>
    </header>
  );
}

function ProgressRing({ pct, size = 28 }: { pct: number; size?: number }) {
  const r = (size - 4) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--hairline)" strokeWidth={2.5} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="var(--accent)" strokeWidth={2.5}
        strokeDasharray={c} strokeDashoffset={off}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset .3s ease-out' }}
      />
    </svg>
  );
}
