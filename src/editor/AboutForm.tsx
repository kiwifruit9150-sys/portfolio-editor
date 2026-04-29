import { usePortfolio } from '../store/usePortfolio';
import { Field } from '../components/Field';

export function AboutForm() {
  const about = usePortfolio((s) => s.data.about);
  const setAbout = usePortfolio((s) => s.setAbout);

  return (
    <section className="form-section">
      <h2 className="form-section-title">自己紹介</h2>
      <Field
        label="自己紹介文"
        hint="関心分野 → 経験 → 現在取り組んでいること、の順で書くと伝わりやすい"
      >
        <textarea
          rows={6}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </Field>
    </section>
  );
}
