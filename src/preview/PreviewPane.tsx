import { useMemo, useState } from 'react';
import { usePortfolio } from '../store/usePortfolio';
import { renderHtml } from './renderHtml';

type DeviceMode = 'pc' | 'mobile';

export function PreviewPane() {
  const data = usePortfolio((s) => s.data);
  const [device, setDevice] = useState<DeviceMode>('pc');
  const html = useMemo(() => renderHtml(data), [data]);

  return (
    <div className="preview-pane">
      <div className="preview-toolbar">
        <span className="preview-toolbar-title">プレビュー</span>
        <div className="device-switch">
          <button
            type="button"
            className={device === 'pc' ? 'active' : ''}
            onClick={() => setDevice('pc')}
          >
            PC
          </button>
          <button
            type="button"
            className={device === 'mobile' ? 'active' : ''}
            onClick={() => setDevice('mobile')}
          >
            スマホ
          </button>
        </div>
      </div>
      <div className={`preview-frame-wrap device-${device}`}>
        <iframe
          className="preview-frame"
          title="portfolio preview"
          srcDoc={html}
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}
