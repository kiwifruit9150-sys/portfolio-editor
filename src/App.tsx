import { EditorPanel } from './editor/EditorPanel';
import { PreviewPane } from './preview/PreviewPane';
import { usePortfolio } from './store/usePortfolio';
import { downloadHtml } from './export/exportHtml';

export default function App() {
  const data = usePortfolio((s) => s.data);
  const reset = usePortfolio((s) => s.reset);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-title">
          <span className="logo-dot" />
          Portfolio Editor
          <span className="app-sub">就活向け個人HPエディター</span>
        </div>
        <div className="app-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              if (
                confirm(
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
            HTMLエクスポート
          </button>
        </div>
      </header>
      <main className="app-main">
        <EditorPanel />
        <PreviewPane />
      </main>
    </div>
  );
}
