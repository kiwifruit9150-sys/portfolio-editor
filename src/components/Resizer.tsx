import { useRef, useState } from 'react';

type Props = {
  className?: string;
  /** Returns the next width given the pointer's clientX. */
  toWidth: (clientX: number) => number;
  min: number;
  max: number;
  onChange: (width: number) => void;
};

export function Resizer({ className, toWidth, min, max, onChange }: Props) {
  const [dragging, setDragging] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    document.body.classList.add('is-resizing');

    const onMove = (ev: PointerEvent) => {
      const w = Math.max(min, Math.min(max, toWidth(ev.clientX)));
      onChange(w);
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
      document.body.classList.remove('is-resizing');
      setDragging(false);
      cleanupRef.current = null;
    };
    cleanupRef.current = onUp;
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
  };

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className={`resizer ${className ?? ''} ${dragging ? 'dragging' : ''}`}
      onPointerDown={onPointerDown}
    />
  );
}
