import { usePortfolio } from '../../store/usePortfolio';
import type { LinkKind } from '../../types';
import { Icon } from '../../components/Icon';

const KINDS: LinkKind[] = ['GitHub', 'Email', 'X', 'LinkedIn', 'Web', 'その他'];

export function LinksForm() {
  const links = usePortfolio((s) => s.links);
  const addLink = usePortfolio((s) => s.addLink);
  const updateLink = usePortfolio((s) => s.updateLink);
  const removeLink = usePortfolio((s) => s.removeLink);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button type="button" className="btn btn-primary" onClick={addLink}>
          <Icon name="plus" size={12} />
          リンクを追加
        </button>
      </div>
      {links.length === 0 && (
        <div className="empty-add">
          リンクがまだありません。<br />
          <button type="button" className="btn" onClick={addLink}>
            <Icon name="plus" size={12} />
            最初のリンクを追加
          </button>
        </div>
      )}
      {links.map((l) => (
        <div key={l.id} className="item">
          <div className="item-head">
            <span className="grip"><Icon name="grip" size={14} /></span>
            <select
              value={l.kind}
              onChange={(e) => updateLink(l.id, { kind: e.target.value as LinkKind })}
              style={{ flex: 'none', width: 'auto' }}
            >
              {KINDS.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <input
              type="text"
              value={l.url}
              onChange={(e) => updateLink(l.id, { url: e.target.value })}
              placeholder={l.kind === 'Email' ? 'you@example.com' : 'https:// または mailto:'}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="icon-btn"
              onClick={() => removeLink(l.id)}
              aria-label="削除"
            >
              <Icon name="trash" size={14} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
