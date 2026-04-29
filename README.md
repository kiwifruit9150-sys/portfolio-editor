# Portfolio Editor

ブラウザ上で動く、就活・転職向けの個人ポートフォリオエディター。
左ペインで編集 → 右ペインで即時プレビュー → 単一HTMLとしてエクスポート。

## 起動

```bash
npm install
npm run dev
```

`http://localhost:5173/` を開くとエディターが立ち上がります。

## 使い方

1. 左パネルでプロフィール／自己紹介／スキル／プロジェクト／SNSを編集
2. テーマでアクセントカラーとライト/ダークを切り替え
3. 右上の「PC / スマホ」でプレビュー幅を切り替え
4. 「HTMLエクスポート」で単一の `.html` をダウンロード（GitHub Pages 等にそのまま設置可能）
5. 編集内容はブラウザの localStorage に自動保存。「リセット」で初期サンプルに戻る

## ビルド

```bash
npm run build
```

`dist/` に静的ファイルが出力されます。

## 構成

```
src/
  types.ts                  # ドメイン型
  seed.ts                   # 初期サンプルデータ
  store/usePortfolio.ts     # Zustand + localStorage 同期
  preview/
    renderHtml.ts           # PortfolioData -> HTML 文字列（プレビュー = エクスポート）
    styles.ts               # テーマ変数を含む CSS
    PreviewPane.tsx         # iframe + 端末切替
  editor/                   # 各セクションのフォーム
  components/               # Field, ImagePicker
  export/exportHtml.ts      # 単一HTMLのダウンロード
```
