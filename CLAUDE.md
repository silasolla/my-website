# CLAUDE.md

手順・構成・セットアップは [README.md](./README.md) と `docs/` が正本．このファイルには重複させず，**間違えても CI もツールも気づかないまま壊れること**だけを書く．

## 制約

- **記事は `.mdx` のみ**．`src/content.config.ts` の glob は `**/[^_]*.mdx`．素の `.md` で作った記事はエラーにならず，単に一覧から消える．MDX に限っているのは rehype プラグインが raw HTML に効かないため．
- **サイト内リンクは末尾に `/` を付ける**．`astro.config.mjs` の `trailingSlash: 'always'` により，`/posts` は dev で 404，本番では `/posts/` へ 308 リダイレクトされる．`src/utils/paths.ts` のヘルパーは末尾スラッシュを**含まない**戻り値なので (`postsBasePath('ja')` → `/posts`)，呼び出し側で `` `${postsBasePath(locale)}/` `` と付ける．`.xml` / `.png` などのファイルには付けない．
- **dev で期待した挙動が出ないときは，原因を調べる前に dev サーバーを再起動する**．HMR が変更を反映していないだけの場合があり，これはツールでは切り分けられない．
- **`wrangler.jsonc` に `routes` / `route` を追加しない**．カスタムドメインは Cloudflare ダッシュボード側で管理しており，wrangler に書くとダッシュボードのドメイン一覧が wrangler の内容で置換され，未記載のドメインがデプロイ時に外れる（[docs/cloudflare-workers.md](./docs/cloudflare-workers.md)）．

## docs/ に追記するとき

既存ファイルの文体に合わせる．絵文字見出し，`✅` 箇条書き，想定読者への助言（「〜を検討してください」）は使わない．
