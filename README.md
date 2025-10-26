# silasolla - 個人サイト

> Trust, but verify.

## 概要

このリポジトリは，Masaki Haga (@silasolla) の個人サイトのソースコードです．
Markdown によって記事を管理します．

## 技術スタック

- **Astro**: 静的サイトジェネレータ (極力 JS を減らす)
- **TypeScript**: 型安全な開発
- **GitHub Actions**: CI/CD
- **GitHub Pages**: サイトのホスティング
- **Cloudflare R2**: 画像のホスティング

## プロジェクト構成

```
/
├── public/                  # 静的アセット
│   ├── avatar.png           # プロフィール画像
│   ├── profile/             # ギャラリー画像
│   ├── header-bg-*.jpg      # ヘッダー背景画像 (レスポンシブ)
│   ├── favicon*.png         # ファビコン各種
│   ├── icons/               # アイコン (Bluesky, Twitter, リンクなど)
│   └── posts/images/        # 記事の画像 (gitignore, R2にホスト)
├── src/
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── Header.astro
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── LanguageSwitch.astro
│   │   ├── ImageGallery.astro
│   │   ├── ExperienceSection.astro
│   │   ├── EducationSection.astro
│   │   ├── PublicationSection.astro
│   │   ├── CertificationSection.astro
│   │   ├── HobbySection.astro
│   │   └── MiscSection.astro
│   ├── content/             # コンテンツコレクション
│   │   ├── config.ts        # コンテンツ設定
│   │   └── posts/           # 記事 (Markdown/MDX)
│   ├── data/                # 構造化データ
│   │   └── about.ts         # About ページのデータ
│   ├── grammars/            # シンタックスハイライト定義
│   │   └── sml.tmLanguage.json
│   ├── i18n/                # 国際化
│   │   └── translations.ts  # UI テキスト翻訳
│   ├── layouts/
│   │   └── Layout.astro     # 共通レイアウト
│   ├── pages/               # ページルート
│   │   ├── index.astro      # ホームページ (日本語)
│   │   ├── about.astro      # 私について (日本語)
│   │   ├── links.astro      # リンク集 (日本語)
│   │   ├── posts/
│   │   │   ├── [slug].astro # 個別記事
│   │   │   └── index.astro  # 記事一覧
│   │   ├── rss/             # カテゴリ別 RSS
│   │   │   ├── diary.xml.ts
│   │   │   ├── news.xml.ts
│   │   │   └── tech.xml.ts
│   │   ├── rss.xml.ts       # 全体 RSS
│   │   └── en/              # 英語版ページ
│   │       ├── index.astro
│   │       ├── about.astro
│   │       ├── links.astro
│   │       └── posts/
│   ├── plugins/             # カスタムプラグイン
│   │   └── remark-image-url.mjs
│   └── utils/               # ユーティリティ
├── docs/                    # ドキュメント
│   ├── about-data.md        # About データ管理ガイド
│   ├── header-backgrounds.md
│   ├── image-hosting.md
│   └── workflow.md          # 記事作成ワークフロー
├── scripts/                 # スクリプト
│   ├── new-post.sh          # 新規記事作成
│   └── upload-images.sh     # 画像アップロード
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions デプロイ設定
└── Makefile                 # タスク管理
```

## 開発

### 必要な環境

- Node.js 20.x 以上
- npm

### セットアップ

```bash
# 依存パッケージのインストール
npm install

# 環境変数の設定
cp .env.example .env
# .envファイルを編集して，必要な値を設定
```

#### 環境変数

