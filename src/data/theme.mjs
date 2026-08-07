import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const css = readFileSync(resolve(process.cwd(), 'src/styles/theme.css'), 'utf-8');
const rootBlock = css.match(/:root\s*\{([\s\S]*?)\n\}/);

if (!rootBlock) {
  throw new Error('theme.css の :root ブロックを解析できませんでした');
}

function readToken(name) {
  const matched = rootBlock[1].match(new RegExp(`^\\s*--${name}:\\s*([^;]+);`, 'm'));
  if (!matched) {
    throw new Error(`theme.css の :root に --${name} がありません`);
  }
  return matched[1].trim();
}

export const themeColor = readToken('color-primary');
export const backgroundColor = readToken('color-bg');
