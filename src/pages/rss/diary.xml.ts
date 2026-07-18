import type { APIContext } from 'astro';
import { buildRssFeed } from '../../utils/rss';

export async function GET(context: APIContext) {
  return buildRssFeed(context, 'ja', { tag: 'diary', description: '日記のRSSフィード' });
}
