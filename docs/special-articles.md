# 特別記事機能ガイド

## 概要

通常のSSG (静的サイト生成) の記事とは別に，検索エンジンにインデックスされず，特定のリンクを知っている人だけが閲覧できる「特別記事」を配信するための機能です．

記事データは別のプライベートなリポジトリで管理し，メインサイトからは API のように fetch してクライアントサイドでレンダリング (CSR) します．

### アーキテクチャ

```
┌──────────────────────────────┐      ┌───────────────────────────┐
│ データ配信サイト (CSR)         │      │ メインサイト (SSG/CSR)      │
│ (例: data.your-domain.com)   │      │ (例: your-domain.com)     │
├──────────────────────────────┤      ├───────────────────────────┤
│ - articles/index.json        │      │ - /posts/* (SSG)          │
│ - articles/[uuid].json       │      │ - /special/[slug] (CSR)   │
│ - CORSヘ ッダー設定           │      │ - 環境変数でデータ URL 指定 │
│ - 外部には非公開             │      │                           │
└──────────────────────────────┘      └───────────────────────────┘
         ↑
         | fetch
         └──────────────────────────────
```

## Step 1: データ配信サイトの準備

まず，記事の JSON データをホスティングするためのサイトを準備します．
ここでは GitHub リポジトリと Cloudflare Pages を利用する例を説明します．

### 1.1. データ用リポジトリの作成

1.  記事データ (JSON ファイル) を管理するための，新しいプライベートな GitHub リポジトリを作成します．(例: `special-articles-data`)
2.  リポジトリのルートに，以下のファイル構成でサンプルデータを配置します．

    ```
    .
    ├── public/              # Cloudflare Pages デプロイ対象
    │   ├── _headers
    │   ├── articles/
    │   │   ├── index.json
    │   │   └── [uuid].json
    │   └── robots.txt
    ├── scripts/             # 記事作成スクリプト
    ├── docs/                # ドキュメント
    └── (README.md など)
    ```

    **`public/_headers` ファイル**

    メインサイトからの fetch を許可するため，CORS (Cross-Origin Resource Sharing) 設定を記述します．

    ```plaintext
    # Cloudflare Pages 用のセキュリティヘッダー設定

    # すべてのファイルに共通設定
    /*
      Access-Control-Allow-Origin: *
      X-Robots-Tag: noindex, nofollow, noarchive
      X-Content-Type-Options: nosniff
      Referrer-Policy: strict-origin-when-cross-origin

    # 記事 JSON ファイル (キャッシュ時間を調整)
    /articles/*.json
      Cache-Control: public, max-age=3600, s-maxage=3600

    # index.json (より短いキャッシュ)
    /articles/index.json
      Cache-Control: public, max-age=1800, s-maxage=1800
    ```

    **注意**: `Access-Control-Allow-Origin: *` を使用しています．(ブラウザのプリフライトリクエストを回避するため)

    **`articles/index.json` ファイル**

    記事のスラッグ（UUID）の一覧を管理します．

    ```json
    {
      "slugs": ["f7a3b2c9-4d5e-6f8a-9b0c-1d2e3f4a5b6c", "6913e848-cca3-4ae7-85e4-fbd6bad8cf28"]
    }
    ```

    **重要**:
    - ビルド時に `getStaticPaths()` でこのファイルをフェッチし，各記事への静的パスを生成します．
    - タイトルや本文などの詳細情報は含めず，スラッグのみを格納します．
    - **フォーマット**: `slugs` 配列は必須です．配列が存在しない場合，ビルドはプレースホルダーのみを生成します．

    **`articles/[uuid].json` ファイル**

    記事の本文データを格納します．ファイル名は推測されにくいように UUID を推奨します．(特に認証制限を設けているわけではない)

    ```json
    {
      "slug": "f7a3b2c9-4d5e-6f8a-9b0c-1d2e3f4a5b6c",
      "title": "特別記事のタイトル",
      "content": "<h2>見出し</h2><p>本文は HTML 形式で記述します</p>",
      "category": "特別",
      "categoryColor": "#ff6b6b",
      "date": "2025-10-28T00:00:00Z",
      "tags": ["special"],
      "meta": {
        "publishedAt": "2025-10-28T00:00:00Z",
        "updatedAt": "2025-10-28T00:00:00Z"
      }
    }
    ```

### 1.2. Cloudflare Pages へのデプロイ

1.  Cloudflare ダッシュボードから Pages へ進み，作成したデータ用リポジトリ (`special-articles-data`) を接続します．
2.  ビルド設定は以下のように指定します．
    - **ビルドコマンド**: (空欄)
    - **ビルド出力ディレクトリ**: `/public`
3.  デプロイ後，`data.your-domain.com` のようなカスタムドメインを設定します．

## Step 2: メインサイトの設定

次に，メインサイト (このプロジェクト) で特別記事を読み込むための設定を行います．

### 2.1. 環境変数の設定

この機能は環境変数 `PUBLIC_DATA_BASE_URL` に依存します．

1.  **ローカル開発環境**: プロジェクトルートに `.env` ファイルを作成し，データ配信サイトの URL を設定します．

    ```plaintext
    # .env
    SITE_URL=https://your-domain.com
    PUBLIC_DATA_BASE_URL=https://data.your-domain.com
    IMAGE_BASE_URL=https://your-image-cdn.com
    ```

    - `PUBLIC_DATA_BASE_URL`: **(必須)** 先ほどデプロイしたデータ配信サイトの URL を指定します．`PUBLIC_` プレフィックスにより，この変数はクライアントサイドの JavaScript から参照可能になります．

