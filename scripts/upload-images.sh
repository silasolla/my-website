#!/bin/bash

# Wrangler を使って R2 に画像をアップロード
#
# Usage:
#   make upload-images SLUG=2025-10-26-01_my-post
#   make upload-images-dry SLUG=2025-10-26-01_my-post

set -e

IMAGES_DIR="public/posts/images"
BUCKET_NAME="${R2_BUCKET_NAME}"
DRY_RUN=false
TARGET_SLUG=""

# 引数を解析
for arg in "$@"; do
  if [[ "$arg" == "--dry-run" ]]; then
    DRY_RUN=true
  else
    TARGET_SLUG="$arg"
  fi
done

if [ -z "$BUCKET_NAME" ]; then
  echo "❌ R2_BUCKET_NAME environment variable is not set"
  exit 1
fi

# 画像ディレクトリの存在確認
if [ ! -d "$IMAGES_DIR" ]; then
  echo "❌ 画像ディレクトリが見つかりません: $IMAGES_DIR"
  exit 1
fi

# スラッグが指定されているか確認
if [ -z "$TARGET_SLUG" ]; then
  echo "❌ SLUG を指定してください"
  echo ""
  echo "Usage:"
  echo "  make upload-images SLUG=2025-10-26-01_my-post"
  echo "  make upload-images-dry SLUG=2025-10-26-01_my-post"
  exit 1
fi

# アップロード対象のディレクトリを確認
TARGET_DIR="$IMAGES_DIR/$TARGET_SLUG"
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ 指定されたスラッグのディレクトリが見つかりません: $TARGET_DIR"
  exit 1
fi

echo "🚀 R2 画像アップロードを開始します (対象: $TARGET_SLUG)..."

if $DRY_RUN; then
  echo "📝 DRY RUN mode: 実際のアップロードは行いません"
fi
echo ""

uploaded=0
skipped=0

# 画像ディレクトリ内の全ファイルを処理
# プロセス置換を使ってサブシェル問題を回避
while IFS= read -r file; do
  # 相対パスを取得: 2025-10-25-01_welcome/hero.jpg
  relative_path="${file#$IMAGES_DIR/}"
  key="posts/$relative_path"

  if $DRY_RUN; then
    echo "📤 アップロード対象: $key"
    uploaded=$((uploaded + 1))
  else
    # npx wrangler で R2 にアップロード
    # --cache-control で1年間キャッシュ
    if npx wrangler r2 object put "$BUCKET_NAME/$key" \
       --remote \
       --file="$file" \
       --content-type="$(file -b --mime-type "$file")" \
       --cache-control="public, max-age=31536000, immutable" 2>/dev/null; then
      echo "✅ Success: $key"
      uploaded=$((uploaded + 1))
    else
      echo "⏭️ Skiped or Error: $key"
      skipped=$((skipped + 1))
    fi
  fi
done < <(find "$TARGET_DIR" -type f)

echo ""
echo "📊 結果:"
echo "   ✅ Uploaded: $uploaded"
echo "   ⏭️ Skiped: $skipped"

if $DRY_RUN; then
  echo ""
  echo "💡 実際にアップロードするには: make upload-images SLUG=$TARGET_SLUG"
fi

