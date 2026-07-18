import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getRssFeedTitle, getSiteDescription, type PostTag } from '../i18n/utils';
import { postsBasePath } from './paths';
import { sortPosts } from './posts';

type FeedLang = 'ja' | 'en';

/**
 * ロケール (+ 任意でタグ) に応じた RSS フィードを生成する．
 * lang 未定義の記事は両言語のフィードに含まれる．
 */
export async function buildRssFeed(
  context: APIContext,
  lang: FeedLang,
  options: { tag?: PostTag; description?: string } = {}
) {
  const { tag, description } = options;
  const posts = await getCollection('posts', ({ data }) => {
    const langMatches = data.lang === lang || data.lang === undefined;
    return langMatches && (!tag || data.tags.includes(tag));
  });

  return rss({
    title: getRssFeedTitle(lang, tag),
    description: description ?? getSiteDescription(lang),
    site: context.site?.toString() || import.meta.env.SITE_URL || 'http://localhost:4321',
    items: sortPosts(posts).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `${postsBasePath(lang)}/${post.id}/`,
      pubDate: post.data.date,
      categories: post.data.tags,
    })),
    customData: `<language>${lang}</language>`,
  });
}
