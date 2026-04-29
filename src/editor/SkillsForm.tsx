import { usePortfolio } from '../store/usePortfolio';
import type { SkillCategory } from '../types';

const CATEGORIES: { value: SkillCategory; label: string }[] = [
  { value: 'tech', label: '技術' },
  { value: 'business', label: 'ビジネス' },
  { value: 'tool', label: 'ツール' },
];

export function SkillsForm() {
  const skills = usePortfolio((s) => s.data.skills);
  const addSkill = usePortfolio((s) => s.addSkill);
  const updateSkill = usePortfolio((s) => s.updateSkill);
  const removeSkill = usePortfolio((s) => s.removeSkill);

  return (
    <section className="form-section">
      <div className="form-section-head">
        <h2 className="form-section-title">スキル</h2>
        <button type="button" className="btn" onClick={addSkill}>
          + 追加
        </button>
      </div>
      {skills.length === 0 && (
        <p className="empty-note">スキルがまだありません。</p>
      )}
      <div className="card-list">
        {skills.map((skill) => (
          <div key={skill.id} className="card">
            <div className="card-row">
              <select
                value={skill.category}
                onChange={(e) =>
                  updateSkill(skill.id, {
                    category: e.target.value as SkillCategory,
                  })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={skill.name}
                onChange={(e) =>
                  updateSkill(skill.id, { name: e.target.value })
                }
                placeholder="スキル名"
              />
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => removeSkill(skill.id)}
              >
                削除
              </button>
            </div>
            <textarea
              rows={2}
              value={skill.usage}
              onChange={(e) =>
                updateSkill(skill.id, { usage: e.target.value })
              }
              placeholder="どんな場面で使ったか（具体的に）"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
