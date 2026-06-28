# silasolla - 個人サイト

> Trust, but verify.

## 概要

このリポジトリは，Masaki Haga (@silasolla) の個人サイトのソースコードです．
Markdown/MDX によって記事を管理します．

## 技術スタック

- **Astro**: 静的サイトジェネレータ (極力 JS を減らす)
- **TypeScript**: 型安全な開発
- **GitHub Actions**: CI/CD
- **Cloudflare Workers**: サイトのホスティング
- **Cloudflare R2**: 画像のホスティング

## プロジェクト構成

```
/
├── public/                  # 静的アセット
│   ├── avatar.png           # プロフィール写真
│   ├── profile/             # About ギャラリー
│   ├── favicon*.png         # ファビコン各種
│   ├── icons/               # アイコン (Bluesky, Twitter, リンクなど)
│   └── posts/images/        # 記事の画像 (gitignore, R2にホスト)
├── src/
│   ├── assets/
│   │   ├── avatar.png       # ヘッダーの丸アイコン
│   │   └── header/          # ヘッダー背景
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── Header.astro
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── LanguageSwitch.astro
│   │   ├── PostToc.astro
│   │   ├── PostTocList.astro
│   │   ├── ShareButtons.astro
│   │   ├── ImageGallery.astro
│   │   ├── ExperienceSection.astro
│   │   ├── EducationSection.astro
│   │   ├── WritingsSection.astro
│   │   ├── TalksSection.astro
│   │   ├── CertificationSection.astro
│   │   ├── MiscSection.astro
│   │   ├── HobbySection.astro
│   │   ├── Img.astro
│   │   ├── Slide.astro
│   │   ├── Tweet.astro
│   │   └── SignedTextViewer.astro
│   ├── content.config.ts    # コンテンツコレクション設定
│   ├── content/
│   │   └── posts/           # 記事 (Markdown/MDX)
│   ├── data/
│   │   ├── about/           # About ページのデータ
│   │   ├── links/           # Links ページのデータ
│   │   ├── profile.ts       # プロファイルデータ
│   │   └── theme.mjs
│   ├── grammars/
│   │   └── sml.tmLanguage.json
│   ├── i18n/
│   │   ├── translations.ts
│   │   └── utils.ts
│   ├── lib/
│   │   └── headerBackgrounds.ts
│   ├── layouts/
│   │   ├── Layout.astro
│   │   ├── HomePage.astro
│   │   ├── PostArticle.astro
│   │   ├── PostsIndex.astro
│   │   ├── IdentityIndex.astro
│   │   ├── IdentityKeyPage.astro
│   │   ├── IdentitySignedPage.astro
│   │   ├── AboutPage.astro
│   │   ├── LinksPage.astro
│   │   └── NotFoundPage.astro
│   ├── pages/               # ページルート (日本語 / en)
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── links.astro
│   │   ├── 404.astro
│   │   ├── identity/
│   │   ├── posts/
│   │   │   ├── [slug].astro
│   │   │   └── index.astro
│   │   ├── special/
│   │   │   └── [slug].astro
│   │   ├── rss/
│   │   │   ├── diary.xml.ts
│   │   │   ├── news.xml.ts
│   │   │   └── tech.xml.ts
│   │   ├── rss.xml.ts
│   │   └── en/              # 英語版 (上記と同構成)
│   ├── plugins/
│   │   ├── remark-image-url.mjs
│   │   ├── rehype-external-links.mjs
│   │   ├── rehype-link-card-target.mjs
│   │   └── vite-slide-pdf-proxy.mjs
│   ├── styles/
│   │   ├── global.css
│   │   ├── theme.css
│   │   ├── header.css
│   │   ├── navigation.css
│   │   ├── footer.css
│   │   ├── home-page.css
│   │   ├── post-article.css
│   │   ├── posts-index.css
│   │   ├── article-content.css
│   │   ├── about-page.css
│   │   ├── about-sections.css
│   │   ├── links-page.css
│   │   ├── link-cards.css
│   │   ├── identity-page.css
│   │   ├── fetchable-text.css
│   │   ├── not-found.css
│   │   ├── special-article.css
│   │   ├── image-gallery.css
│   │   ├── slide.css
│   │   ├── tweet.css
│   │   └── link-card.css
│   └── utils/
│       ├── paths.ts
│       ├── posts.ts
│       ├── math.ts
│       ├── image.ts
│       └── platform.ts
├── docs/
├── scripts/
│   ├── generate-static-files.js
│   ├── new-post.sh
│   └── upload-images.sh
├── wrangler.jsonc
├── .github/
└── Makefile
```

