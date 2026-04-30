import { useRef } from 'react';
import { usePortfolio } from '../../store/usePortfolio';
import { Icon } from '../../components/Icon';
import { Field } from './Field';

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export function ProfileForm() {
  const profile = usePortfolio((s) => s.profile);
  const setProfile = usePortfolio((s) => s.setProfile);
  const fileRef = useRef<HTMLInputElement>(null);

  const initials = (profile.name.trim() || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  const onPickFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_AVATAR_BYTES) {
      window.alert('画像は 2MB 以下にしてください。');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setProfile({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Field label="名前" required>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ name: e.target.value })}
          placeholder="山田 太郎"
        />
      </Field>
      <Field label="肩書き" required hint="採用担当者が30秒で「何をしてきた人か」を理解できる1文">
        <input
          type="text"
          value={profile.title}
          onChange={(e) => setProfile({ title: e.target.value })}
          placeholder="大学生 / Webアプリ開発 / 教育DXに関心"
        />
      </Field>
      <Field label="一言キャッチ" required>
        <textarea
          rows={2}
          value={profile.tagline}
          onChange={(e) => setProfile({ tagline: e.target.value })}
        />
      </Field>
      <Field label="アイコン画像" tag="任意">
        <div className="avatar-picker">
          <div className="avatar-preview">
            {profile.avatar ? <img src={profile.avatar} alt="" /> : <span>{initials}</span>}
          </div>
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
            <Icon name="user" size={13} />
            画像を選択
          </button>
          {profile.avatar && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setProfile({ avatar: undefined })}
            >
              削除
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              onPickFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </div>
      </Field>
    </>
  );
}
