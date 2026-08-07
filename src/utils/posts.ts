import type { CollectionEntry } from 'astro:content';

export function sortPosts(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
  return [...posts].sort((a, b) => {
    const dateDiff = b.data.date.getTime() - a.data.date.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.id.localeCompare(a.id);
  });
}

export function splitHomePosts(posts: CollectionEntry<'posts'>[]) {
  const pinnedPosts = sortPosts(posts.filter((post) => post.data.pinned));
  const regularPosts = sortPosts(posts.filter((post) => !post.data.pinned));
  return {
    pinnedPosts,
    regularPosts,
    latestPosts: regularPosts.slice(0, 6),
  };
}

export function formatPostListDate(date: Date): string {
  // frontmatter の date は UTC 深夜として解析されるため，表示も UTC に固定する
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 対象言語の対訳記事を探す．
 * - lang 未定義の記事は両言語版に表示されるため，そのまま対訳として扱う
 * - 言語別の記事は `<id>` (ja) / `<id>_en` (en) の命名規則で対応付ける
 */
export function findCounterpartPost(
  posts: CollectionEntry<'posts'>[],
  id: string,
  targetLang: 'ja' | 'en'
): CollectionEntry<'posts'> | undefined {
  const current = posts.find((post) => post.id === id);
  if (!current) return undefined;
  if (current.data.lang === undefined || current.data.lang === targetLang) return current;

  const targetId = targetLang === 'en' ? `${id}_en` : id.replace(/_en$/, '');
  return posts.find(
    (post) =>
      post.id === targetId && (post.data.lang === targetLang || post.data.lang === undefined)
  );
}
