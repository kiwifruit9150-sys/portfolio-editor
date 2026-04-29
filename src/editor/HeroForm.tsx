import { usePortfolio } from '../store/usePortfolio';
import { Field } from '../components/Field';
import { ImagePicker } from '../components/ImagePicker';

export function HeroForm() {
  const hero = usePortfolio((s) => s.data.hero);
  const setHero = usePortfolio((s) => s.setHero);

  return (
    <section className="form-section">
      <h2 className="form-section-title">プロフィール</h2>
      <Field label="名前">
        <input
          type="text"
          value={hero.name}
          onChange={(e) => setHero({ name: e.target.value })}
          placeholder="山田 太郎"
        />
      </Field>
      <Field
        label="肩書き"
        hint="例: 大学生 / Webアプリ開発 / 教育DXに関心"
      >
        <input
          type="text"
          value={hero.title}
          onChange={(e) => setHero({ title: e.target.value })}
        />
      </Field>
      <Field
        label="一言キャッチ"
        hint="採用担当者が30秒で「何をしてきた人か」を理解できる1文"
      >
        <textarea
          rows={3}
          value={hero.tagline}
          onChange={(e) => setHero({ tagline: e.target.value })}
        />
      </Field>
      <Field label="アイコン画像">
        <ImagePicker
          value={hero.avatar}
          onChange={(v) => setHero({ avatar: v })}
          label="アイコン"
        />
      </Field>
    </section>
  );
}
