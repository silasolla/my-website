# サイト固定画像

## 概要

記事本文の画像は R2 にホストします．[画像ホスティング](./image-hosting.md) を参照してください．

このドキュメントはサイト UI の固定画像 (ヘッダー背景，アバター，About ギャラリー) の配置と更新手順を扱います．

## 一覧

| 画像                 | 配置                    | 公開 URL          | 備考                                                   |
| -------------------- | ----------------------- | ----------------- | ------------------------------------------------------ |
| ヘッダー背景         | `src/assets/header/`    | `/_astro/*.webp`  | `Header.astro`, `header.css`                           |
| ヘッダーの丸アイコン | `src/assets/avatar.png` | `/_astro/*.webp`  | `Header.astro`, `header.css`                           |
| プロフィール写真     | `public/avatar.png`     | `/avatar.png`     | `profile.ts`, OGP                                      |
| About ギャラリー     | `public/profile/*.webp` | `/profile/*.webp` | `AboutPage.astro`, `ImageGallery`, `image-gallery.css` |

`public/` のファイルはそのまま `dist/` へ出力されます．`src/assets/` のヘッダー背景と丸アイコンは，ビルド時に `/_astro/` へ最適化されます．

## ヘッダー背景

### 更新手順

1. `src/assets/header/header-bg-{mobile,tablet,desktop}.webp` を差し替える
2. `npm run build` で確認する
3. 変更をコミットする

### ソース画像のサイズ

`background-size: cover` のため，ヘッダーのアスペクト比に合わせた横長画像を用意します．

| 画面       | ファイル                 | 推奨サイズ       | 対象ブレークポイント |
| ---------- | ------------------------ | ---------------- | -------------------- |
| モバイル   | `header-bg-mobile.webp`  | 1200 × 600 (2:1) | 768px 以下           |
| タブレット | `header-bg-tablet.webp`  | 1920 × 480 (4:1) | 769px～1440px        |
| PC         | `header-bg-desktop.webp` | 2400 × 300 (8:1) | 1441px 以上          |

各ファイルは WebP，100〜200KB 程度を目安にします．

参考: ヘッダー高さは画面幅によりおおよそ 240px (モバイル) ～ 190px (タブレット/PC) です．

### 画像選び

- 横長の風景写真 (海，山，空など)
- 明るすぎない画像 (半透明オーバーレイで暗くなる)
- 重要な被写体は中央 (`background-position: center`)
- 3 枚は同じシーンの異なるトリミングが理想

## ヘッダーの丸アイコン

### 更新手順

1. `src/assets/avatar.png` を差し替える
2. `npm run build` で確認する
3. 変更をコミットする

## プロフィール写真

### 更新手順

1. `public/avatar.png` を差し替える
2. `npm run build` で確認する
3. 変更をコミットする

## About ギャラリー

### 更新手順

1. `public/profile/` に WebP を追加または差し替える
2. 必要に応じて `src/layouts/AboutPage.astro` の `profileImages` を更新する
3. `npm run build` で確認する
4. 変更をコミットする

横幅 1400px 以下，品質 80 前後，100〜400KB 程度を目安にします．
