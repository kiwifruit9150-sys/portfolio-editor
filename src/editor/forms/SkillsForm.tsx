import { usePortfolio } from '../../store/usePortfolio';
import type { SkillCategory } from '../../types';
import { Icon } from '../../components/Icon';

const CATS: SkillCategory[] = ['技術', 'ビジネス', 'ツール', 'その他'];

export function SkillsForm() {
  const skills = usePortfolio((s) => s.skills);
  const addSkill = usePortfolio((s) => s.addSkill);
  const updateSkill = usePortfolio((s) => s.updateSkill);
  const removeSkill = usePortfolio((s) => s.removeSkill);
  const insertSampleSkills = usePortfolio((s) => s.insertSampleSkills);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button type="button" className="btn btn-primary" onClick={addSkill}>
          <Icon name="plus" size={12} />
          スキルを追加
        </button>
      </div>
      {skills.length === 0 && (
        <div className="empty-add">
          スキルがまだありません。<br />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
            <button type="button" className="btn" onClick={addSkill}>
              <Icon name="plus" size={12} />
              最初のスキルを追加
            </button>
            <button type="button" className="btn btn-ghost" onClick={insertSampleSkills}>
              <Icon name="sparkles" size={12} />
              サンプルを挿入
            </button>
          </div>
        </div>
      )}
      {skills.map((s, idx) => (
        <div key={s.id} className="item">
          <div className="item-head">
            <span className="grip"><Icon name="grip" size={14} /></span>
            <span className="num">{String(idx + 1).padStart(2, '0')}</span>
            <select
              value={s.cat}
              onChange={(e) => updateSkill(s.id, { cat: e.target.value as SkillCategory })}
              style={{ flex: 'none', width: 'auto' }}
            >
              {CATS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              value={s.name}
              onChange={(e) => updateSkill(s.id, { name: e.target.value })}
              placeholder="スキル名"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="icon-btn"
              onClick={() => removeSkill(s.id)}
              aria-label="削除"
            >
              <Icon name="trash" size={14} />
            </button>
          </div>
          <div className="item-body">
            <textarea
              rows={2}
              value={s.usage}
              onChange={(e) => updateSkill(s.id, { usage: e.target.value })}
              placeholder="どんな場面で・どう使ったか（具体的に）"
            />
          </div>
        </div>
      ))}
    </>
  );
}
