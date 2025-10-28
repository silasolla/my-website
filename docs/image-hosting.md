# 画像ホスティング設計

## 概要

記事の画像は Cloudflare R2 にホストし，カスタムドメイン (例：`https://image.example.com/posts/`) から配信します．

## ディレクトリ構造

```
public/posts/images/
├── YYYY-MM-DD-NN_post-slug/
│   ├── hero.jpg
│   └── diagram.png
└── YYYY-MM-DD-NN_another-post/
    ├── screenshot-01.png
    └── screenshot-02.png
```

各記事のスラッグ名でディレクトリを作成し，その中に画像を配置します．

## 記事での使用方法

Markdownファイル内で`@@/`記法を使います：

```markdown
![ヒーロー画像](@@/YYYY-MM-DD-NN_post-slug/hero.jpg)
```

remarkプラグインが自動的に適切なURLに変換します：

- 開発環境：`/posts/images/YYYY-MM-DD-NN_post-slug/hero.jpg` (ローカル)
- 本番環境：`https://image.example.com/posts/YYYY-MM-DD-NN_post-slug/hero.jpg` (R2)

## R2 へのアップロード

### 重要：画像はGitにコミットしない

画像ファイルは**Gitリポジトリには含めず**，ローカルからR2に直接アップロードします：

```
作業フロー:
1. public/posts/images/ に画像を配置 (ローカルのみ)
2. ローカルから直接R2にアップロード
3. Markdownに画像パスを記述
4. Markdownファイルのみをコミット
5. GitHub Actionsはビルドのみ実行 (R2から画像を読み込む)
```

この設計のメリット：

**Gitリポジトリサイズを抑制**：画像はR2にのみ保存，Gitには含めない
**リポジトリを軽量に保つ**：静的サイトは軽量，画像は別ホスト
**大量の画像を扱える**：R2のストレージ制限は実質無制限
**高速な配信**：Cloudflare CDNによるグローバル配信
**低コスト**：R2は転送料金無料 (最初の10GBストレージも無料)

### アップロード手順

**前提条件**：`.env` ファイルにバケット名を設定：

```env
R2_BUCKET_NAME=your-bucket-name
```

認証は`wrangler login`でブラウザ経由で行います (APIトークン不要)．

**アップロード実行**：

```bash
# 0. 初回のみ：Wranglerで認証
make wrangler-auth

# 1. Dry-runで確認 (実際にはアップロードしない)
make upload-images-dry

# 2. 問題なければ実際にアップロード
make upload-images

# 3. Markdownファイルをコミット (画像はコミットしない)
git add src/content/posts/YYYY-MM-DD-NN_new-post.md
git commit -m "Add new post"
git push
```

### 開発環境での確認

ローカルで記事を書く際：

1. `public/posts/images/` に画像を配置
2. `.gitignore` により，この画像はGit管理外
3. 開発サーバー (`npm run dev`) では，ローカルの画像が表示される
4. R2にアップロード後，`IMAGE_BASE_URL=https://image.example.com` を設定すればR2からの表示も確認可能

## URLの動作

### 開発環境 (`IMAGE_BASE_URL` が空)

```typescript
getPostImageUrl('YYYY-MM-DD-NN_post-slug/hero.jpg');
// → "/posts/images/YYYY-MM-DD-post-slug/hero.jpg"
```

ローカルの `public/posts/images/` から読み込み．

### 本番環境 (`IMAGE_BASE_URL=https://image.example.com`)

```typescript
getPostImageUrl('YYYY-MM-DD-NN_post-slug/hero.jpg');
// → "https://image.example.com/posts/YYYY-MM-DD-NN_post-slug/hero.jpg"
```

Cloudflare R2から読み込み．

## アップロードスクリプトの動作

1. `public/posts/images/` 内の全ファイルをスキャン
2. Wranglerコマンドで各ファイルをアップロード
3. Content-Typeを自動判定
4. Cache-Controlヘッダーを設定 (1年間キャッシュ，immutable)

既存ファイルは上書きされます．変更していない画像も再アップロードされますが，R2の操作コストは非常に低いため問題ありません．

## Cloudflare R2の設定

### 1. R2バケットの作成

Cloudflareダッシュボード → R2 → Create Bucket

### 2. カスタムドメインの設定

1. R2バケット → Settings → Public Access
2. Custom Domains → Connect Domain
3. カスタムドメイン (例：`image.example.com`) を設定
4. DNSレコードが自動的に追加される

### 3. Wrangler認証

```bash
# ローカルで初回のみ実行
make wrangler-auth
```

ブラウザが開くので，Cloudflareアカウントでログインします．

### 4. GitHub Variablesの設定 (オプション)

本番ビルドでR2から画像を読み込む場合：

リポジトリ → Settings → Variables → Actions → New repository variable

- `IMAGE_BASE_URL`: `https://image.example.com`

## 画像の最適化

### 推奨仕様

- **フォーマット**: WebPまたはJPEG
- **最大幅**: 1920px (記事本文用)，2400px (ヒーロー画像)
- **圧縮**: 80-85%品質
- **ファイルサイズ**: 200KB以下を目標

### 最適化ツール

```bash
# ImageMagickを使用した例
convert input.jpg -resize 1920x -quality 85 output.jpg

# WebPに変換
cwebp -q 85 input.jpg -o output.webp
```

## トラブルシューティング

### 画像が表示されない

1. **開発環境**: `public/posts/images/` に画像があるか確認
2. **本番環境**: R2にアップロードされているか確認
3. `IMAGE_BASE_URL` 環境変数が正しく設定されているか確認

### アップロードエラー

```bash
# Dry-runで確認
npm run upload-images:dry

# エラーメッセージを確認
npm run upload-images 2>&1 | tee upload.log
```

### R2の認証エラー

- APIトークンの権限 (Object Read & Write) を確認
- トークンの有効期限を確認

## コスト試算

Cloudflare R2の料金 (2025年10月時点)：

- **ストレージ**: $0.015/GB/月 (最初の10GBは無料)
- **Class A操作** (書き込み): $4.50/100万リクエスト
- **Class B操作** (読み込み): $0.36/100万リクエスト
- **データ転送**: 無料 (Cloudflareネットワークから)

### 例：月間10万PV，画像平均2枚/ページの場合

- ストレージ: 5GB → 無料
- 読み込み: 20万リクエスト → $0.07
- 書き込み: 100記事×5画像 = 500リクエスト → ほぼ無料

**月額合計: 約$0.07 (約10円)**