2.  **本番環境 (GitHub Actions)**: リポジトリの **Settings > Secrets and variables > Actions > Variables** から，以下の **Repository variables** を設定します．
    - `PUBLIC_DATA_BASE_URL`: `https://data.your-domain.com`
    - `SITE_URL`: `https://your-domain.com`
    - `IMAGE_BASE_URL`: `https://your-image-cdn.com`

    これらの変数は `.github/workflows/deploy.yml` で自動的に読み込まれます．

### 2.2. ビルド時の動作

`npm run build` を実行すると，`scripts/generate-static-files.js` が動作し，環境変数に基づいて以下の設定ファイルが自動生成されます．

- **`public/_headers`**:
  `Content-Security-Policy` に `connect-src 'self' ${PUBLIC_DATA_BASE_URL}` が追加され，データ配信サイトへの接続を許可します．
- **`public/robots.txt`**:
  `/special/` ディレクトリをクロール対象から除外する設定が書き込まれます．

これらのファイルは Git 管理外 (`.gitignore` に記載) であり，ビルド環境ごとに最適な設定が適用されます．

## Step 3: 記事の作成と公開

### 3.1. UUID の生成

記事ごとに一意で推測困難な ID として UUID を使用します．

```bash
# macOS / Linux
uuidgen | tr '[:upper:]' '[:lower:]'
# => f7a3b2c9-4d5e-6f8a-9b0c-1d2e3f4a5b6c
```

### 3.2. 記事JSONの作成

`articles/[uuid].json` ファイルを作成します．本文 (`content`) は HTML 形式で記述します．Markdownで下書きを作成し，`marked` などのツールで HTML に変換すると便利です．

```bash
# Markdown ファイルから HTML を生成
npx marked article.md > content.html
```

### 3.3. 一覧への追加

`articles/index.json` の `articles` 配列に，新しい記事のメタデータを追加します．

### 3.4. データサイトのデプロイ

変更をコミットし，データ配信サイト (`special-articles-data`) のリポジトリにプッシュします．
Cloudflare Pagesが自動で変更を検知し，デプロイを開始します．

### 3.5. メインサイトの再ビルド

データサイトに新しい記事を追加したら，**メインサイトも再ビルド**する必要があります．

理由: メインサイトのビルド時に `index.json` を取得して，各記事の静的 HTML ページを生成するためです．

```bash
# メインサイトのリポジトリで
git commit --allow-empty -m "Rebuild for new special article"
git push
```

または GitHub Actions から手動でワークフローを再実行します．

### 3.6. 記事へのアクセス

デプロイが完了すると，以下の URL で記事を閲覧できます．

`https://your-domain.com/special/[uuid]/`

**注意**: トレイリングスラッシュ (`/`) が必要です．スラッシュなしでアクセスすると，308リダイレクトが発生します．

## トラブルシューティング

### Q: 記事を読み込む際に CORS エラーが発生する

**原因**: いくつかの可能性があります．

1. データ配信サイトの CORS 設定が正しくない
2. `Access-Control-Allow-Origin` ヘッダーが重複している
3. プリフライトリクエスト (OPTIONS) が失敗している

**解決策**:

1.  データ配信サイトの `public/_headers` ファイルを確認してください．
    - `Access-Control-Allow-Origin: *` を使用します (推奨)．
    - ヘッダーが重複していないか確認します (`/*` と `/articles/*` で同じヘッダーを設定しない)．

2.  ブラウザの開発者ツールで Network タブを確認してください．
    - OPTIONS リクエストが 200 を返しているか確認します．
    - GET リクエストで CORS ヘッダーが正しく返されているか確認します．

3.  メインサイトの `src/pages/special/[slug].astro` で，fetchに不要なヘッダーを送っていないか確認してください．

    ```javascript
    // ✅ 正しい (シンプルなGETリクエスト)
    fetch(`${DATA_BASE_URL}/articles/${slug}.json`);

    // ❌ 間違い (プリフライトが発生)
    fetch(`${DATA_BASE_URL}/articles/${slug}.json`, {
      headers: { 'Content-Type': 'application/json' },
    });
    ```

### Q: 記事が表示されず，404 エラーになる

**原因**: いくつかの可能性があります．

1. メインサイトが記事のパスを生成していない
2. データ配信サイトの JSON ファイルが存在しない
3. URL が間違っている

**解決策**:

1.  **メインサイトの再ビルドを確認**:
    - データサイトに記事を追加した後，メインサイトも再ビルドしましたか？
    - ビルドログで `[Special Articles] Generated N paths` というメッセージを確認してください．

2.  **環境変数を確認**:
    - メインサイトの `PUBLIC_DATA_BASE_URL` が正しく設定されているか確認してください．
    - GitHub Actions の場合，Repository variables を確認してください．

3.  **JSON ファイルを確認**:
    - ブラウザで直接アクセス: `https://data.your-domain.com/articles/[uuid].json`
    - データサイトの `public/articles/` ディレクトリにファイルが存在するか確認してください．
    - `public/articles/index.json` に記事が登録されているか確認してください．

4.  **URL を確認**:
    - トレイリングスラッシュ付きでアクセスしてください: `https://your-domain.com/special/[uuid]/`

### Q: 環境変数を変更したが，反映されない

**原因**: ビルドキャッシュが残っているか，設定場所が間違っている可能性があります．

**解決策**:

- **ローカル環境**: `.env` ファイルを編集した後，`npm run build` を再度実行してください．
- **本番環境**: GitHubリポジトリの **Repository variables** を更新した後，新しいコミットをプッシュするか，Actions タブからワークフローを再実行してください．
