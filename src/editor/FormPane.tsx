import { usePortfolio } from '../store/usePortfolio';
import type { SectionId } from '../types';
import { ProfileForm } from './forms/ProfileForm';
import { AboutForm } from './forms/AboutForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { LinksForm } from './forms/LinksForm';
import { ThemeForm } from './forms/ThemeForm';

const META: Record<SectionId, { title: string; sub: string }> = {
  profile: {
    title: 'プロフィール',
    sub: '採用担当者が30秒で「あなたが何をしてきた人か」を判断する場所です。',
  },
  about: {
    title: '自己紹介',
    sub: 'なぜそこに関心があり、何をしてきたか。短くてOK、具体的に。',
  },
  skills: {
    title: 'スキル',
    sub: 'スキル名だけでなく「どう使ったか」を1文添えると説得力が変わります。',
  },
  projects: {
    title: 'プロジェクト',
    sub: '課題 → 行動 → 成果 の順で、できれば数字で語れる経験を載せましょう。',
  },
  links: {
    title: 'SNS / 連絡先',
    sub: 'GitHub / メール / X など、採用担当が辿れる経路を最低1つ。',
  },
  theme: {
    title: 'テーマ',
    sub: '書き出される .html ファイルの見た目を選びます。後からいつでも変更可能。',
  },
};

const ORDER_INDEX: Record<SectionId, string> = {
  profile: '01',
  about: '02',
  skills: '03',
  projects: '04',
  links: '05',
  theme: '06',
};

export function FormPane() {
  const id = usePortfolio((s) => s.ui.activeSection);
  const m = META[id];
  return (
    <main className="form-pane" key={id}>
      <div className="fp-eyebrow">セクション {ORDER_INDEX[id]} / 06</div>
      <div className="fp-head">
        <h1 className="fp-h1">{m.title}</h1>
      </div>
      <p className="fp-sub">{m.sub}</p>
      {id === 'profile' && <ProfileForm />}
      {id === 'about' && <AboutForm />}
      {id === 'skills' && <SkillsForm />}
      {id === 'projects' && <ProjectsForm />}
      {id === 'links' && <LinksForm />}
      {id === 'theme' && <ThemeForm />}
    </main>
  );
}
