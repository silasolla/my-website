import { createHash } from 'crypto';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { visit } from 'unist-util-visit';

const saveDirectory = 'public/remark-link-card';
const publicDirectory = '/remark-link-card';

const extensions = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/avif': '.avif',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/x-icon': '.ico',
  'image/vnd.microsoft.icon': '.ico',
};

const inFlight = new Map();

const cache = async (url) => {
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 16);
  const cached =
    existsSync(saveDirectory) && readdirSync(saveDirectory).find((f) => f.startsWith(hash));
  if (cached) {
    return `${publicDirectory}/${cached}`;
  }

  const response = await fetch(url);
  const extension = extensions[response.headers.get('content-type')?.split(';')[0]];
  if (!response.ok || !extension) {
    console.error(
      `[rehype-link-card-assets] Skipped ${url} (${response.status} ${response.headers.get('content-type')})`
    );
    return undefined;
  }

  mkdirSync(saveDirectory, { recursive: true });
  await writeFile(join(saveDirectory, hash + extension), Buffer.from(await response.arrayBuffer()));
  return `${publicDirectory}/${hash}${extension}`;
};

const cacheOnce = (url) => {
  if (!inFlight.has(url)) {
    inFlight.set(url, cache(url));
  }
  return inFlight.get(url);
};

/**
 * rehype plugin: リンクカードの画像を URL のハッシュでローカルに保存して src を差し替える
 * 取得できなかった画像は要素ごと取り除く
 */
export function rehypeLinkCardAssets() {
  return async (tree) => {
    const targets = [];
    visit(tree, 'element', (node, _index, parent) => {
      const className = node.properties?.className;
      if (node.tagName !== 'img' || !className) {
        return;
      }
      const isImage = className.includes('rlc-image');
      if (
        (isImage || className.includes('rlc-favicon')) &&
        /^https?:\/\//.test(node.properties.src)
      ) {
        targets.push({ node, remove: isImage ? parent : node });
      }
    });

    const orphans = new Set();
    await Promise.all(
      targets.map(async ({ node, remove }) => {
        const src = await cacheOnce(node.properties.src);
        if (src) {
          node.properties.src = src;
        } else {
          orphans.add(remove);
        }
      })
    );

    if (orphans.size > 0) {
      visit(tree, 'element', (node) => {
        if (node.children) {
          node.children = node.children.filter((child) => !orphans.has(child));
        }
      });
    }
  };
}
