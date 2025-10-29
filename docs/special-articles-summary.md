# 特別記事機能 - 実装サマリー

このドキュメントは，生成 AI による特別記事機能の実装に関する技術的なサマリーです．

## ✅ 機能ハイライト

### 1. **アーキテクチャ**

- ✅ SSG (通常記事) とCSR (特別記事) のハイブリッド構成を採用．
- ✅ データ配信サイト (Cloudflare Pages) から JSON 形式で記事データを取得．
- ✅ ビルド時に `index.json` を取得し，記事のパスに対応する静的 HTML を生成．

### 2. **検索エンジン対策**

- ✅ `<meta name="robots" content="noindex, nofollow, noarchive">` を設定し，インデックスを防止．
- ✅ `robots.txt` で `/special/` パスへのクロールを禁止．
- ✅ サイトマップから特別記事を除外 (@astrojs/sitemap)．
- ✅ データ配信サイトも `X-Robots-Tag` HTTPヘッダーでインデックスをブロック．

### 3. **セキュリティ**

- ✅ UUID v4 を使用し，記事URLを推測困難に．
- ✅ Content Security Policy (CSP) を設定し，許可されたドメインからのリソースのみを読み込み．
- ✅ CORS設定 (オリジンを `*` に設定)．
- ✅ `X-Frame-Options`, `X-Content-Type-Options` などのセキュリティヘッダーを設定．

### 4. **パフォーマンス**

- ✅ 事前ビルドによる静的HTML生成 (SSG) で高速な初回読み込みを実現．
- ✅ JSONデータに対して適切なキャッシュ制御 (Cache-Control) を設定．
- ✅ 画像の遅延読み込み (lazy loading) を実装．
- ✅ 外部リンクを自動的に `target="_blank"` に変換．

### 5. **スタイル**

- ✅ 通常記事と一貫性のあるスタイルを適用．
- ✅ レスポンシブデザインに対応．
- ✅ コードハイライト，引用，画像などの要素に適切なスタイルを適用．
- ✅ Twitterの埋め込みツイートをサポート．

## 📁 ファイル構成

### メインサイト (`my_web_site`)

```
src/
├── pages/
│   └── special/
│       └── [slug].astro          # 特別記事ページ (CSR)
├── layouts/
│   └── Layout.astro              # noIndex propを追加
└── content/
    └── posts/                    # 通常記事 (SSG)

scripts/
└── generate-static-files.js      # _headers, robots.txt を動的生成

public/
├── _headers                      # 動的生成 (.gitignore対象)
└── robots.txt                    # 動的生成 (.gitignore対象)

astro.config.mjs                  # trailingSlash: 'always' を設定
```

### データサイト (`special-articles-data-example`)

```
public/                           # Cloudflare Pages のデプロイ対象
├── _headers                      # CORS, セキュリティヘッダーを設定
├── robots.txt                    # 検索エンジンをブロック
└── articles/
    ├── index.json                # 記事のスラッグ一覧のみ ({"slugs": [...]}})
    └── [uuid].json               # 個別の記事データ (タイトル / 本文 / カテゴリ等)

scripts/                          # 記事作成用スクリプト
├── new-article.sh
└── md-to-json.sh

docs/                             # ドキュメント
```

## ⚙️ 環境変数

| 変数名                 | 設定場所                 | 必須 | 説明                                  |
| ---------------------- | ------------------------ | ---- | ------------------------------------- |
| `PUBLIC_DATA_BASE_URL` | GitHub Actions Variables | ✅   | データ配信サイトのベースURL．         |
| `SITE_URL`             | GitHub Actions Variables | ✅   | メインサイトのURL．                   |
| `IMAGE_BASE_URL`       | GitHub Actions Variables | -    | 画像配信用CDNなどのベースURL (任意)． |

## 🔄 ワークフロー

### 新規記事の作成フロー

1.  **データサイトで記事を作成**

    ```bash
    cd special-articles-data-example
    ./scripts/md-to-json.sh article.md "記事のタイトル" "カテゴリ" "#color"
    ```

