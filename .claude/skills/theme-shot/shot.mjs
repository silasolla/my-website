import { chromium } from 'playwright';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const paths = process.argv.slice(2);
if (paths.length === 0) {
  paths.push('/');
}

// src/styles/header.css の背景切替境界に合わせる．
// tablet 帯は max-width: 1440px までなので，1440 で撮ると desktop ではなく tablet になる．
const VIEWPORTS = [
  ['mobile', 375],
  ['tablet', 1024],
  ['desktop', 1600],
];

const reachable = await fetch(BASE).catch(() => null);
if (!reachable?.ok) {
  console.error(`${BASE} に繋がりません．npm run dev を起動してください．`);
  process.exit(1);
}

const out = await mkdtemp(join(tmpdir(), 'theme-shot-'));
const browser = await chromium.launch({ channel: 'chrome' });

for (const path of paths) {
  for (const [label, width] of VIEWPORTS) {
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        // src/styles/list-row.css のスクロール連動アニメーションを止める．
        // 有効なままだと折り返しより下の .row が opacity: 0 で写る．
        reducedMotion: 'reduce',
      });
      // テーマは head の is:inline script が localStorage を読んで決めるので，
      // ロード前に入れないと初期描画が light のままになる．
      await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
      await page.goto(BASE + path, { waitUntil: 'networkidle' });

      const slug = path.replace(/\W+/g, '_').replace(/^_|_$/g, '') || 'root';
      const file = join(out, `${slug}-${label}-${theme}.png`);
      await page.screenshot({ path: file });
      console.log(file);
      await page.close();
    }
  }
}

await browser.close();
