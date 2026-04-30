import { usePortfolio } from '../store/usePortfolio';
import { Icon } from '../components/Icon';
import { Editorial } from './Editorial';

export function PreviewPane() {
  const data = usePortfolio((s) => ({
    profile: s.profile,
    about: s.about,
    skills: s.skills,
    projects: s.projects,
    links: s.links,
    theme: s.theme,
  }));
  const device = usePortfolio((s) => s.ui.previewDevice);
  const setDevice = usePortfolio((s) => s.setPreviewDevice);
  const themeName = themeLabel(data.theme.id);

  return (
    <div className="pv">
      <div className="pv-bar">
        <div className="pv-bar-l">
          <span className="dot" />
          ライブプレビュー · <span className="name">{themeName}</span>
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
      <div className="pv-stage">
        <div className={`pv-frame ${device === 'mobile' ? 'mobile' : ''}`}>
          <Editorial data={data} />
        </div>
      </div>
    </div>
  );
}

function themeLabel(id: string) {
  switch (id) {
    case 'editorial': return 'Editorial';
    case 'mono': return 'Mono';
    case 'card': return 'Card';
    case 'minimal': return 'Minimal';
    default: return id;
  }
}
