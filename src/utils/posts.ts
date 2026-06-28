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

export function postsBasePath(locale: string | undefined): string {
  return locale === 'en' ? '/en/posts' : '/posts';
}

export function formatPostListDate(date: Date, locale?: string): string {
  if (locale === 'en') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
