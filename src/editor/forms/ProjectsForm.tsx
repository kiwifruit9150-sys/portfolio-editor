import { useState } from 'react';
import { usePortfolio } from '../../store/usePortfolio';
import { Icon } from '../../components/Icon';
import { Field } from './Field';

export function ProjectsForm() {
  const projects = usePortfolio((s) => s.projects);
  const addProject = usePortfolio((s) => s.addProject);
  const updateProject = usePortfolio((s) => s.updateProject);
  const removeProject = usePortfolio((s) => s.removeProject);
  const [openId, setOpenId] = useState<string | null>(
    projects[projects.length - 1]?.id ?? null,
  );

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            addProject();
            // open the freshly added one on next render
            setTimeout(() => {
              const list = usePortfolio.getState().projects;
              setOpenId(list[list.length - 1]?.id ?? null);
            }, 0);
          }}
        >
          <Icon name="plus" size={12} />
          プロジェクトを追加
        </button>
      </div>
      {projects.length === 0 && (
        <div className="empty-add">
          プロジェクトがまだありません。<br />
          <button type="button" className="btn" onClick={addProject}>
            <Icon name="plus" size={12} />
            最初のプロジェクトを追加
          </button>
        </div>
      )}
      {projects.map((p, idx) => {
        const isOpen = openId === p.id;
        const filled =
          (p.problem.trim() ? 1 : 0) +
          (p.action.trim() ? 1 : 0) +
          (p.result.trim() ? 1 : 0);
        const status =
          filled === 3 ? { cls: '', label: '完成' } :
          filled === 0 && !p.title.trim() ? { cls: 'warn', label: '未入力' } :
          { cls: 'warn', label: `${3 - filled} 項目未記入` };
        return (
          <div key={p.id} className="item" style={isOpen ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px color-mix(in srgb, var(--accent) 16%, transparent)' } : undefined}>
            <button
              type="button"
              className="item-head"
              onClick={() => setOpenId(isOpen ? null : p.id)}
              style={{
                width: '100%', background: 'transparent', border: 0, cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span className="grip"><Icon name="grip" size={14} /></span>
              <span className="num">{String(idx + 1).padStart(2, '0')}</span>
              <span className="title">{p.title || '(無題のプロジェクト)'}</span>
              <span className={`tag-chip ${status.cls}`}>{status.label}</span>
              <span style={{ color: 'var(--dim)', display: 'flex' }}>
                <Icon name="chevDown" size={14} style={{ transform: isOpen ? 'none' : 'rotate(-90deg)' }} />
              </span>
            </button>
            {isOpen && (
              <div className="item-body">
                <Field label="タイトル" required>
                  <input
                    type="text"
                    value={p.title}
                    onChange={(e) => updateProject(p.id, { title: e.target.value })}
                  />
                </Field>
                <Field label="期間" hint="例: 2025/04">
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      type="text"
                      value={p.periodStart}
                      onChange={(e) => updateProject(p.id, { periodStart: e.target.value })}
                      placeholder="開始 (YYYY/MM)"
                    />
                    <span style={{ color: 'var(--dim)' }}>—</span>
                    <input
                      type="text"
                      value={p.periodNow ? '' : p.periodEnd}
                      disabled={p.periodNow}
                      onChange={(e) => updateProject(p.id, { periodEnd: e.target.value })}
                      placeholder="終了 (YYYY/MM)"
                    />
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--sub)', whiteSpace: 'nowrap' }}>
                      <input
                        type="checkbox"
                        checked={p.periodNow}
                        onChange={(e) => updateProject(p.id, { periodNow: e.target.checked })}
                      />
                      現在
                    </label>
                  </div>
                </Field>
                <Field label="役割">
                  <input
                    type="text"
                    value={p.role}
                    onChange={(e) => updateProject(p.id, { role: e.target.value })}
                    placeholder="個人開発 / リード / インターン …"
                  />
                </Field>
                <Field label="課題" tag="STAR-1" hint="何に困っていたか？ 状況を1〜2文で。">
                  <textarea rows={2} value={p.problem} onChange={(e) => updateProject(p.id, { problem: e.target.value })} />
                </Field>
                <Field label="行動" tag="STAR-2" hint="自分は何をしたか？">
                  <textarea rows={2} value={p.action} onChange={(e) => updateProject(p.id, { action: e.target.value })} />
                </Field>
                <Field label="成果" tag="STAR-3" hint="数字や変化はあったか？ 数字があると説得力が一気に上がります。">
                  <textarea rows={2} value={p.result} onChange={(e) => updateProject(p.id, { result: e.target.value })} />
                </Field>
                <div className="field-row">
                  <Field label="使用ツール" hint="カンマ区切り">
                    <input
                      type="text"
                      value={p.tools.join(', ')}
                      onChange={(e) =>
                        updateProject(p.id, {
                          tools: e.target.value
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="React, TypeScript, Figma"
                    />
                  </Field>
                  <Field label="リンク" tag="任意">
                    <input
                      type="url"
                      value={p.link}
                      onChange={(e) => updateProject(p.id, { link: e.target.value })}
                      placeholder="https://"
                    />
                  </Field>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => removeProject(p.id)}
                  >
                    <Icon name="trash" size={13} />
                    このプロジェクトを削除
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
