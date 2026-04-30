# Handoff: Portfolio Editor — Composer + Theme Picker

ポートフォリオエディター (Webアプリ) の UI / UX 全体リデザインの実装ハンドオフです。Claude Code でこのまま実装してください。

---

## 0. このバンドルについて (まず読んでください)

このフォルダに入っているファイルは **デザイン参照用の HTML プロトタイプ**です。React + Babel をブラウザでそのまま動かしているもので、**プロダクションコードではありません**。

- `Portfolio Editor Redesign.html` — Design canvas にデザイン全案を並べたファイル。 開いて全体感を確認してください。
- `artboards/*.jsx` — 各画面の React コンポーネント (mock data + UI)。スタイル値・レイアウト・コピーのソースオブトゥルース。
- 既存の実装コード (`src/` 等) があるなら、そちらを **このデザインに合わせて書き換えてください**。なければ Vite + React + TypeScript + Zustand 構成を推奨します。

実装の方針:

1. ハンドオフ HTML を読んで、レイアウト・スペーシング・コピー・色を **正確に** 取り出す
2. ターゲットコードベースの既存パターン (コンポーネントライブラリ、tokens、状態管理) で **再実装する**
3. HTML をそのままコピーするのではなく、適切に分割した React コンポーネントに作り直す

---

## 1. Fidelity

**High-fidelity (hifi)** です。色・タイポグラフィ・スペーシング・border radius は確定値として扱ってください。アクセントカラーや密度はユーザーが切り替えられるべき値ですが、それ以外のデザイントークンは固定です。

---

## 2. プロダクト概要

「就活/インターンシップ用のWebポートフォリオを、初心者でも30分で完成させて、単一HTMLとして出力できる」エディターです。

### 主要バリュー

- **型に沿って入力するだけで完成する**: 6セクションのフォームに沿って入れれば構造化されたポートフォリオになる
- **書きながら完成形が見える**: 右ペインのライブプレビューが入力に追随
- **HTMLとして書き出して、自分のサイト/Vercel/Netlify などにそのままアップできる**: 1ファイルで完結
- **見た目を4つから選べる**: 中身を再入力しなくてもテーマを変えられる

### ユーザー像

大学生〜若手社会人。デザイン・コーディングの専門家ではない。Notion は使えるが Figma や VSCode は使い慣れていない、くらいの想定。

---

## 3. 採用デザインの全体像

エディター画面は **Composer** デザインで確定。ポートフォリオの出力テーマは **4つの選択肢**から選べる仕様。

```
┌──────────────────────────────────────────────────────────────┐
│  Header (52px)                                                │
├──────────┬──────────────────────────┬─────────────────────────┤
│          │                          │                         │
│  Left    │  Middle                  │  Right                  │
│  260px   │  (flex, スクロール)       │  480px                  │
│          │                          │                         │
│  セクション│  選択中セクションのフォーム │  ライブプレビュー        │
│  ナビ     │                          │  (現在のテーマで描画)     │
│  進捗バー  │                          │                         │
│          │                          │                         │
└──────────┴──────────────────────────┴─────────────────────────┘
```

3ペイン構成。デスクトップ専用 (≥1280px)。モバイルでは「現在の入力ステップだけ表示 + プレビューはタブで切替」にダウングレード (Phase 2)。

---

## 4. デザイントークン

### 4.1 カラー (Composer エディタ chrome)

| トークン | 値 | 用途 |
|---|---|---|
| `--bg` | `#fafaf9` | キャンバス背景 |
| `--panel` | `#ffffff` | パネル / カード |
| `--hairline` | `#ececea` | 主境界線 |
| `--hairline-soft` | `#f3f3f1` | 弱境界線 / バー背景 |
| `--fg` | `#1a1a1a` | テキスト primary |
| `--sub` | `#6b6b6b` | テキスト secondary |
| `--dim` | `#a0a0a0` | テキスト tertiary / プレースホルダ |
| `--accent` | `#ea6e3a` | アクセント (デフォルト, 変更可) |
| `--accent-soft` | `#fef0e9` | アクセント淡 (選択中ピル背景) |
| `--ok` | `#16a34a` | 完了状態 / 自動保存OK |

ユーザーが選べるアクセントカラー:
```
['#ea6e3a', '#1a1a1a', '#0ea5e9', '#16a34a', '#7c5cff', '#db2777']
```
デフォルトは `#ea6e3a`。ユーザー選択値は localStorage に保存し、テーマ側 (出力ポートフォリオ) のアクセントカラーにも反映します。

