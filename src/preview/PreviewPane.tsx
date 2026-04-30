import { useShallow } from 'zustand/react/shallow';
import { usePortfolio } from '../store/usePortfolio';
import { Icon } from '../components/Icon';
import { THEMES } from './themes/registry';

export function PreviewPane() {
  const data = usePortfolio(
    useShallow((s) => ({
      profile: s.profile,
      about: s.about,
      skills: s.skills,
      projects: s.projects,
      links: s.links,
      theme: s.theme,
    })),
  );
  const order = usePortfolio((s) => s.ui.sectionOrder);
  const device = usePortfolio((s) => s.ui.previewDevice);
  const setDevice = usePortfolio((s) => s.setPreviewDevice);
  const setActive = usePortfolio((s) => s.setActiveSection);
  const meta = THEMES[data.theme.id] ?? THEMES.editorial;
  const Component = meta.Component;

  return (
    <div className="pv">
      <div className="pv-bar">
        <div className="pv-bar-l">
          <span className="dot" />
          ライブプレビュー · <span className="name">{meta.name}</span>
          <span className="hint">クリックで該当セクションに移動</span>
        </div>
        <div className="seg">
          <button
            type="button"
            className={device === 'desktop' ? 'on' : ''}
            onClick={() => setDevice('desktop')}
            aria-label="PC"
          >
            <Icon name="monitor" size={13} />
          </button>
          <button
            type="button"
            className={device === 'mobile' ? 'on' : ''}
            onClick={() => setDevice('mobile')}
            aria-label="スマホ"
          >
            <Icon name="smartphone" size={13} />
          </button>
        </div>
      </div>
      <div className="pv-stage" style={{ background: meta.stageBg }}>
        <div className={`pv-frame ${device === 'mobile' ? 'mobile' : ''}`}>
          <Component data={data} order={order} onJump={setActive} />
        </div>
      </div>
    </div>
  );
}
