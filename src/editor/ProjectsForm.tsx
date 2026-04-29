import { usePortfolio } from '../store/usePortfolio';
import { Field } from '../components/Field';
import { ImagePicker } from '../components/ImagePicker';

export function ProjectsForm() {
  const projects = usePortfolio((s) => s.data.projects);
  const addProject = usePortfolio((s) => s.addProject);
  const updateProject = usePortfolio((s) => s.updateProject);
  const removeProject = usePortfolio((s) => s.removeProject);

  return (
    <section className="form-section">
      <div className="form-section-head">
        <h2 className="form-section-title">プロジェクト</h2>
        <button type="button" className="btn" onClick={addProject}>
          + 追加
        </button>
      </div>
      {projects.length === 0 && (
        <p className="empty-note">プロジェクトがまだありません。</p>
      )}
      <div className="card-list">
        {projects.map((p, idx) => (
          <div key={p.id} className="card">
            <div className="card-row card-row-head">
              <strong>#{idx + 1}</strong>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => removeProject(p.id)}
              >
                削除
              </button>
            </div>
            <Field label="タイトル">
              <input
                type="text"
                value={p.title}
                onChange={(e) =>
                  updateProject(p.id, { title: e.target.value })
                }
              />
            </Field>
            <div className="grid-2">
              <Field label="期間">
                <input
                  type="text"
                  value={p.period}
                  onChange={(e) =>
                    updateProject(p.id, { period: e.target.value })
                  }
                  placeholder="2025/04 - 2025/09"
                />
              </Field>
              <Field label="役割">
                <input
                  type="text"
                  value={p.role}
                  onChange={(e) =>
                    updateProject(p.id, { role: e.target.value })
                  }
                  placeholder="個人開発 / リード"
                />
              </Field>
            </div>
            <Field label="課題" hint="何に困っていたか？">
              <textarea
                rows={2}
                value={p.problem}
                onChange={(e) =>
                  updateProject(p.id, { problem: e.target.value })
                }
              />
            </Field>
            <Field label="行動" hint="自分は何をしたか？">
              <textarea
                rows={2}
                value={p.action}
                onChange={(e) =>
                  updateProject(p.id, { action: e.target.value })
                }
              />
            </Field>
            <Field label="成果" hint="数字や変化はあったか？">
              <textarea
                rows={2}
                value={p.result}
                onChange={(e) =>
                  updateProject(p.id, { result: e.target.value })
                }
              />
            </Field>
            <Field label="使用ツール" hint="カンマ区切り">
              <input
                type="text"
                value={p.tools}
                onChange={(e) =>
                  updateProject(p.id, { tools: e.target.value })
                }
                placeholder="React, TypeScript, Figma"
              />
            </Field>
            <Field label="リンク (任意)">
              <input
                type="url"
                value={p.link}
                onChange={(e) =>
                  updateProject(p.id, { link: e.target.value })
                }
                placeholder="https://"
              />
            </Field>
            <Field label="画像 (任意)">
              <ImagePicker
                value={p.image}
                onChange={(v) => updateProject(p.id, { image: v })}
                label="画像"
              />
            </Field>
          </div>
        ))}
      </div>
    </section>
  );
}
