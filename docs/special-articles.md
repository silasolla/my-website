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
│ - CORSヘッダー設定           │      │ - 環境変数でデータURL指定 │
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
    ├── _headers
    ├── articles/
    │   ├── index.json
    │   └── [uuid].json
    └── (README.md など)
    ```

    **`_headers` ファイル**

    メインサイトからの fetch を許可するため，CORS (Cross-Origin Resource Sharing) 設定を記述します．

    ```plaintext
    # /articles/ ディレクトリ以下の全ファイルに適用
    /articles/*
      # メインサイトのドメインを許可
      Access-Control-Allow-Origin: https://your-domain.com
      # 念のためキャッシュを無効化
      Cache-Control: no-cache, no-store, must-revalidate
    ```

    **`articles/index.json` ファイル**

    記事一覧のメタデータを管理します．

    ```json
    {
      "articles": [
        {
          "slug": "f7a3b2c9-4d5e-6f8a-9b0c-1d2e3f4a5b6c",
          "title": "特別記事のタイトル",
          "category": "特別",
          "categoryColor": "#ff6b6b",
          "date": "2025-10-28T00:00:00Z",
          "description": "記事の簡単な説明",
          "tags": ["special"]
        }
      ]
    }
    ```

    **`articles/[uuid].json` ファイル**

    記事の本文データを格納します．ファイル名は推測されにくいように UUID を推奨します．

    ```json
    {
      "slug": "f7a3b2c9-4d5e-6f8a-9b0c-1d2e3f4a5b6c",
      "title": "特別記事のタイトル",
      "content": "<h2>見出し</h2><p>本文はHTML形式で記述します</p>",
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
    - **ビルド出力ディレクトリ**: `/`
3.  デプロイ後 `data.your-domain.com` のようなカスタムドメインを設定します．

## Step 2: メインサイトの設定

次に，メインサイト (このプロジェクト) で特別記事を読み込むための設定を行います．

### 2.1. 環境変数の設定

この機能は環境変数 `PUBLIC_DATA_BASE_URL` に依存します．

1.  プロジェクトのルートにある `.env.example` をコピーして `.env` ファイルを作成します．

    ```bash
    cp .env.example .env
    ```

2.  `.env` ファイルを編集し，データ配信サイトのURLを設定します．

    ```plaintext
    # .env
    SITE_URL=https://your-domain.com
    PUBLIC_DATA_BASE_URL=https://data.your-domain.com
    IMAGE_BASE_URL=https://your-image-cdn.com
    ```

    - `PUBLIC_DATA_BASE_URL`: **(必須)** 先ほどデプロイしたデータ配信サイトの URL を指定します．`PUBLIC_` プレフィックスにより，この変数はクライアントサイドの JavaScript から参照可能になります．

3.  本番環境 (GitHub Actions) では，リポジトリの **Settings > Secrets and variables > Actions** から，以下の **Repository variables** を設定します．
    - `PUBLIC_DATA_BASE_URL`: `https://data.your-domain.com`

### 2.2. ビルド時の動作

`npm run build` を実行すると、`scripts/generate-static-files.js` が動作し，環境変数に基づいて以下の設定ファイルが自動生成されます．

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

`articles/[uuid].json` ファイルを作成します．本文 (`content`) は HTML 形式で記述します．Markdown で下書きを作成し `marked` などのツールで HTML に変換すると便利です．

```bash
# Markdown ファイルから HTML を生成
npx marked article.md > content.html
```

### 3.3. 一覧への追加

`articles/index.json` の `articles` 配列に，新しい記事のメタデータを追加します．

### 3.4. データサイトのデプロイ

変更をコミットし，データ配信サイト (`special-articles-data`) のリポジトリにプッシュします．
Cloudflare Pages が自動で変更を検知し，デプロイを開始します．

### 3.5. 記事へのアクセス

デプロイが完了すると，以下の URL で記事を閲覧できます．

`https://your-domain.com/special/[uuid]`

## トラブルシューティング

### Q: 記事を読み込む際に CORS エラーが発生する

**原因**: データ配信サイトの CORS 設定が正しくない可能性があります．

**解決策**:

1.  データ配信サイトの `_headers` ファイルを確認し，`Access-Control-Allow-Origin` にメインサイトの正しいドメインが指定されているか確認してください．
2.  変更後は，データ配信サイトを再デプロイするのを忘れないでください．

### Q: 記事が表示されず，404 エラーになる

**原因**: データ配信サイトの URL が間違っているか，JSON ファイルが存在しない可能性があります．

**解決策**:

1.  メインサイトの環境変数 `PUBLIC_DATA_BASE_URL` が正しく設定されているか確認してください．
2.  ブラウザの開発者ツールを開き，Network タブで JSON ファイル (`index.json` や `[uuid].json`) の読み込みが成功しているか確認します．404 エラーが出ている場合は，URL やファイルパスが正しいか再度確認してください．

### Q: 環境変数を変更したが，反映されない

**原因**: ビルドキャッシュが残っているか，設定場所が間違っている可能性があります．

**解決策**:

- **ローカル環境**: `.env` ファイルを編集した後，`npm run build` を再度実行してください．
- **本番環境**: GitHubリポジトリの **Repository variables** を更新した後，新しいコミットをプッシュするか，Actions タブからワークフローを再実行してください．