### 4.2 タイポグラフィ

```
--font-sans: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif;
--font-serif: "Noto Serif JP", Georgia, serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;
```

Google Fonts:
```
https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Noto+Serif+JP:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap
```

エディタ chrome は `--font-sans`。`--font-serif` と `--font-mono` は **テーマ "Editorial" / "Mono" のプレビュー** で使うのでロードしておく。

サイズスケール (エディタ内):

| 用途 | size | weight | line-height | letter-spacing |
|---|---|---|---|---|
| H1 (セクションタイトル) | 22px | 700 | 1.3 | -0.01em |
| H2 (フィールドラベル) | 12px | 500 | 1.4 | 0 |
| Body | 13px | 400 | 1.6 | 0 |
| Small | 12px | 400 | 1.6 | 0 |
| Tiny / metadata | 11px | 400 | 1.5 | 0 |
| Eyebrow (大文字英字) | 11px | 500 | 1.0 | 0.08em |
| Mono caption | 10–11px | 400 | 1.0 | 0 |

### 4.3 スペーシング・形状

- 半径: 6 / 7 / 8 / 10 / 12 / 14 / 16 (大カード)
- ヘッダ高: 52px / プレビューバー: 40px
- 左ナビ幅: 260px / 右プレビュー幅: 480px
- 中央フォームの padding: `24px 32px`
- 影: ほぼ使わない。プレビューカードのみ `0 8px 24px rgba(0,0,0,0.06)`

---

## 5. 画面構成

### 5.1 Header (高さ 52px, 全幅)

横並び (flex space-between, padding `0 20px`, 背景 `--panel`, 下境界 `--hairline`):

**左側 (gap 12px)**
- ロゴマーク: `24x24` 角丸 `7px`, 背景 `--fg`, 文字色 `--bg`, "P", `12px / 700 / mono`
- プロダクト名: "Portfolio Editor" `14px / 600 / sans`
- 区切り線: `1x18px / --hairline`
- 自動保存インジケータ:
  - 緑ドット `6x6 円 / --ok`
  - テキスト "自動保存済み · 2秒前" `12px / 400 / --sub`
  - 状態: `idle` / `saving` ("保存中…", オレンジドット) / `saved` / `error` (赤ドット)

**右側 (gap 16px)**
- プログレスリング:
  - SVG 28x28, 12px 半径, stroke 2.5px
  - 背景円: `--hairline`
  - 進捗円: `--accent`, `strokeDasharray=2πr`, `strokeDashoffset=2πr*(1-pct/100)`
  - 角度: `transform: rotate(-90deg)`
  - 横に "<n>% 完成" `--fg / 600 / mono` + " 完成" `--sub / 12px`
- エクスポートボタン:
  - 背景 `--fg` / 文字 `--panel` / 角丸 7px / padding `7px 14px` / `12px / 600`
  - 左にダウンロードアイコン 13px
  - クリック → エクスポートモーダル (5.6 参照)

### 5.2 左ナビ (260px)

`padding: 14px 12px / 背景 --panel / 右境界 --hairline`

セクションラベル "セクション" `10px / dim / letter-spacing 0.1em / uppercase`, padding `4px 10px 8px`

各セクション項目 (固定6個):

```
[grip] [icon]  ラベル          [progress 22x4]
              <件数 / 状態>
```

- 行: `display: flex / align-center / gap 10px / padding 8px 10px / radius 7px`
- 選択中: 背景 `--accent-soft` / ラベル色 `--accent`
- gripアイコン (12x18px, 6個ドット): `--dim / opacity 0.6`、ホバーでカーソル `grab`、ドラッグで並び替え可能 (theme は固定で並び替え不可、最後に固定)
- セクションアイコン: `14px / --sub` (選択中は `--accent`)
- ラベル: `13px / 500` (選択中 600), 件数行: `10.5px / --dim / margin-top 1px`
- 進捗バー: 22x4 角丸 2px, 背景 `--hairline-soft`, 内側 fill `100%なら --ok / 100%未満なら --accent`

セクション一覧 (順序固定の theme 以外は並び替え可能):

