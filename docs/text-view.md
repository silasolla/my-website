# テキスト版 (/text/)

## 概要

`w3m` などのテキストブラウザから記事を読むための系統です．通常ページと同じ静的ビルドの成果物で，サーバ側の出し分けはありません．

通常ページも w3m で読めますが，数式 (KaTeX が MathML と HTML と LaTeX の3表現を出す)，リンクカード，目次 (sidebar と mobile が両方 DOM にある) が重複して表示されます．w3m は CSS を解釈しないため `display: none` でも `hidden` 属性でも隠せません．テキスト版はこれらを最初から出さないことで解決します．

| ファイル                            | 役割                                      |
| ----------------------------------- | ----------------------------------------- |
| `src/utils/textView.ts`             | MDX ソースをテキスト向け Markdown に変換  |
| `src/layouts/TextPage.astro`        | CSS もヘッダもフッタも持たない最小の HTML |
| `src/pages/text/index.astro`        | 記事一覧                                  |
| `src/pages/text/posts/[slug].astro` | 記事1本                                   |

対象は日本語の記事のみです．`/about`, `/links`, `/identity` は通常ページのままで w3m から読めるため，テキスト版を持ちません．

## レンダリング済み HTML ではなく MDX ソースを使う

`textView.ts` は `render(entry)` を使わず，`entry.body` (MDX の生ソース) を `createMarkdownProcessor` で組んだ独立したプロセッサに通します．

`astro.config.mjs` の `markdown.processor` はサイト全体で共有されるため，ルート単位でプラグインを切り替えられません．独立したプロセッサに通すことで，KaTeX / remark-link-card / Shiki を経由せず，数式は `$...$` のソースのまま，リンクカードは素のリンクとして出ます．

この分離により，`astro.config.mjs` に rehype プラグインを追加してもテキスト版は影響を受けません．逆に，テキスト版の出力を変えたい場合に `astro.config.mjs` を触っても効果がありません．

## コンポーネント対応表

MDX 本文に書ける `<Img>` / `<Tweet>` / `<Slide>` は `textView.ts` の `componentMarkdown` でテキスト向けの Markdown に置き換えます．

**対応表に無いコンポーネントを MDX に書くとビルドが失敗します．** 通常ページは正常に生成されるため，ビルドを落とさないとテキスト版に生の JSX が漏れたまま気づけません．新しいコンポーネントを記事で使う場合は `componentMarkdown` に追加してください．

検査はコードブロックの外側に対して行うため，コードブロック内に大文字始まりのタグを書いてもビルドは通ります．

## 数式をコードブロックにする理由

`$$...$$` はフェンス付きコードブロックへ，`$...$` はコードスパンへ変換してから Markdown プロセッサに渡します．

素の段落として渡すと Markdown のエスケープ処理が LaTeX を壊します．行列の行区切り `\\` が `\` に潰れるのが典型例です．通常ページでは remark-math が Markdown より先に数式ノードとして切り出すためこの問題は起きません．

## 折り返し

記事本文は `<p>` の流し込みで出力し，折り返しは w3m に任せます．**w3m は `<pre>` も `text/plain` も折り返しません**．長い行はそのまま横スクロールになるため，散文を `<pre>` に入れてはいけません．

`curl` で素のテキストとして読む場合はパイプを挟みます．

```bash
curl -s https://silasol.la/text/posts/<slug>/ | w3m -dump -T text/html
```

## 検索エンジン

通常ページと内容が重複するため，`TextPage.astro` で `noindex, follow` を指定し，`astro.config.mjs` の sitemap `filter` で `/text/` を除外しています．片方だけ変更すると矛盾するため，両方を揃えてください．
