/**
 * 画像 URL を解決
 * @@/ プレフィックスを IMAGE_BASE_URL または ローカルパスに変換
 */
export function resolveImageUrl(path: string | undefined): string | undefined {
  if (!path) return undefined;

  if (path.startsWith('@@/')) {
    const cleanPath = path.slice(3); // Remove @@/
    const imageBaseUrl = import.meta.env.IMAGE_BASE_URL || '';

    if (imageBaseUrl) {
      return `${imageBaseUrl}/posts/${cleanPath}`;
    } else {
      return `/posts/images/${cleanPath}`;
    }
  }

  return path;
}
