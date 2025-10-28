# サイトマップガイド

## 概要

このプロジェクトでは，`@astrojs/sitemap` インテグレーションを利用して，サイトマップを自動生成しています．
サイトマップは，検索エンジンがサイトのコンテンツを効率的に発見し，クロールするのを助ける重要な役割を担います．

## 設定ファイル

サイトマップに関する設定は，`astro.config.mjs` ファイルで行います．

```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: SITE_URL, // 環境変数からサイトの URL を取得
  integrations: [
    sitemap({
      // サイトマップから除外するページを指定
      filter: (page) => !page.includes('/special/'),

      // 多言語対応 (i18n) の設定
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja-JP',
          en: 'en-US',
        },
      },
    }),
  ],
});
```

### 主な設定項目

- `filter`: 指定した条件に一致するページをサイトマップから除外します．このプロジェクトでは，[特別記事](./special-articles.md) (`/special/`) が検索エンジンにインデックスされないよう，除外設定を行っています．
- `i18n`: 多言語サイトに対応するための設定です．各言語のページが `hreflang` 属性によって関連付けられ，検索エンジンに正しく認識されます．

## 生成されるファイル

`npm run build` を実行すると，`dist/` ディレクトリ内に以下のサイトマップファイルが生成されます．

- `sitemap-index.xml`: すべてのサイトマップファイルをまとめるインデックスファイルです．
- `sitemap-0.xml`, `sitemap-1.xml`, ...: 実際のページURLが記載されたサイトマップファイルです．ページ数が多い場合は自動的に分割されます．

## `robots.txt` との連携

ビルド時に `scripts/generate-static-files.js` が実行され，`public/robots.txt` にサイトマップの URL が自動的に追記されます．
これにより，検索エンジンはサイトマップを簡単に見つけることができます．

```plaintext
# public/robots.txt (ビルド時に自動生成)
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap-index.xml
```

## 確認方法

### ローカル環境

1.  ビルドを実行します．
    ```bash
    npm run build
    ```
2.  `dist/` ディレクトリに生成されたファイルを確認します．

    ```bash
    # サイトマップインデックスを確認
    cat dist/sitemap-index.xml

    # 除外設定が機能しているか確認 (何も表示されなければ OK)
    cat dist/sitemap-0.xml | grep '/special/'
    ```

### 本番環境

デプロイ後，ブラウザや curl コマンドで実際にアクセスして確認できます．

`https://your-domain.com/sitemap-index.xml`

## Google Search Console への登録

サイトのクロールを促進するため，生成されたサイトマップを Google Search Console に登録することを推奨します．

1.  Google Search Console にログインします。
2.  対象のプロパティを選択し，メニューから「サイトマップ」を選びます．
3.  「新しいサイトマップの追加」に `sitemap-index.xml` と入力し，送信します．
