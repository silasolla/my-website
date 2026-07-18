// Astro が 404.html として特別扱いするのはルートの /404 のみで，
// src/pages/en/404.astro は dist/en/404/index.html に出力される．
// Cloudflare の not_found_handling: "404-page" は階層を遡って最も近い
// 404.html を探すため，/en/ 配下用に dist/en/404.html へ複製する．
import { copyFileSync, existsSync } from 'fs';

const src = 'dist/en/404/index.html';
const dest = 'dist/en/404.html';

if (!existsSync(src)) {
  console.error(`[copy-en-404] ${src} が見つかりません．src/pages/en/404.astro を確認してください`);
  process.exit(1);
}

copyFileSync(src, dest);
console.log(`[copy-en-404] ${src} -> ${dest}`);
