---
name: theme-shot
description: 指定ページを light/dark × mobile/tablet/desktop で撮る．見た目の変更を確認するときに使う．
disable-model-invocation: true
---

# theme-shot

`npm run dev` を起動した状態で実行する．

```bash
node .claude/skills/theme-shot/shot.mjs /            # 引数なしなら /
node .claude/skills/theme-shot/shot.mjs / /posts/ /about/
```

1 ページあたり 6 枚（3 幅 × 2 テーマ）を一時ディレクトリに書き，絶対パスを 1 行ずつ標準出力に出す．出たパスを Read で開く．

`BASE_URL` を渡せば `astro preview` や別ポートにも向けられる．

```bash
BASE_URL=http://localhost:4331 node .claude/skills/theme-shot/shot.mjs /
```

## このスクリプトが埋めている 3 つの穴

手で Playwright を書くと以下を外し，しかも**間違ったスクショが普通に撮れてしまう**ので気づけない．

- **desktop は 1441px 以上**．`src/styles/header.css` の tablet 帯が `max-width: 1440px` なので，1440 で撮るとヘッダー背景は tablet 版（`--bgTablet`）になる．
- **テーマはロード前に `localStorage` へ入れる**．`src/layouts/Layout.astro` の `is:inline` script が初期描画前に読むため，後から `data-theme` を付けても初期描画は変わらない．
- **`reducedMotion: 'reduce'` で撮る**．`src/styles/list-row.css` のスクロール連動アニメーションが有効なままだと，折り返しより下の `.row` が `opacity: 0` で写る．

## 前提

`playwright` は devDependency にある．ブラウザは `channel: 'chrome'` でシステムの Google Chrome を使うので `npx playwright install` は不要．