| ID | アイコン | ラベル | カウント表記 | 完成判定 |
|---|---|---|---|---|
| profile | user | プロフィール | "X / 4" (4フィールド埋まり数) | name+title+tagline 必須 |
| about | text | 自己紹介 | "X 文字" | 100文字以上で 100% |
| skills | sparkles | スキル | "X 件" | 1件以上で 60%, 3件以上で 100% |
| projects | box | プロジェクト | "X 件" | 1件以上で 60%, 2件以上で 100% |
| links | link | SNS / 連絡先 | "X 件" | 1件以上で 60%, 2件以上で 100% |
| theme | palette | テーマ | テーマ名 | 常に 100% |

ヘッダの `overall %` はセクション完成率の **重み付け平均** (profile×1.5, projects×1.5, others×1)。

### 5.3 中央: フォームエリア

- `overflow-y: auto / padding 24px 32px / 背景 --bg`
- 一番上: eyebrow `セクション 0X / 06`, タイトル H1, 補助説明 (12–13px / --sub)
- フィールド ラベル `12px / 500`, 補助 `11px / --sub`, 入力欄 `8–10px padding / radius 8px / 1px hairline / 13px text`
- フォーカス時: ボーダー `--accent` + `box-shadow: 0 0 0 3px <accent>1f`
- 必須マーク: ラベル末尾に小さい `*` (`--accent`)
- フィールド間 gap: 16–20px
- フィールド先のヘルプ吹き出し: `?` アイコン (12px) クリック → ポップオーバー (`280px / 11.5px / line-height 1.7`)

#### 5.3.1 セクション "プロフィール"
- `name` (テキスト, 必須) — placeholder "山田 太郎"
- `title` (テキスト, 必須) — placeholder "大学生 / Webアプリ開発 / 教育DXに関心"
- `tagline` (textarea, 2行, 推奨) — placeholder "教育現場の非効率を、…"
- `avatar` (画像 or イニシャル) — ファイル選択 or 自動 (姓名から2文字)

#### 5.3.2 セクション "自己紹介"
- `about` (textarea, リッチではなくプレーン, 推奨 100–400字) — 文字数カウンタ右下
- 「AIで下書きを作る」ボタン (任意) — モーダルで5問質問 → `window.claude.complete` で生成

#### 5.3.3 セクション "スキル"
- 行リスト (アコーディオン, 各行 grip ハンドルで並び替え可)
- 各行: `cat` (select: 技術 / ビジネス / ツール / その他), `name` (テキスト), `usage` (textarea, 2行)
- "+ スキルを追加" ボタンで末尾追加, ゴミ箱で削除
- 0件のときは大きい空状態カード "+ スキルを追加" + 例3件をワンクリック挿入

#### 5.3.4 セクション "プロジェクト"
- 同じく行リスト + アコーディオン
- 各行: title / period (開始 + 終了 or "現在") / role / problem / action / result / tools (チップ入力)
- "課題 → 行動 → 成果" のラベルは固定 (PAR フレームの教育的役割を持つ)
- 折りたたみ時: タイトル + 期間 + 完成度バー (3要素中いくつ書けたか)

#### 5.3.5 セクション "SNS / 連絡先"
- 行: `kind` (select: GitHub / Email / X / LinkedIn / Web / その他), `url` (テキスト)
- URL 簡易バリデーション (空 / 明らかにURLでない場合に警告)

#### 5.3.6 セクション "テーマ" — **このリデザインの目玉**

詳細は §6 で。

### 5.4 右ペイン: ライブプレビュー (480px)

- 上部バー (40px): 左に `OK ドット + "ライブプレビュー · <現在テーマ名>"`, 右にデバイス切替 (monitor / smartphone) アイコンセグメント
- 中身: 内側 `padding: 16px`, テーマに応じて背景色を変える
  - Editorial → `#f0eee9`
  - Mono → `#0a0a0c`
  - Card → `#f7f7f5`
  - Minimal → `#fff`
- プレビュー本体は `iframe` ではなく **同一 React ツリー内のコンポーネント**で描画 (テーマ切替を即座に反映するため)
- スケール: プレビューは「実寸 760px 幅のレイアウト」を `transform: scale(0.6)` 相当で 480px パネルに収める。ズームスライダーで 0.4–1.0 を選べると親切。
- スクロール: プレビューは内部スクロール (上→下に全文)
- クリック → そのフィールドにフォーム側がジャンプ + ハイライト (3秒)。実装: 各プレビュー要素に `data-field-id` を持たせ、クリックで親に通知 → 中央フォームを `scrollIntoView` (※ 注: 親ウィンドウの scrollIntoView は使わない、フォームペインのみで scrollTo を使う)