## 開発

### 必要な環境

- Node.js 24.x (Active LTS, `.node-version` 参照)
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

[環境変数ガイド](./docs/environment-variables.md) を参照してください．

### ドキュメント

| ドキュメント                                                | 内容                                     |
| ----------------------------------------------------------- | ---------------------------------------- |
| [workflow.md](./docs/workflow.md)                           | 記事の作成から公開                       |
| [environment-variables.md](./docs/environment-variables.md) | 環境変数                                 |
| [image-hosting.md](./docs/image-hosting.md)                 | 記事画像 (R2)                            |
| [static-images.md](./docs/static-images.md)                 | ヘッダー背景，アバター，About ギャラリー |
| [cloudflare-workers.md](./docs/cloudflare-workers.md)       | デプロイ，Workers 設定                   |
| [about-data.md](./docs/about-data.md)                       | About ページのデータ                     |
| [data-i18n.md](./docs/data-i18n.md)                         | プロファイルデータ，i18n                 |
| [sitemap-guide.md](./docs/sitemap-guide.md)                 | サイトマップ                             |
| [special-articles.md](./docs/special-articles.md)           | 特別記事                                 |

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
git add src/content/posts/YYYY-MM-DD-NN_my-post-title.mdx
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

`main` ブランチへのプッシュで，GitHub Actions がビルドし Cloudflare Workers にデプロイします．
`dist/` は Static Assets として配信されます．

PR では CI (チェックとビルド) のみ実行され，デプロイは行いません．

1. フォーマットチェック (`npm run format:check`)
2. EditorConfig チェック (`npm run editorconfig:check`)
3. 型チェック (`npm run typecheck`)
4. ビルド (`npm run build`)
5. Cloudflare Workers へのデプロイ (`wrangler deploy`)

**CI が失敗した場合，デプロイは実行されません．**

GitHub Actions の Secrets / Variables は **[環境変数ガイド](./docs/environment-variables.md#github-actions-本番環境)** を参照してください．

### カスタムドメイン

カスタムドメイン, `workers.dev` の無効化, Observability など Cloudflare Workers の運用設定は **[Cloudflare Workers 運用ガイド](./docs/cloudflare-workers.md)** を参照してください．

**注意**: 開発環境では `.env` ファイル，本番環境では GitHub Actions の Secrets/Variables を使用します．

## 記事の追加と管理

記事の作成，多言語対応，プロフィール情報の更新など，コンテンツ管理に関する詳細は **[ドキュメント](#ドキュメント)** を参照してください．

## 注意事項

### リポジトリサイズ

Git リポジトリは軽量に保つことを推奨します．

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
   - 推奨サイズは [static-images.md](./docs/static-images.md#ヘッダー背景) を参照
   - 合計ファイルサイズを 5 MB 以下に抑えることを推奨

### 開発環境での画像フォールバック

`IMAGE_BASE_URL` を設定した開発環境では，画像の自動フォールバック機能が有効になります：

**動作：**

1. 記事内の画像はまず R2 (`IMAGE_BASE_URL`) を参照
2. R2 に画像が存在しない場合 (404 エラー)，自動的にローカル (`/posts/images`) にフォールバック
3. フォールバックは一度だけ実行され，無限ループを防止

**用途：**

- R2 にアップロード前の記事をプレビュー
- R2 アップロード忘れの際の確認

本番ビルド (`npm run build`) ではこのフォールバックは含まれません．

### データ管理と国際化 (i18n)

[data-i18n.md](./docs/data-i18n.md) を参照．

## ライセンス

&copy; 2025, Masaki Haga (silasolla)
