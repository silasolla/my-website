#!/usr/bin/env node

/**
 * ビルド時に環境変数から静的ファイルを生成するスクリプト
 * public/_headers, public/robots.txt, public/.assetsignore を動的に生成
 */

import { cpSync, mkdirSync, writeFileSync } from 'fs';
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
const headersContent = `# Cloudflare Workers 用のセキュリティヘッダー設定
# このファイルはビルド時に自動生成されます（scripts/generate-static-files.js）

# 特別記事ページのセキュリティ設定
/special/*
  X-Robots-Tag: noindex, nofollow, noarchive
  Referrer-Policy: no-referrer
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://platform.twitter.com; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self' ${dataOrigin} https://static.cloudflareinsights.com; frame-src https://platform.twitter.com https://syndication.twitter.com

# 通常ページのセキュリティヘッダー
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

# ビルド済み画像・フォント (Astro が生成)
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

# KaTeX (数式記事のみ link で読み込み)
/vendor/*
  Cache-Control: public, max-age=31536000, immutable

# 静的画像
/*.webp
  Cache-Control: public, max-age=604800
/*.jpg
  Cache-Control: public, max-age=604800
/*.png
  Cache-Control: public, max-age=604800
/profile/*
  Cache-Control: public, max-age=604800
`;

const headersPath = join(publicDir, '_headers');
writeFileSync(headersPath, headersContent, 'utf-8');
console.log('✅ Generated: public/_headers');

const katexDistDir = join(__dirname, '..', 'node_modules', 'katex', 'dist');
const vendorDir = join(publicDir, 'vendor');
mkdirSync(vendorDir, { recursive: true });
cpSync(join(katexDistDir, 'katex.min.css'), join(vendorDir, 'katex.min.css'));
cpSync(join(katexDistDir, 'fonts'), join(vendorDir, 'fonts'), { recursive: true });
console.log('✅ Generated: public/vendor/katex.min.css');

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

// .assetsignore ファイルを生成
const assetsIgnoreContent = `**/.DS_Store
**/node_modules
**/.git
`;

const assetsIgnorePath = join(publicDir, '.assetsignore');
writeFileSync(assetsIgnorePath, assetsIgnoreContent, 'utf-8');
console.log('✅ Generated: public/.assetsignore');

console.log('🎉 Static files generated successfully!');
