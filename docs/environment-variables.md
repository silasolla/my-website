# 環境変数ガイド

## 概要

このプロジェクトでは，サイトの URL や外部サービスの API キーなど，環境によって異なる設定値を環境変数で管理しています．
これにより，開発環境と本番環境で異なる設定を安全に適用できます．

## セットアップ

### ローカル開発環境

開発を始める前に，プロジェクトのルートに `.env` ファイルを作成し，必要な環境変数を設定します．

1.  `.env.example` をコピーして `.env` ファイルを作成します．

    ```bash
    cp .env.example .env
    ```

2.  `.env`ファイルを開き，各変数に適切な値を設定します．

    ```plaintext
    # .env
    SITE_URL=http://localhost:4321
    PUBLIC_DATA_BASE_URL=https://data.example.com
    IMAGE_BASE_URL=
    NGROK_HOST=
    ```

**注意:** `.env` ファイルは `.gitignore` によってGitの管理対象から除外されています．機密情報 (API キーなど) を誤ってコミットしないようにしてください．

### GitHub Actions (本番環境)

本番環境へのデプロイは GitHub Actions によって自動化されており，環境変数は GitHub リポジトリの以下の場所で設定します．

- **Settings > Secrets and variables > Actions**

| 種類          | 設定場所               | 説明                                   |
| ------------- | ---------------------- | -------------------------------------- |
| **Variables** | `Repository variables` | 公開されても問題ない値 (サイトURLなど) |
| **Secrets**   | `Encrypted secrets`    | APIトークンなど，機密性の高い値        |

これらの値は `.github/workflows/deploy.yml` 内で参照され，ビルド時に適用されます．

#### Secrets

| 変数名                  | 説明                                                |
| ----------------------- | --------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare API トークン (Workers Scripts Edit 権限) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID                            |

#### Variables

| 変数名                   | 説明                                           |
| ------------------------ | ---------------------------------------------- |
| `SITE_URL`               | サイトの正規 URL                               |
| `IMAGE_BASE_URL`         | 画像 CDN のベース URL                          |
| `PUBLIC_DATA_BASE_URL`   | 特別記事データ配信サイトの URL                 |
| `CLOUDFLARE_WORKER_NAME` | デプロイ先 Worker 名 (デフォルト: `silasolla`) |

## 主要な環境変数

このプロジェクトで使用される主な環境変数は以下の通りです．

| 変数名                 | 説明                                                                                                                                                                    | 必須   | 例                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------- |
| `SITE_URL`             | サイトの正規 URL です．サイトマップや OGP 画像の生成に使用されます．                                                                                                    | はい   | `https://your-domain.com`       |
| `PUBLIC_DATA_BASE_URL` | [特別記事機能](./special-articles.md) で使用する，記事データを配信するサイトのベース URL です．`PUBLIC_` プレフィックスが付いているため，ブラウザからアクセス可能です． | いいえ | `https://data.your-domain.com`  |
| `IMAGE_BASE_URL`       | 記事内の画像を指定された CDN から配信する場合のベース URL です．設定すると `@@/` で始まる画像パスがこの URL に置換されます．                                            | いいえ | `https://your-image-cdn.com`    |
| `USE_NGROK`            | `true` のときだけ ngrok 向け設定を有効にします．未設定時は `NGROK_HOST` は無視され，localhost 向けの通常 HMR になります．                                               | いいえ | `true`                          |
| `NGROK_HOST`           | `USE_NGROK=true` のときの ngrok ホスト名です．`https://` は付けず，ホスト名のみ (例: `xxxx.ngrok-free.app`) を指定します．HMR は無効 (手動リロード) です．              | いいえ | `your-unique-id.ngrok-free.app` |
| `R2_BUCKET_NAME`       | Cloudflare R2 のバケット名です．`make upload-images` で使用します．                                                                                                     | いいえ | `public`                        |

### ngrok 経由で開くとき

1. `npm run dev` を起動する (ポート 4321)
2. 別ターミナルで `ngrok http 127.0.0.1:4321` を起動する
3. `.env` に `USE_NGROK=true` と `NGROK_HOST=xxxx.ngrok-free.app` を設定する (`NGROK_HOST` は ngrok 起動時の表示に合わせる，`allowedHosts` は `.ngrok-free.app` で自動許可)
4. `npm run dev` を再起動する
5. ブラウザで ngrok の URL を開く

ngrok の URL が変わったら `NGROK_HOST` を更新し，開発サーバーを再起動してください．通常の開発では `USE_NGROK` は未設定にしてください．

## ビルド時の自動ファイル生成

`npm run build` を実行すると `scripts/generate-static-files.js` スクリプトが環境変数を読み取り，以下のファイルを自動で生成・更新します．

- `public/_headers`: Cloudflare Workers 用の HTTP ヘッダー設定ファイルです．CSP (Content Security Policy) などに `PUBLIC_DATA_BASE_URL` の値が利用されます．
- `public/robots.txt`: 検索エンジン向けのクロール設定ファイル．サイトマップの URL に `SITE_URL` の値が利用されます．
- `public/.assetsignore`: Wrangler が Static Assets へアップロードしないファイルのパターンです．

これにより，環境ごとに最適なヘッダーや `robots.txt` が適用されます．

## セキュリティに関する注意点

### `PUBLIC_` プレフィックス

Astro の仕様上，`PUBLIC_` というプレフィックスが付いた環境変数は，クライアントサイドの JavaScript に埋め込まれ，ブラウザから誰でも参照できます．

- **安全な例**: `PUBLIC_DATA_BASE_URL` (公開情報であるため問題なし)
- **危険な例**: `PUBLIC_API_KEY` (APIキーなどの機密情報を入れてはいけません)

機密情報は必ず `PUBLIC_` プレフィックスを付けずに管理し，サーバーサイドでのみ使用してください．