### 5.5 (フォームエリア内) テーマセクション

§6 で詳述。

### 5.6 エクスポートモーダル

- ヘッダの「エクスポート」クリックで開く
- 幅 480px / center-modal / overlay `rgba(0,0,0,0.4)`
- 内容:
  1. プレビューサムネイル (現在テーマ, 64px 幅)
  2. ファイル名入力 (デフォルト `portfolio.html`)
  3. オプション: ☑ アバター画像を埋め込む / ☑ Google Fonts を CDN リンクで埋め込む (オフ→システムフォント)
  4. プライマリボタン "ダウンロード"
- ダウンロード処理: 単一 HTML を `Blob` 化して `<a download>` でクリック

---

## 6. テーマセクション (詳細仕様)

中央フォーム内 "テーマ" を選んだときに表示される画面。ユーザーがポートフォリオ出力の見た目を選ぶための画面。

### 6.1 上部 (固定)

- eyebrow "セクション 06 / 06"
- H1 "テーマ"
- 右に補助テキスト "👁 選んだ瞬間にプレビューに反映されます" (12px / --sub, eyeアイコン12px)
- 説明文: "書き出される .html ファイルの見た目を選びます。後からいつでも切り替え可能。" (13px / --sub / line-height 1.6)
- margin-bottom 24px

### 6.2 ポートフォリオのスタイル (4択カード)

ラベル行: `ポートフォリオのスタイル` `12px / 500` + ` 4 種類` `11px / --dim` (左揃え, gap 8px)

カードグリッド: `grid-template-columns: repeat(2, 1fr) / gap 12px`

各カード:
- 背景 `--panel`
- 通常: border `1px / --hairline`
- 選択中: border `1px / --accent` + `box-shadow: 0 0 0 3px <accent>1f`
- radius 12px / overflow hidden / cursor pointer
- ホバー時: border `--fg` (淡)

カードの中身 2分割:

