import { usePortfolio } from '../../store/usePortfolio';
import { Field } from './Field';

export function AboutForm() {
  const about = usePortfolio((s) => s.about);
  const setAbout = usePortfolio((s) => s.setAbout);
  const len = [...about.trim()].length;

  return (
    <>
      <Field
        label="自己紹介文"
        required
        hint="関心分野 → これまでの経験 → 現在取り組んでいること、の順だと伝わりやすい (100〜400 字目安)"
      >
        <textarea
          rows={8}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="教育現場の業務改善に関心を持つ大学生です。…"
        />
      </Field>
      <div className="char-count">{len} 文字</div>
    </>
  );
}
