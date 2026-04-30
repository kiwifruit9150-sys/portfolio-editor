import type { ReactNode } from 'react';

type Props = {
  label: string;
  required?: boolean;
  tag?: string;
  hint?: ReactNode;
  children: ReactNode;
};

export function Field({ label, required, tag, hint, children }: Props) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
        {required && <span className="req">*</span>}
        {tag && <span className="tag">{tag}</span>}
      </span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}
