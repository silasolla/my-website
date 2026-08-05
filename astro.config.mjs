// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import githubDark from '@shikijs/themes/github-dark';
import { remarkImageUrl } from './src/plugins/remark-image-url.mjs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkLinkCard from 'remark-link-card';
import { rehypeLinkCardTarget } from './src/plugins/rehype-link-card-target.mjs';
import { rehypeLinkCardAssets } from './src/plugins/rehype-link-card-assets.mjs';
import { rehypeExternalLinks } from './src/plugins/rehype-external-links.mjs';
import { slidePdfProxyPlugin } from './src/plugins/vite-slide-pdf-proxy.mjs';

// .envファイルを読み込み
dotenv.config();

// Standard ML文法の読み込み
const __dirname = dirname(fileURLToPath(import.meta.url));
const smlGrammar = JSON.parse(
  readFileSync(join(__dirname, 'src/grammars/sml.tmLanguage.json'), 'utf-8')
);

// github-dark に SML 用の色を足す
const githubDarkTheme = {
  ...githubDark,
  name: 'github-dark',
  tokenColors: [
    ...(githubDark.tokenColors ?? []),
    {
      scope: [
        'punctuation.section.parens.sml',
        'punctuation.section.brackets.sml',
        'punctuation.section.braces.sml',
        'punctuation.separator.sml',
      ],
      settings: { foreground: '#8B949E' },
    },
    {
      scope: ['variable.parameter.sml'],
      settings: { foreground: '#D4A574' },
    },
  ],
};

// 環境変数の読み込み
const SITE_URL = process.env.SITE_URL || 'https://example.com';
const USE_NGROK = process.env.USE_NGROK === 'true';
const NGROK_HOST = USE_NGROK
  ? process.env.NGROK_HOST?.replace(/^https?:\/\//, '').replace(/\/$/, '')
  : undefined;

const devAllowedHosts = [
  '.ngrok-free.app',
  'localhost',
  '127.0.0.1',
  ...(NGROK_HOST ? [NGROK_HOST] : []),
];

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  devToolbar: {
    enabled: !USE_NGROK,
  },
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
    processor: unified({
      remarkPlugins: [
        remarkImageUrl,
        remarkMath,
        [
          remarkLinkCard,
          {
            cache: false,
            shortenUrl: true,
          },
        ],
      ],
      rehypePlugins: [rehypeKatex, rehypeLinkCardTarget, rehypeLinkCardAssets, rehypeExternalLinks],
      remarkRehype: {
        footnoteLabel: '脚注',
      },
    }),
    shikiConfig: {
      theme: githubDarkTheme,
      langs: [smlGrammar],
      wrap: true,
    },
  },
  server: {
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: devAllowedHosts,
    ...(USE_NGROK && NGROK_HOST && { hmr: false }),
  },
  vite: {
    plugins: [
      slidePdfProxyPlugin({
        allowedHosts: (process.env.SLIDE_PROXY_ALLOWED_HOSTS ?? '').split(',').map((h) => h.trim()),
      }),
    ],
    server: {
      host: true,
      strictPort: false,
      allowedHosts: devAllowedHosts,
      ...(USE_NGROK && NGROK_HOST && { hmr: false }),
    },
  },
});
