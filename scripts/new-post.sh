#!/bin/bash

# 新しい記事を作成するスクリプト
# Usage: make new SLUG=my-post-title

set -e

# 引数チェック
if [ -z "$1" ]; then
  echo "❌ スラッグ名を指定してください"
  echo "   使用方法: make new SLUG=my-post-title"
  exit 1
fi

SLUG_BASE="$1"
TODAY=$(date +%Y-%m-%d)

# 今日の日付の記事を検索
CONTENT_DIR="src/content/posts"
EXISTING_POSTS=$(ls -1 "$CONTENT_DIR" 2>/dev/null | grep "^${TODAY}" || true)

# 連番を決定
if [ -z "$EXISTING_POSTS" ]; then
  # 今日の記事がない → 01
  SEQUENCE="01"
else
  # 今日の記事がある → 最大の連番 + 1
  MAX_SEQ=$(echo "$EXISTING_POSTS" | sed -E "s/^${TODAY}-([0-9]+)_.*/\1/" | sort -n | tail -1)
  NEXT_SEQ=$((10#$MAX_SEQ + 1))
  SEQUENCE=$(printf "%02d" $NEXT_SEQ)
fi

# 最終的なスラッグ
FULL_SLUG="${TODAY}-${SEQUENCE}_${SLUG_BASE}"

# ファイルとディレクトリのパス
POST_FILE="${CONTENT_DIR}/${FULL_SLUG}.mdx"
IMAGE_DIR="public/posts/images/${FULL_SLUG}"

# 既に存在する場合は終了
if [ -f "$POST_FILE" ]; then
  echo "❌ 記事が既に存在します: $POST_FILE"
  exit 1
fi

# テンプレートを作成
cat > "$POST_FILE" << EOF
---
title: ${SLUG_BASE}
date: ${TODAY}
tags: ['news']
description: ''
---

# ${SLUG_BASE}

記事の内容をここに書きます．

![画像の説明](@@/${FULL_SLUG}/image.webp)
EOF

# 画像ディレクトリを作成
mkdir -p "$IMAGE_DIR"

# 結果を表示
echo "✅ 記事を作成しました！"
echo ""
echo "📝 記事ファイル:"
echo "   $POST_FILE"
echo ""
echo "🖼️ 画像ディレクトリ:"
echo "   $IMAGE_DIR"
echo ""
echo "📋 次のステップ:"
echo "   1. 記事を編集: $POST_FILE"
echo "   2. 画像を配置: $IMAGE_DIR/"
echo "   3. 記事を確認: npm run dev"
echo "   4. 画像を R2 にアップロード: make upload-images SLUG=$FULL_SLUG"
echo "   5. 記事を Git リポジトリに Push: git add $POST_FILE && git commit -m 'Add: $SLUG_BASE'..."
echo ""

# パスをクリップボードにコピー (macOS の場合)
if command -v pbcopy &> /dev/null; then
  echo "$POST_FILE" | pbcopy
  echo "💡 記事ファイルのパスをクリップボードにコピーしました"
fi
