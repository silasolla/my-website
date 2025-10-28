.PHONY: help new wrangler-auth upload-images upload-images-dry

# R2_BUCKET_NAME は .env から読み込むか, 環境変数で設定
include .env
export

help:
	@echo "Available targets:"
	@echo "  make new SLUG=title             - 新しい記事を作成"
	@echo "  make wrangler-auth              - Wrangler でログイン (ブラウザ認証)"
	@echo "  make upload-images SLUG=...     - 記事の画像を R2 にアップロード"
	@echo "  make upload-images-dry SLUG=... - アップロードの dry-run"

new:
	@if [ -z "$(SLUG)" ]; then \
		echo "❌ SLUG を指定してください"; \
		echo "   Usage: make new SLUG=my-post-title"; \
		exit 1; \
	fi
	@./scripts/new-post.sh "$(SLUG)"

wrangler-auth:
	@echo "🔐 認証を開始します..."
	@echo "   ブラウザが開くので Cloudflare アカウントで認証してください"
	npx wrangler login

upload-images:
	@if [ -z "$(R2_BUCKET_NAME)" ]; then \
		echo "❌ R2_BUCKET_NAME が設定されていません"; \
		echo "   .env ファイルに R2_BUCKET_NAME=your-bucket-name を追加してください"; \
		exit 1; \
	fi
	@./scripts/upload-images.sh $(SLUG)

upload-images-dry:
	@if [ -z "$(R2_BUCKET_NAME)" ]; then \
		echo "❌ R2_BUCKET_NAME が設定されていません"; \
		echo "   .env ファイルに R2_BUCKET_NAME=your-bucket-name を追加してください"; \
		exit 1; \
	fi
	@./scripts/upload-images.sh $(SLUG) --dry-run
