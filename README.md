# silasolla - 個人サイト

> Trust, but verify.

## 概要

このリポジトリは，Masaki Haga (@silasolla) の個人サイトのソースコードです．
Markdown/MDX によって記事を管理します．

## 技術スタック

- **Astro**: 静的サイトジェネレータ (極力 JS を減らす)
- **TypeScript**: 型安全な開発
- **GitHub Actions**: CI/CD
- **Cloudflare Pages**: サイトのホスティング
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
│   │   ├── about.ts         # About ページのデータ
│   │   └── profile.ts       # プロファイルデータ (個人情報の一元管理)
│   ├── grammars/            # シンタックスハイライト定義
│   │   └── sml.tmLanguage.json
│   ├── i18n/                # 国際化
│   │   ├── translations.ts  # UI テキスト翻訳
│   │   └── utils.ts         # i18n ユーティリティ関数
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
│   ├── workflows/
│   │   └── deploy.yml       # GitHub Actions デプロイ設定
│   └── dependabot.yml       # Dependabot
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

### ドキュメント

運用に関するドキュメントは `docs/` ディレクトリにまとめられています．

- **[記事作成ワークフロー](./docs/workflow.md)**: 新しい記事の作成から公開までの手順を説明します
- **[環境変数ガイド](./docs/environment-variables.md)**: プロジェクトで使用する環境変数について説明します
- **[サイトマップガイド](./docs/sitemap-guide.md)**: サイトマップの自動生成と設定について説明します
- **[特別記事機能ガイド](./docs/special-articles.md)**: 検索エンジンから除外される特別な記事を配信する機能について説明します
- **[Aboutページデータ管理](./docs/about-data.md)**: 「私について」ページのコンテンツ (経歴や資格など) の編集方法を説明します
- **[データ管理と国際化対応](./docs/data-i18n.md)**: プロファイルデータの一元管理と i18n の仕組みについて説明します
- **[画像ホスティング](./docs/image-hosting.md)**: 画像のアップロードと配信の仕組みについて説明します
- **[ヘッダー背景画像](./docs/header-backgrounds.md)**: ヘッダー背景画像の管理方法について説明します

### 記事の作成と公開

記事の作成と公開に関する詳細な手順は **[記事作成ワークフロー](./docs/workflow.md)** を参照してください．

簡単な流れ：

```bash
# 1. 記事を作成
make new SLUG=my-post-title

# 2. 記事を書き，画像を配置

# 3. ローカルで確認
npm run dev

# 4. 画像を R2 にアップロード
make upload-images SLUG=YYYY-MM-DD-NN_my-post-title

# 5. 記事をコミットしてプッシュ
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

このサイトは GitHub Actions を使用して Cloudflare Pages に自動デプロイされます．

`main` ブランチにプッシュまたは PR を作成すると，自動的に以下が実行されます：

1. フォーマットチェック (`npm run format:check`)
2. EditorConfig チェック (`npm run editorconfig:check`)
3. 型チェック (`npm run typecheck`)
4. ビルド (`npm run build`)
5. Cloudflare Pages へのデプロイ (Wrangler)

**CI が失敗した場合，デプロイは実行されません．**

### GitHub Actions の設定

本番環境用の設定は，GitHub リポジトリで管理します：

#### Secrets

リポジトリの **Settings** → **Secrets and variables** → **Actions** → **Secrets** タブ：

- `CLOUDFLARE_API_TOKEN`: Cloudflare API トークン (Cloudflare Pages Edit 権限)
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare アカウント ID

#### Variables

リポジトリの **Settings** → **Secrets and variables** → **Actions** → **Variables** タブ：

- `SITE_URL`: サイトのURL (例: `https://example.com`)
- `IMAGE_BASE_URL`: 画像ホスティングURL (例: `https://image.example.com`)
- `CLOUDFLARE_PROJECT_NAME`: Cloudflare Pages プロジェクト名 (例: `my-site`)

### カスタムドメインの設定

初回デプロイ後，Cloudflare ダッシュボードで設定：

1. https://dash.cloudflare.com/ → **Workers & Pages** → プロジェクト
2. **Custom domains** → **Set up a custom domain**
3. ドメイン名を入力してDNS設定

### Preview 環境

PR を作成すると，自動的に Preview 環境が作成されます：

- URL: `https://<branch-name>.<project-name>.pages.dev`
- GitHub の PR ページにリンクが表示されます
- マージ前に確認可能

**注意**: 開発環境では `.env` ファイル，本番環境では GitHub Actions の Secrets/Variables を使用します．

## 記事の追加と管理

記事の作成，多言語対応，プロフィール情報の更新など，コンテンツ管理に関する詳細は `## 開発` セクション内の **[ドキュメント](#ドキュメント)** を参照してください．

## 注意事項

### リポジトリサイズとCloudflare Pages

Cloudflare Pages 自体にはリポジトリサイズの制約はありませんが，Git リポジトリは軽量に保つことを推奨します．

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

### データ管理と国際化（i18n）

このサイトでは，個人情報とコンテンツを一元管理し，日本語・英語の2言語に対応しています．

**主要な仕組み：**

- **プロファイルデータ**: `src/data/profile.ts` で個人情報を一元管理
- **翻訳**: `src/i18n/translations.ts` で UI テキストを管理
- **ユーティリティ**: `src/i18n/utils.ts` でプロファイルと翻訳を組み合わせて動的なテキストを生成
- **ロケール判定**: `Astro.currentLocale` で現在のロケールを自動判定

**設計方針：**

- `src/data/profile.ts`: 名前，SNSリンク，SEOキーワードなど個人情報
- `src/i18n/translations.ts`: ナビゲーション，ボタン，エラーメッセージなど **UI ラベルのみ**
- `src/data/about.ts`: 経歴，資格，趣味など構造化されたコンテンツ
- `src/content/posts/`: 記事本文

詳細な使用方法とベストプラクティスについては，**[データ管理と国際化対応](./docs/data-i18n.md)** を参照してください．

## ライセンス

&copy; 2025, Masaki Haga (silasolla)
