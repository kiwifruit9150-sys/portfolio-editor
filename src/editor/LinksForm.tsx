import { usePortfolio } from '../store/usePortfolio';
import type { LinkKind } from '../types';

const KINDS: { value: LinkKind; label: string }[] = [
  { value: 'github', label: 'GitHub' },
  { value: 'x', label: 'X' },
  { value: 'note', label: 'note' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'email', label: 'Email' },
  { value: 'other', label: 'その他' },
];

export function LinksForm() {
  const links = usePortfolio((s) => s.data.links);
  const addLink = usePortfolio((s) => s.addLink);
  const updateLink = usePortfolio((s) => s.updateLink);
  const removeLink = usePortfolio((s) => s.removeLink);

  return (
    <section className="form-section">
      <div className="form-section-head">
        <h2 className="form-section-title">SNS / 連絡先</h2>
        <button type="button" className="btn" onClick={addLink}>
          + 追加
        </button>
      </div>
      {links.length === 0 && (
        <p className="empty-note">リンクがまだありません。</p>
      )}
      <div className="card-list">
        {links.map((l) => (
          <div key={l.id} className="card">
            <div className="card-row">
              <select
                value={l.kind}
                onChange={(e) =>
                  updateLink(l.id, { kind: e.target.value as LinkKind })
                }
              >
                {KINDS.map((k) => (
                  <option key={k.value} value={k.value}>
                    {k.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={l.label}
                onChange={(e) => updateLink(l.id, { label: e.target.value })}
                placeholder="表示名"
              />
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => removeLink(l.id)}
              >
                削除
              </button>
            </div>
            <input
              type="url"
              value={l.url}
              onChange={(e) => updateLink(l.id, { url: e.target.value })}
              placeholder="https:// または mailto:"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
