# 記事作成ワークフロー

記事の作成から公開までの一連の流れを説明します．

## 1. 新しい記事を作成

```bash
make new SLUG=my-article-title
```

### 何が起きるか

1. **今日の日付で記事番号を自動決定**
   - 今日の記事がない場合：`2025-10-26-01_my-article-title`
   - すでにある場合：`2025-10-26-02_my-article-title` (連番が増える)

2. **以下が自動生成される**

   ```
   src/content/posts/2025-10-26-01_my-article-title.md
   public/posts/images/2025-10-26-01_my-article-title/
   ```

3. **テンプレートの中身**

   ```markdown
   ---
   title: my-article-title
   date: 2025-10-26
   tags: ['news']
   description: ''
   ---

   # my-article-title

   記事の内容をここに書きます．

   ![画像の説明](@@/2025-10-26-01_my-article-title/image.webp)
   ```

   **注意：** `lang` フィールドは未定義 (両言語版に表示されます)

4. **記事ファイルのパスがクリップボードにコピーされる** (macOS)

## 2. 記事を書く

### 2.1 テキストを編集

```bash
# クリップボードからパスを貼り付けてエディタで開く
code src/content/posts/2025-10-26-01_my-article-title.md
```

記事の内容を書きます：

````markdown
---
title: Standard MLを始めよう
date: 2025-10-26
tags: ['tech'] # ← タグを変更
description: 'Standard MLの基本的な使い方を紹介します' # ← 説明を追加
# lang: 'ja' # ← 省略可能 (未定義の場合は両言語版に表示)
---

# Standard MLを始めよう

Standard MLは関数型プログラミング言語です．

## インストール

```sml
fun factorial 0 = 1
  | factorial n = n * factorial (n - 1)
```
````

## 実行例

![実行結果のスクリーンショット](@@/2025-10-26-01_standard-ml-intro/result.png)

<!-- PC版で画像サイズを調整したい場合はファイルを mdx にして Astro コンポーネントをインポートして使用 -->
<Img src="@@/2025-10-26-01_standard-ml-intro/diagram.png" alt="図解" width="400" caption="図解" />

````

### 2.2 画像を配置

```bash
# 画像ディレクトリに画像をコピー
cp ~/Downloads/result.png public/posts/images/2025-10-26-01_my-article-title/
````

ディレクトリ構造：

```
public/posts/images/2025-10-26-01_my-article-title/
├── result.png
└── diagram.svg
```

**重要：この画像はGitにコミットしません** (`.gitignore`で除外済み)

### 2.3 ローカルで確認

```bash
npm run dev
```

ブラウザで http://localhost:4321 を開いて記事を確認します．

画像は`public/posts/images/`から読み込まれます．

## 3. 画像をR2にアップロード

### 3.1 初回のみ：Wrangler認証

```bash
make wrangler-auth
```

ブラウザが開くので，Cloudflareアカウントでログインします．

### 3.2 Dry-runで確認 (推奨)

```bash
make upload-images-dry SLUG=2025-10-26-01_my-article-title
```

出力例：

```
🚀 R2 画像アップロードを開始します (対象: 2025-10-26-01_my-article-title)...
📝 DRY RUN mode: 実際のアップロードは行いません

📤 アップロード予定: posts/2025-10-26-01_my-article-title/result.png
📤 アップロード予定: posts/2025-10-26-01_my-article-title/diagram.svg

📊 結果:
   ✅ アップロード: 2
   ⏭️ スキップ: 0

💡 実際にアップロードするには: make upload-images SLUG=2025-10-26-01_my-article-title
```

### 3.3 実際にアップロード

```bash
make upload-images SLUG=2025-10-26-01_my-article-title
```

出力例：

```
🚀 R2 画像アップロードを開始します (対象: 2025-10-26-01_my-article-title)...

✅ アップロード完了: posts/2025-10-26-01_my-article-title/result.png
✅ アップロード完了: posts/2025-10-26-01_my-article-title/diagram.svg

📊 結果:
   ✅ アップロード: 2
   ⏭️ スキップ: 0
