#!/usr/bin/env node

/**
 * ビルド時に環境変数から静的ファイルを生成するスクリプト
 * public/_headers と public/robots.txt を動的に生成
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// .envファイルを読み込み
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// 環境変数から取得（デフォルト値付き）
const SITE_URL = process.env.SITE_URL || 'https://example.com';
const DATA_BASE_URL = process.env.PUBLIC_DATA_BASE_URL || 'https://data.example.com';

// URLからドメイン部分を抽出
const dataOrigin = new URL(DATA_BASE_URL).origin;

console.log('🔧 Generating static files...');
console.log(`   SITE_URL: ${SITE_URL}`);
console.log(`   DATA_BASE_URL: ${DATA_BASE_URL}`);

// _headers ファイルを生成
const headersContent = `# Cloudflare Pages用のセキュリティヘッダー設定
# このファイルはビルド時に自動生成されます（scripts/generate-static-files.js）

# 特別記事ページのセキュリティ設定
/special/*
  X-Robots-Tag: noindex, nofollow, noarchive
  Referrer-Policy: no-referrer
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self' ${dataOrigin}

# 通常ページのセキュリティヘッダー
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`;

const headersPath = join(publicDir, '_headers');
writeFileSync(headersPath, headersContent, 'utf-8');
console.log('✅ Generated: public/_headers');

// robots.txt ファイルを生成
const robotsContent = `User-agent: *
Allow: /

# 特別記事を検索エンジンからブロック
Disallow: /special/

# サイトマップ
Sitemap: ${SITE_URL}/sitemap-index.xml
`;

const robotsPath = join(publicDir, 'robots.txt');
writeFileSync(robotsPath, robotsContent, 'utf-8');
console.log('✅ Generated: public/robots.txt');

console.log('🎉 Static files generated successfully!');
