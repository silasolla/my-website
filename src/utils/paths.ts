export function localeBasePath(locale: string | undefined): string {
  return locale === 'en' ? '/en' : '';
}

export function homePath(locale: string | undefined): string {
  return locale === 'en' ? '/en' : '/';
}

export function postsBasePath(locale: string | undefined): string {
  return locale === 'en' ? '/en/posts' : '/posts';
}

export function identityBasePath(locale: string | undefined): string {
  return locale === 'en' ? '/en/identity' : '/identity';
}