```

**ヒント：** スラッグは `make new` の出力に表示されるので，コピー＆ペーストできます．

### 画像のURL

R2にアップロードされた画像のURL：

```
https://image.example.com/posts/2025-10-26-01_my-article-title/result.png
https://image.example.com/posts/2025-10-26-01_my-article-title/diagram.svg
```

## 4. 記事をコミット・プッシュ

### 4.1 記事ファイル "のみ" をコミット

```bash
# 記事ファイルをコミット (画像は含めない)
git add src/content/posts/2025-10-26-01_my-article-title.md
git commit -m "Add: Standard MLの記事を追加"
git push
```

### 4.2 何がGitに含まれるか・含まれないか

**Gitに含まれる (コミットする)：**

- `src/content/posts/2025-10-26-01_my-article-title.md`

**Gitに含まれない (`.gitignore`で除外)：**

- `public/posts/images/2025-10-26-01_my-article-title/` ← 画像はR2のみ

### 4.3 GitHub Actionsが自動ビルド

プッシュすると自動的に：

1. CI 実行 (フォーマットチェック，型チェックなど)
2. ビルド実行 (`IMAGE_BASE_URL=https://image.example.com`)
3. `@@/`記法が`https://image.example.com/posts/...`に変換される
4. Cloudflare Pagesにデプロイ

**CI が失敗した場合，デプロイは実行されません．**

## 5. 本番環境で確認

https://example.com で公開された記事を確認します．

画像はR2から配信されます：

```
記事HTML: Cloudflare Pages
画像: Cloudflare R2 (CDN)
```

## FAQ

### Q1: 記事の画像を変更したい

```bash
# 1. ローカルで画像を差し替え
cp ~/Downloads/new-image.png public/posts/images/2025-10-26-01_my-article-title/result.png

# 2. R2に再アップロード (上書き)
make upload-images SLUG=2025-10-26-01_my-article-title

# 3. 記事ファイルに変更がない場合はコミット不要
#    記事の説明文などを変更した場合のみコミット
```

### Q2: 画像を削除したい

```bash
# ローカルから削除
rm public/posts/images/2025-10-26-01_my-article-title/old-image.png

# R2からも削除 (手動)
npx wrangler r2 object delete your-bucket-name/posts/2025-10-26-01_my-article-title/old-image.png
```

### Q3: 記事を削除したい

```bash
# 1. 記事ファイルを削除
git rm src/content/posts/2025-10-26-01_my-article-title.md
git commit -m "Remove: 不要な記事を削除"
git push

# 2. 画像ディレクトリを削除 (ローカル)
rm -rf public/posts/images/2025-10-26-01_my-article-title

# 3. R2から画像を削除 (手動，オプション)
npx wrangler r2 object delete your-bucket-name/posts/2025-10-26-01_my-article-title/ --recursive
```

### Q4: 同じ日に複数記事を書きたい

```bash
# 1つ目
make new SLUG=morning-post
# → 2025-10-26-01_morning-post

# 2つ目 (同じ日)
make new SLUG=afternoon-post
# → 2025-10-26-02_afternoon-post

# 3つ目 (同じ日)
make new SLUG=evening-post
# → 2025-10-26-03_evening-post
```

連番が自動的に増えます．

画像のアップロードは記事ごとに個別に実行：

```bash
make upload-images SLUG=2025-10-26-01_morning-post
make upload-images SLUG=2025-10-26-02_afternoon-post
make upload-images SLUG=2025-10-26-03_evening-post
```

### Q5: 画像なしの記事を書きたい

```markdown
---
title: テキストだけの記事
date: 2025-10-26
tags: ['news']
description: ''
---

# テキストだけの記事

画像を使わない記事です．
```

画像を配置しない場合は，`make upload-images` をスキップして直接コミット・プッシュしてください．

### Q6: PC版で画像サイズを細かく調整したい

**方法1: Markdown記法 (シンプル)**

通常のMarkdown記法では，PC版で最大700pxに制限されます：

