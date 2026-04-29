import { useRef } from 'react';

type Props = {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  label?: string;
};

const MAX_BYTES = 2 * 1024 * 1024; // 2MB

export function ImagePicker({ value, onChange, label = '画像' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_BYTES) {
      alert('画像は 2MB 以下にしてください。');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-picker">
      <div className="image-picker-row">
        {value ? (
          <img className="image-picker-preview" src={value} alt="" />
        ) : (
          <div className="image-picker-placeholder">未設定</div>
        )}
        <div className="image-picker-buttons">
          <button
            type="button"
            className="btn"
            onClick={() => inputRef.current?.click()}
          >
            {label}を選択
          </button>
          {value && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onChange(undefined)}
            >
              削除
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
    </div>
  );
}
