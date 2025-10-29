import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getRssFeedTitle } from '../../i18n/utils';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => {
    // 日本語版：lang が 'ja' または未定義，かつ 'tech' タグを含む
    return data.tags.includes('tech') && (data.lang === 'ja' || data.lang === undefined);
  });
  const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: getRssFeedTitle('ja', 'tech'),
    description: '技術記事のRSSフィード',
    site: context.site?.toString() || import.meta.env.SITE_URL || 'http://localhost:4321',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/posts/${post.slug}`,
      pubDate: post.data.date,
      categories: post.data.tags,
    })),
    customData: `<language>ja</language>`,
  });
}