```markdown
![画像の説明](@@/2025-10-26-01_my-post/image.webp)
```

**方法2: MDXを使う (幅を指定したい場合)**

画像サイズを細かく調整したい場合は，記事を`.mdx`ファイルにして`Img`コンポーネントを使用します：

1. **ファイル名を`.mdx`に変更**
   - 例：`2025-10-26-01_my-post.md` → `2025-10-26-01_my-post.mdx`

2. **記事の冒頭でコンポーネントをインポート**

```mdx
---
title: 記事タイトル
date: 2025-10-26
tags: ['tech']
---

import Img from '@/components/Img.astro';

# 記事タイトル

通常のMarkdown記法も使えます：
![画像の説明](@@/2025-10-26-01_my-post/image.webp)

幅を指定したい場合：

<Img src="@@/2025-10-26-01_my-post/diagram.webp" alt="図解" width="400" />

キャプションを付ける：

<Img
  src="@@/2025-10-26-01_my-post/result.webp"
  alt="実行結果"
  caption="図1: プログラムの実行結果"
  width="400"
/>

パーセント指定も可能：

<Img src="@@/2025-10-26-01_my-post/chart.webp" alt="チャート" caption="グラフ" width="50%" />
```

**注意：**

- `.mdx`ファイルでは通常のMarkdown記法とAstroコンポーネントの両方が使えます
- `width`はピクセル値 (`400`) またはパーセント (`"50%"`) で指定
- `caption`を指定すると画像の下にキャプションが表示されます
- SP版 (モバイル) では自動的に画面幅に調整されます (最小75%)
- 画像サイズ調整が不要な記事は`.md`のままでOK

## ワークフローまとめ

```
1. make new SLUG=title
   ↓
2. 記事を書く + 画像を配置 (public/posts/images/)
   ↓
3. npm run dev でローカル確認
   ↓
4. make upload-images SLUG=YYYY-MM-DD-NN_title で画像をR2へ
   ↓
5. git add/commit/push で記事をGitHubへ (画像は含めない)
   ↓
6. GitHub Actionsが自動デプロイ
   ↓
7. 本番環境で公開🎉
```

**ポイント：**

- 画像はローカル → R2へ直接アップロード (**スラッグ指定必須**)
- 記事ファイルはGit → Cloudflare Pagesへ
- **画像はGitに含めない** (リポジトリサイズを抑える)
- 画像なしの記事は手順4をスキップ

## 多言語対応

### 基本動作

記事の `lang` フィールドで表示言語を制御します：

| `lang` の値 | 日本語版に表示 | 英語版に表示 |
| ----------- | -------------- | ------------ |
| 未定義      | ✅             | ✅           |
| `'ja'`      | ✅             | ❌           |
| `'en'`      | ❌             | ✅           |

**デフォルト (推奨):** `lang` を指定しない → 両言語版に表示される

### 運用例

#### パターン1：日本語記事のみ (デフォルト)

```yaml
# src/content/posts/2025-10-26-01_welcome.md
---
title: 'このサイトを新しくしました'
# lang 未指定 → 両言語版に表示
---
```

#### パターン2：あとから英語版を追加

1. **日本語版に言語を明示**:

   ```yaml
   # src/content/posts/2025-10-26-01_welcome.md
   ---
   title: 'このサイトを新しくしました'
   lang: 'ja' # ← 追加
   ---
   ```

2. **英語版を作成**:

   ```yaml
   # src/content/posts/2025-10-26-01_welcome.en.md
   ---
   title: 'Site Renewed'
   lang: 'en'
   ---
   ```

#### パターン3：最初から言語を分ける

```yaml
# 日本語のみ
lang: 'ja'

# 英語のみ
lang: 'en'
```

### 注意事項

- **スラッグ名**：同じでも異なっていてもOK (例：`welcome.md` と `welcome.en.md`)
- **画像の共有**：両言語版で同じ画像パスを使用可能 (`@@/2025-10-26-01_welcome/image.webp`)
- **RSS**：日本語版RSSには `lang: 'ja'` または未定義の記事のみ含まれます