**(上) サムネイル領域 (高さ 168px, 下境界 --hairline-soft, 背景 #fafaf9)**
- 各テーマの**実DOMで**ミニチュア描画 (画像ではない)。サムネイル用の専用コンポーネント `<ThumbEditorial/>` `<ThumbMono/>` `<ThumbCard/>` `<ThumbMinimal/>` を作る (artboards/v2-composer-theme.jsx 参照)。
- 左上 (Editorial のみ): "おすすめ" バッジ — `--fg / panel / 10px / 2px 8px / radius 999 / star icon 9px`
- 右上 (選択中のみ): 22x22 円 / `--accent` / 白チェックアイコン 13px

**(下) メタ領域 (padding 12px 14px)**
- 1行目: テーマ名 `14px / 600 / --fg` + 横並びでタグ `11px / --dim`
- 2行目: 説明 `12px / --sub / line-height 1.6`

| ID | 名前 | タグ | 説明 | 推奨 |
|---|---|---|---|---|
| editorial | Editorial | 紙・セリフ | 読み物として読ませたい人向け。明朝×等幅。 | ★ |
| mono | Mono | ダーク・コード | エンジニア寄り。ターミナル風の硬質さ。 | |
| card | Card | カード・整列 | スキル/作品の点数が多い人に。Notion風。 | |
| minimal | Minimal | 白・余白多め | 一発で「品がいい」と思わせる定番。 | |

### 6.3 アクセントカラー

- ラベル `アクセントカラー` 12px/500
- 補助文: `見出しやリンクに使われる色。テーマに合わせて自動で調整されます。` 11px/--sub
- 行: gap 12px, align center
  1. 大きいスウォッチ 40x40 / radius 8px / border --hairline / 現在色
  2. HEX 表示ピル: `--panel / border --hairline / radius 8px / padding 8px 12px / mono 13px / min-width 120px`
  3. プリセット6色 (24x24 円 / 選択中は2px --fg ボーダー + 4px の glow `<color>33`)
- カラーピッカーへの入り口: スウォッチクリックでネイティブ `<input type=color>` を開く

### 6.4 モード (light/dark/auto)

- セグメント: `border --hairline / radius 8px / overflow hidden / display inline-flex`
- 各オプション: `padding 8px 14px / 12px / cursor pointer / icon 12px + ラベル / 区切りに右borderあり`
- アクティブ: 背景 `--fg` / 文字 `--panel`

| ID | アイコン | ラベル |
|---|---|---|
| auto | monitor | 自動 |
| light | sun | ライト |
| dark | moon | ダーク |

`auto` は `prefers-color-scheme` を読む。出力 HTML 側にも同じロジックを埋め込む。

### 6.5 余白の広さ (スライダー)

- ラベル `余白の広さ` + 左に `密` `右に` `ゆとり` (11px / --dim)
- トラック: 高さ 4px / 背景 --hairline / radius 2px
- 進捗fill: 高さ 100% / 背景 --accent / radius 2px
- ハンドル: 16x16 円 / 白 / 2px --accent ボーダー / `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`
- 値: 0.0–1.0 (連続), デフォルト 0.6
- テーマごとの基準スペーシングに `0.7 + 0.6 * value` を掛けて適用 (= 0.7倍〜1.3倍)

### 6.6 即時反映

- 6.2〜6.5 の操作はすべて、右ペインのライブプレビューに **即座に反映**
- 状態は `themeConfig` というオブジェクトに集約 (§ 8 参照)

---

## 7. 4テーマ (出力ポートフォリオの仕様)

各テーマは「760px幅のレイアウト」を基準。出力 HTML 自体は **レスポンシブ** にする (640px 以下でモバイル化)。

実装は `applyTheme(themeId, themeConfig, data) → string` という純関数で、与えられたテーマ ID と現在のフォーム状態から HTML 全体を生成する。

詳細スタイルは `artboards/portfolio-output.jsx` (Editorial / Mono) と `artboards/portfolio-output-2.jsx` (Card / Minimal) を読んで取り出してください。要点だけ:

### 7.1 Editorial (おすすめ)

- フォント: 見出し `--font-serif` / 本文 `--font-sans` / メタ `--font-mono`
- 背景 `#fbf9f4` / テキスト `#1c1a17` / メタ `#6b6256` / アクセント `#b8472a` (←ユーザーが選んだアクセントを上書き) / 罫線 `#e5dfd2`
- 各セクションのラベルは `番号 (mono) + Englishタイトル + 横線`
- ヒーローのタグラインは「左ボーダー2pxアクセント + イタリック」で印象づけ
- スキルは `カテゴリ (italic / accent) | 名前 (serif / 500) + usage (sans / sub)` の grid 70px/1fr
- プロジェクトは「年号(右mono)・タイトル(serif/500)・課題/行動/成果のラベル付き grid」

### 7.2 Mono

- フォント: 全部 `--font-sans` + 強調 `--font-mono`
- 背景 `#0a0a0c` / panel `#111114` / 境界 `#1f1f24` / fg `#e6e6e9` / sub `#8a8b94` / アクセント `#7c5cff` (またはユーザー値)
- ヒーロー名は `gradient text` (light → accent)
- セクションヘッダは `番号 (mono / 5a5b64) + ENGLISH (700 / 0.18em / accent)`
- プロジェクトカードは「左境界4pxのグラデーション (accent → cyan)」
- ツールチップは `monoの<タグ>` のスタイル

### 7.3 Card

- フォント: 全部 `--font-sans`
- 背景 `#f7f7f5` / panel `#fff` / fg `#1a1a1a` / sub `#6b6b6b` / 境界 `#ececea`
- ヘッダはアバター + 名前 + ロール + tagline をひとつのカードにまとめる (radius 16px)
- スキル: 2列グリッド・各カード `border 1px / radius 12px / padding 16px`
- プロジェクト: カード (radius 14px / padding 20px), 中の「課題 / 行動 / 成果」は 50px+1fr の grid
- 連絡先: チップ風カード横並び

### 7.4 Minimal

- フォント: 全部 `--font-sans` (見出しは weight 700, letter-spacing -0.025em)
- 背景 `#fff` / fg `#1a1a1a` / sub `#6b6b6b` / 境界 `#ececea`
- 大ヒーロー: 名前 44px / 700, 下に 32x2 の `--fg` ライン
- セクションラベル: `11px / 600 / 0.22em` の英字
- プロジェクト: `border-top 1px` で区切るリスト, タイトル 22px / 700, "→ 成果" の1行で締める

---

## 8. データモデル

```ts
type Profile = {
  name: string;
  title: string;
  tagline: string;
  avatar?: { kind: 'image'; src: string } | { kind: 'initials' };
};

type Skill = {
  id: string;
  cat: '技術' | 'ビジネス' | 'ツール' | 'その他';
  name: string;
  usage: string;
};

type Project = {
  id: string;
  title: string;
  period: { start: string; end: string | 'now' }; // "2025/04" 形式
  role: string;
  problem: string;
  action: string;
  result: string;
  tools: string[];
};

type Link = {
  id: string;
  kind: 'GitHub' | 'Email' | 'X' | 'LinkedIn' | 'Web' | 'その他';
  url: string;
};

type ThemeConfig = {
  id: 'editorial' | 'mono' | 'card' | 'minimal';
  accent: string;       // hex
  mode: 'auto' | 'light' | 'dark';
  density: number;      // 0–1, default 0.6
};

type AppState = {
  profile: Profile;
  about: string;
  skills: Skill[];
  projects: Project[];
  links: Link[];
  theme: ThemeConfig;
  ui: {
    activeSection: 'profile' | 'about' | 'skills' | 'projects' | 'links' | 'theme';
    sectionOrder: string[]; // 並び替え結果, ただし theme は末尾固定
    previewDevice: 'desktop' | 'mobile';
    autoSaveStatus: 'idle' | 'saving' | 'saved' | 'error';
    lastSavedAt: number; // epoch ms
  };
};
```

### 8.1 永続化

- localStorage キー `portfolio-editor:v1`
- 全 `AppState` を JSON で保存 (画像は dataURL 化)
- フィールド変更 → 800ms デバウンス → 保存 → `autoSaveStatus` 遷移
- 起動時に読み込み (なければシードデータ; `artboards/mock.jsx` の `MOCK` を参考)

### 8.2 状態管理推奨

Zustand。ストアを `useEditor` で公開、selectors でコンポーネントが必要な部分だけ subscribe。

---

## 9. 主要インタラクション

| トリガー | 結果 |
|---|---|
| 左ナビのセクションクリック | 中央フォームをそのセクションに切替 (即時) |
| 左ナビの行を grip でドラッグ | 並び替え (theme は固定); 並び順は保存され、HTML 出力にも反映 |
| プレビュー要素クリック | 対応するフィールドにフォームをスクロール + 3秒ハイライト |
| アクセントカラー変更 | 即時にエディタ chrome (アクセント箇所) と プレビューに反映 |
| テーマカード選択 | プレビューが滑らかに置換 (CSS transition `opacity 200ms`) |
| エクスポート | 現在の `applyTheme()` 出力を Blob 化 → ダウンロード |
| ⌘/Ctrl + S | 即時保存 + "保存しました" トースト (上中央, 1.5秒) |
| ⌘/Ctrl + K | コマンドパレット開く (Phase 2 / 任意) |

### 9.1 アニメーション

- セクション切替: `opacity 0 → 1` を `120ms ease-out`
- カード選択: ボーダー色変更 `border 150ms ease-out`
- プログレスバー: `width transition 250ms ease-out`
- トースト: 下から上に `transform translateY(8px → 0) + opacity` 200ms

派手なアニメーションは入れないこと。プロダクトのトーンが「静かで集中できる」ものなので。

### 9.2 バリデーション

- 必須フィールドが空のままエクスポートしようとすると、モーダルが「いくつかの必須項目が空です」と警告 + 該当セクションへジャンプボタン
- URL フィールドは "緩い" バリデーション (空 OK / 入っていれば `^(https?:\/\/|mailto:|[\w-]+\.[\w-]+)` 程度)

### 9.3 空状態

- スキル / プロジェクト / リンクが0件のとき、フォームの上部に大きい空状態カード (背景 `--panel` / 点線ボーダー / padding 32px / 中央揃え)
  - 説明文 + "サンプルを挿入" ボタン (シードデータの該当セクションをワンクリック挿入)
  - "+ 新規追加" ボタン

---

## 10. アクセシビリティ

- フォームの全フィールドに `<label htmlFor>`
- 左ナビはランドマーク `<nav>` + `aria-current="page"` (選択中)
- カラーコントラスト: アクセント `#ea6e3a` on `#fff` は AA に達するので OK だが、アクセントを白文字背景に使う場合は `--fg` を文字色にする (アクセントは下線・アイコン・ボーダーが主用途)
- キーボード:
  - Tab で全インタラクティブ要素にフォーカス可
  - 左ナビは ↑↓ で移動 (roving tabindex)
  - フィールドのフォーカスリングは `box-shadow 0 0 0 3px <accent>1f` で目立たせる
- 動きを減らす: `prefers-reduced-motion` を尊重 (アニメーション全部無効化)

---

## 11. テスト観点

1. 6セクション全部に1件以上入れて 100% 完成にできる
2. テーマを4つ全部に切り替えてもプレビューが破綻しない (空フィールドがある状態でも)
3. localStorage に保存 → リロード → 全状態が復元
4. エクスポート → 出力 HTML をブラウザで開く → デザインが完全再現される
5. Chrome / Safari / Firefox の最新版で動作
6. ズーム 200% / フォントサイズ大 でも layout が壊れない

---

## 12. 推奨スタック (新規構築する場合)

- Vite + React 18 + TypeScript
- Zustand (状態) / Immer (パッチ更新)
- React DnD or `@dnd-kit/core` (並び替え)
- HTML 出力は文字列ビルダー (テンプレートリテラル) で可。テンプレートエンジン不要。
- フォーマッタ: Prettier / Linter: ESLint (typescript-eslint)
- テスト: Vitest + Playwright (任意)

ディレクトリ案:

```
src/
  app/                  // ルート
  features/
    editor/             // エディター chrome (header / left nav)
    forms/              // 各セクションのフォーム
      ProfileForm.tsx
      AboutForm.tsx
      SkillsForm.tsx
      ProjectsForm.tsx
      LinksForm.tsx
      ThemeForm.tsx     // ★ §6 がここ
    preview/            // ライブプレビュー枠
      PreviewPane.tsx
    themes/             // 4テーマの React 描画
      Editorial.tsx
      Mono.tsx
      Card.tsx
      Minimal.tsx
      ThumbEditorial.tsx  // §6.2 サムネイル
      ThumbMono.tsx
      ThumbCard.tsx
      ThumbMinimal.tsx
      applyTheme.ts     // テーマ ID → HTML 文字列
    export/             // エクスポートモーダル + 単一 HTML ビルダー
  store/                // Zustand
  ui/                   // 汎用 (Button / Input / Slider / Segment / Modal)
  tokens.css            // §4 のカラー / フォント変数
  seed.ts               // 初期サンプルデータ (artboards/mock.jsx の MOCK と同じ)
```

---

## 13. ファイル一覧 (このフォルダ内)

| パス | 内容 |
|---|---|
| `README.md` | このファイル |
| `Portfolio Editor Redesign.html` | デザイン全体カンバス。ブラウザで開けば全画面を一覧できる。 |
| `design-canvas.jsx` | カンバスフレームワーク (実装には不要、デザイン閲覧用) |
| `artboards/mock.jsx` | シードデータ + アイコン / アバター原子 |
| `artboards/v2-composer.jsx` | Composer (採用するエディタ chrome) |
| `artboards/v2-composer-theme.jsx` | **テーマセクションの完全実装** (§6) |
| `artboards/portfolio-output.jsx` | Editorial / Mono テーマ |
| `artboards/portfolio-output-2.jsx` | Card / Minimal テーマ |
| `artboards/v1-quiet-studio.jsx` | (不採用案. 参考まで) |
| `artboards/v3-atelier.jsx` | (不採用案. 参考まで) |

---

## 14. 実装の優先順位

1. **Phase 1 (MVP)**: Composer chrome + 6セクションのフォーム + Editorial テーマだけ + localStorage + HTML 出力
2. **Phase 2**: 残り3テーマ + テーマピッカー + アクセントカラー + モード + 余白
3. **Phase 3**: 並び替え (左ナビとフォーム内行) + プレビュー → フォームジャンプ + 空状態のサンプル挿入
4. **Phase 4**: AI 下書き (`window.claude.complete`) + コマンドパレット + モバイルレイアウト

各フェーズ単位で動くものをデプロイできる構成にしてください。

---

## 15. 質問・あいまいな点

実装中に気になったら、以下のスタンスで判断:

- **コピー (文言)** に迷ったら、`artboards/*` のテキストを正とする
- **配色 / サイズ** に迷ったら、§4 のトークンを正とする (artboards 内のハードコード値より優先)
- **新規 UX 判断** (例: ファイルアップロードのドラッグエリアの形) は、既存の Composer のトーンに揃える: 静か / シャープな角は禁止 / アクセント控えめ

---

以上です。`Portfolio Editor Redesign.html` をブラウザで開きつつこの README を読むと、全体像が掴めます。実装中に詰まったら artboards/v2-composer-theme.jsx を眺めるのが一番速いです。
