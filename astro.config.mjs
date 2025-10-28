// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// @ts-ignore - .mjsファイルの型定義なし
import { remarkImageUrl } from './src/plugins/remark-image-url.mjs';

// .envファイルを読み込み
dotenv.config();

// Standard ML文法の読み込み
const __dirname = dirname(fileURLToPath(import.meta.url));
const smlGrammar = JSON.parse(
  readFileSync(join(__dirname, 'src/grammars/sml.tmLanguage.json'), 'utf-8')
);

// 環境変数の読み込み
const SITE_URL = process.env.SITE_URL || 'https://example.com';
const NGROK_HOST = process.env.NGROK_HOST;

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      // 特別記事（/special/*）をサイトマップから除外
      filter: (page) => !page.includes('/special/'),
      // i18n対応
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja-JP',
          en: 'en-US',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkImageUrl],
    shikiConfig: {
      theme: 'github-dark',
      langs: [smlGrammar],
      wrap: true,
    },
  },
  server: {
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  vite: {
    server: {
      host: true,
      strictPort: false,
      ...(NGROK_HOST && {
        hmr: {
          clientPort: 443,
          host: NGROK_HOST,
        },
        allowedHosts: [NGROK_HOST, 'localhost', '127.0.0.1'],
      }),
    },
  },
});