- `SITE_URL`: サイトの URL (デフォルト: https://example.com)
  - Astro の `site` 設定に使用されます
  - GitHub Actions でのデプロイ時に，この URL からドメイン名を抽出して `CNAME` ファイルを生成します
- `IMAGE_BASE_URL`: 画像ホスティングのベース URL (デフォルト: ローカル)
  - 開発環境:
    - **未設定の場合**: ローカル画像 (/posts/images) を使用
    - **設定した場合**: R2 を参照し，404 の場合は自動的にローカルにフォールバック
  - 本番環境: `https://image.example.com` (Cloudflare R2から読み込み，フォールバックなし)
- `R2_BUCKET_NAME`: R2 のバケット名 (画像アップロード用)
- `NGROK_HOST`: 開発時の ngrok ホスト (オプショナル)

### 記事の作成と公開

詳細なワークフローは [`docs/workflow.md`](./docs/workflow.md) を参照してください．

簡単な流れ：

```bash
# 1. 記事を作成
make new SLUG=my-post-title

# 2. 記事を書く + 画像を配置

# 3. ローカルで確認
npm run dev

# 4. 画像をR2にアップロード (SLUG必須)
make upload-images SLUG=YYYY-MM-DD-NN_my-post-title

# 5. 記事をコミット (画像は含めない)
git add src/content/posts/YYYY-MM-DD-NN_my-post-title.md
git commit -m "Add: 新しい記事"
git push
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:4321 を開いてください．

### 型チェック

```bash
npm run typecheck
```

または

```bash
npm run lint
```

### ビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに生成されます．

### プレビュー

```bash
npm run preview
```

## デプロイ

このサイトは GitHub Actions を使用して GitHub Pages に自動デプロイされます．

`main` ブランチにプッシュすると，自動的に以下が実行されます：

1. 型チェック (`npm run typecheck`)
2. ビルド (`npm run build`)
3. **CNAME ファイルの生成** (`SITE_URL` からドメイン名を抽出して `dist/CNAME` に配置)
4. GitHub Pages へのデプロイ

### GitHub Actions の環境変数設定

本番環境用の環境変数は，GitHub リポジトリの設定で管理します：

1. リポジトリの **Settings** → **Secrets and variables** → **Actions**
2. **Variables** タブで以下を設定：
   - `SITE_URL`: サイトのURL (例: `https://example.com`)
     - Astro の `site` 設定に使用
     - デプロイ時に CNAME ファイル生成に使用

**注意**: 開発環境では `.env` ファイル，本番環境では GitHub Actions の Variables を を使用します．

## 記事の追加と管理

記事の作成から公開までの詳細は [`docs/workflow.md`](./docs/workflow.md) を参照してください．

画像ホスティングの設定については [`docs/image-hosting.md`](./docs/image-hosting.md) を参照してください．

### 多言語対応

記事の `lang` フィールドで表示言語を制御します：

- **未定義** (デフォルト)：日本語版/英語版の両方に表示
- **`lang: 'ja'`**: 日本語版のみに表示
- **`lang: 'en'`**: 英語版のみに表示

**推奨運用：**

1. 新規記事は `lang` 未指定 (両言語版に表示)
2. 英語版を追加する際に，日本語版に `lang: 'ja'` を追加し，英語版に `lang: 'en'` を設定

詳細は [`docs/workflow.md`](./docs/workflow.md) の「多言語対応」セクションを参照してください．

### プロフィール情報の更新

**「私について」ページ**のコンテンツは `src/data/about.ts` で一元管理されています：

- 経歴，学歴，出版物，資格などのデータを編集
- 日本語版 (`aboutDataJa`) と英語版 (`aboutDataEn`) の両方を更新
- 詳細は [`docs/about-data.md`](./docs/about-data.md) を参照

**リンク集**の更新：

- `src/pages/links.astro` (日本語版)
- `src/pages/en/links.astro` (英語版) を編集

## 注意事項

### リポジトリサイズとGitHub Pages

GitHub Pages は **リポジトリサイズ 1 GB 以下** にしなければなりません

**現在の設計：**

- 画像は Cloudflare R2 にホスト (`public/posts/images/` は `.gitignore` で除外)
- Git リポジトリには記事ファイルのみコミット
- **リポジトリサイズは数 MB 程度** に抑える

**画像サイズについて：**

R2 には実質的な制限はありませんが，以下の点に注意：

1. **画像の最適化** (ユーザー体験向上のため)
   - WebP 形式の使用を推奨
   - 適切な圧縮 (TinyPNGなど)
   - 不要に大きい解像度を避ける

2. **ヘッダー背景画像**
   - レスポンシブ対応のため最大3ファイル (モバイル/タブレット/デスクトップ)
   - 推奨サイズは `public/backgrounds/README.md` を参照
   - 合計ファイルサイズを 5 MB 以下に抑えることを推奨

### 開発環境での画像フォールバック

`IMAGE_BASE_URL` を設定した開発環境では，画像の自動フォールバック機能が有効になります：

**動作：**

1. 記事内の画像はまず R2 (`IMAGE_BASE_URL`) を参照
2. R2 に画像が存在しない場合 (404 エラー)，自動的にローカル (`/posts/images`) にフォールバック
3. フォールバックは一度だけ実行され，無限ループを防止

**実装の仕組み：**

- `src/layouts/Layout.astro` で JavaScript を使用
- 画像要素の状態を検出 (`img.complete && img.naturalWidth === 0`)
- 既にロード失敗している場合と，これからロードする場合の両方に対応
- 本番環境 (`npm run build`) では静的な HTML のみ生成され，フォールバック処理は含まれない

**用途：**

- R2 にアップロード前の記事をプレビュー
- R2 アップロード忘れの際の確認

### i18n

Astro の組み込み i18n 機能を使用しています：

- `Astro.currentLocale` で現在のロケールを自動判定
- 翻訳は `src/i18n/translations.ts` で管理
- 各ページで `getTranslation(Astro.currentLocale, 'key')` を使用

**翻訳ファイルの設計方針：**

`src/i18n/translations.ts` には **UI ラベルのみ** を含めます：

**含めるべきもの：**

- ナビゲーションラベル (ホーム，私について，記事，リンク)
- ボタンやフォームのテキスト
- エラーメッセージ
- 共通のUIテキスト (「すべて表示」「絞り込み」など)

**含めないもの：**

- 実際のページコンテンツ (自己紹介文，経歴，資格など)
- データファイルで管理すべき内容
- ページ固有の長文テキスト

**実際のコンテンツの管理場所：**

- 経歴・資格など: `src/data/about.ts`
- 記事: `src/content/posts/`
- ページ固有のテキスト: 各`.astro`ファイル内に直接記述

新しい翻訳キーを追加する場合は，上記の方針に従い，`translations.ts` の `ja` と `en` 両方に追加してください．

## ライセンス

&copy; 2025, Masaki Haga (silasolla)
