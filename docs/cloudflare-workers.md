# Cloudflare Workers 運用ガイド

## 概要

本番サイトは Cloudflare Workers (Static Assets) にデプロイします．設定は `wrangler.jsonc` と Cloudflare ダッシュボードの両方に分かれています．`wrangler deploy` は **wrangler に書いてある項目だけ** を上書きします．

## 設定の所在

| 項目                | 設定場所                                                              | 備考                                                 |
| ------------------- | --------------------------------------------------------------------- | ---------------------------------------------------- |
| Worker 名           | `wrangler.jsonc` の `name` / GitHub Variable `CLOUDFLARE_WORKER_NAME` | [環境変数ガイド](./environment-variables.md) を参照  |
| Static Assets       | `wrangler.jsonc` の `assets`                                          | ビルド成果物 `dist/`                                 |
| `*.workers.dev`     | `wrangler.jsonc` の `workers_dev`                                     | `false` 必須，未指定時はデプロイのたびに有効化される |
| Preview URLs        | `wrangler.jsonc` の `preview_urls`                                    | `workers_dev` に合わせて `false` を明示              |
| カスタムドメイン    | Cloudflare ダッシュボード                                             | `routes` を wrangler に書かない限り維持される        |
| Workers Logs        | `wrangler.jsonc` の `observability`                                   | ダッシュボードのみの設定は再デプロイで消える         |
| サイト URL (ビルド) | GitHub Variable `SITE_URL`                                            | サイトマップ, OGP, robots.txt に使用                 |

## wrangler.jsonc

リポジトリの `wrangler.jsonc` が正本です．主要フィールドの意味は以下の通りです．

| フィールド                           | 値         | 説明                                       |
| ------------------------------------ | ---------- | ------------------------------------------ |
| `workers_dev`                        | `false`    | `*.workers.dev` を無効化する               |
| `preview_urls`                       | `false`    | デプロイごとの Preview URL を無効化する    |
| `observability.enabled`              | `true`     | Workers Logs を有効化する                  |
| `observability.logs.invocation_logs` | `true`     | リクエストごとの invocation log を記録する |
| `observability.traces.enabled`       | `false`    | トレースは無効 (無料枠節約)                |
| `assets.directory`                   | `./dist`   | Astro ビルド成果物                         |
| `assets.not_found_handling`          | `404-page` | 存在しないパスは `404.html` を返す         |

### workers_dev

本番はカスタムドメインのみで公開する想定です．`workers_dev` を省略するとデフォルト `true` となり，ダッシュボードで Disable しても次回 `wrangler deploy` で `*.workers.dev` が復活します．

### preview_urls

デプロイごとに付与される Preview URL (`<version>-<worker>.<subdomain>.workers.dev`) の公開設定です．Wrangler 4.44 以降，未指定時は `workers_dev` と同じ値がデフォルトになります．`workers_dev: false` かつ `preview_urls` 未指定の場合，Preview URL も無効になり，その旨の WARNING が出ます．本番 Worker では `preview_urls: false` を明示します．

### observability

Workers Logs をダッシュボード (Workers & Pages > 対象 Worker > Observability) で参照するために有効化します．Zaraz / GA4 などクライアント側のアクセス解析とは別系統で，エッジでのリクエスト処理を記録します．

無料プランは 200,000 log events / 日です．超過時は当該日の残りを 1% サンプリングします．サイトの配信は停止しません．

### routes を wrangler に書かない理由

カスタムドメイン (例: apex, `www`, サブドメイン) はダッシュボード (Settings > Domains & Routes) で管理します．wrangler に `routes` / `route` を追加すると，ダッシュボードのドメイン一覧が **wrangler の内容で置き換わります**．登録済みドメインをすべて列挙しない限り，未記載のドメインはデプロイ時に外れる可能性があります．

全ドメインを wrangler で管理する場合の例:

```jsonc
"routes": [
  { "pattern": "example.com", "custom_domain": true },
  { "pattern": "www.example.com", "custom_domain": true },
  { "pattern": "blog.example.com", "custom_domain": true }
]
```

## カスタムドメインの追加・変更

1. [Cloudflare ダッシュボード](https://dash.cloudflare.com/) > **Workers & Pages** > 対象 Worker
2. **Settings** > **Domains & Routes** > **Add** > **Custom domain**
3. ドメイン名を入力 (DNS は Cloudflare が自動設定)
4. `wrangler.jsonc` に `routes` を追加していないことを確認
5. main へマージしてデプロイ (`workers_dev: false` が維持されることを確認)

## デプロイ

GitHub Actions (`.github/workflows/deploy.yml`) が main への push 時に `wrangler deploy` を実行します．必要な Secrets / Variables は [環境変数ガイド](./environment-variables.md#github-actions-本番環境) を参照してください．

手動デプロイ:

```bash
npm run build
npx wrangler deploy
```

## 関連ドキュメント

- [環境変数ガイド](./environment-variables.md)
- [画像ホスティング](./image-hosting.md)
