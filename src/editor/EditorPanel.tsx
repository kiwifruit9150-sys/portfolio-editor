import { HeroForm } from './HeroForm';
import { AboutForm } from './AboutForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { LinksForm } from './LinksForm';
import { ThemeForm } from './ThemeForm';

export function EditorPanel() {
  return (
    <div className="editor-panel">
      <HeroForm />
      <AboutForm />
      <SkillsForm />
      <ProjectsForm />
      <LinksForm />
      <ThemeForm />
    </div>
  );
}
