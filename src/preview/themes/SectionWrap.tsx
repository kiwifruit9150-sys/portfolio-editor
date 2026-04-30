import type { ReactNode } from 'react';
import type { SectionId } from '../../types';

type Props = {
  id: SectionId;
  onJump?: (id: SectionId) => void;
  children: ReactNode;
};

/**
 * Wraps a rendered section so the live preview can hand the click back to the
 * editor (so the user can jump from the rendered output to the relevant form).
 * In export mode (no onJump), it renders children inline with no extra DOM.
 */
export function SectionWrap({ id, onJump, children }: Props) {
  if (!onJump) return <>{children}</>;
  return (
    <div
      className="pv-section-wrap"
      data-jump-section={id}
      onClick={(e) => {
        // Don't hijack interactions with real links inside the section
        if ((e.target as HTMLElement).closest('a')) return;
        onJump(id);
      }}
    >
      {children}
    </div>
  );
}