2.  **`index.json` に記事情報を登録** (自動または手動)

3.  **データサイトをデプロイ**

    ```bash
    git add .
    git commit -m "Add article: 記事のタイトル"
    git push
    ```

4.  **メインサイトを再ビルド** (重要)

    ```bash
    cd my_web_site
    git commit --allow-empty -m "Rebuild for new special article"
    git push
    ```

5.  **記事にアクセス**
    `https://your-domain.com/special/[uuid]/`

## ⚠️ 注意点

### 1. **再ビルドの必要性**

- データサイトに新しい記事を追加した後は，メインサイトの再ビルドが必要です．
- **理由**: ビルド時に `index.json` をフェッチし，各記事へのパスを静的に生成するためです．

### 2. **トレイリングスラッシュ**

- URLの末尾には常にスラッシュが必要です (`/special/[uuid]/`)．
- `astro.config.mjs` で `trailingSlash: 'always'` を設定済みです．
- スラッシュなしのURLへアクセスした場合，308リダイレクトされます．

### 3. **CORS設定**

- `Access-Control-Allow-Origin: *` を使用しています．
- **理由**: `Content-Type` ヘッダーを含まない単純なGETリクエストに限定することで，プリフライトリクエスト (OPTIONS) を回避するためです．
- **セキュリティ**: URLが推測困難なUUIDであり，かつrobots.txtでクロールを禁止しているため，リスクは限定的です．

### 4. **Content-Typeヘッダー**

- クライアントからデータサイトへのfetchリクエストに `Content-Type` ヘッダーを**含めないでください**．
- **理由**: このヘッダーが含まれるとプリフライトリクエストが発生し，Cloudflare Pagesが405エラー (Method Not Allowed) を返すためです．

### 5. **公開範囲**

- この機能は「非公開」ではなく「検索エンジンにインデックスされない」状態を作るものです．
- URLを知っていれば誰でもアクセス可能です．
- 厳密なアクセス制限が必要な場合は，認証機能の導入を検討してください．

## 🔧 トラブルシューティング

### CORSエラーが発生する

1.  データサイトの `public/_headers` ファイルの内容を確認してください．
2.  意図しないヘッダーの重複がないか確認してください．
3.  クライアントのfetchリクエストに不要なヘッダー (例: `Content-Type`) が含まれていないか確認してください．

### 404エラーで記事が表示されない

1.  メインサイトを再ビルドしたか確認してください．
2.  環境変数 `PUBLIC_DATA_BASE_URL` が正しく設定されているか確認してください．
3.  データサイトの `index.json` に記事が登録されているか，また `[uuid].json` ファイルが存在するか確認してください．
4.  トレイリングスラッシュを付けたURLでアクセスしているか確認してください．

### スタイルが適用されない

- グローバルスタイル (`<style is:global>`) が正しく読み込まれているか確認してください．
- ブラウザの開発者ツールで，ビルド時のエラーログを確認してください．

## 📚 関連ドキュメント

- **メインガイド**: `docs/special-articles.md`
- **環境変数**: `docs/environment-variables.md`
- **サイトマップ**: `docs/sitemap-guide.md`
- **このサマリー**: `docs/special-articles-summary.md`

## 🎯 実装方針

1.  **シンプルさの重視**: ビルドプロセスを過度に複雑にしない．
2.  **環境変数による動的制御**: 設定のハードコーディングを避ける．
3.  **CI/CDによる自動化**: GitHub Actionsを活用し，環境変数の管理を容易にする．
4.  **セキュリティとパフォーマンスのバランス**: 実用的な範囲でベストプラクティスを適用する．

## 📝 今後の改善案

- [ ] 記事削除時の自動クリーンアップ処理
- [ ] プレビュー機能の実装
- [ ] 記事の有効期限を設定する機能
- [ ] パスワード保護などのアクセス制限機能
- [ ] 管理用の記事一覧ページの作成
