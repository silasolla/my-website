import { profileData } from '../data/profile';
import { getTranslation } from './translations';

/**
 * サイト名を取得（プロフィール + i18n接尾辞）
 */
export function getSiteName(locale: string | undefined): string {
  const suffix = getTranslation(locale, 'site.name-suffix');
  if (locale === 'en') {
    return `${profileData.nameEn}${suffix}`;
  }
  return `${profileData.name}${suffix}`;
}

/**
 * サイトタイトルを取得（名前の組み合わせ）
 */
export function getSiteTitle(locale: string | undefined): string {
  if (locale === 'en') {
    return `${profileData.nameEn} / ${profileData.name}`;
  }
  return `${profileData.name} / ${profileData.nameEn}`;
}

/**
 * サイト説明を取得（プロフィール + tagline）
 */
export function getSiteDescription(locale: string | undefined): string {
  const tagline = getTranslation(locale, 'site.tagline');
  if (locale === 'en') {
    return `Personal website of ${profileData.nameEn} (@${profileData.username}). ${tagline}`;
  }
  return `${profileData.name} / ${profileData.nameEn} (@${profileData.username}) の個人サイト / ${tagline}`;
}

/**
 * RSSフィードタイトルを取得
 */
export function getRssFeedTitle(
  locale: string | undefined,
  type?: 'news' | 'tech' | 'diary'
): string {
  const title = getSiteTitle(locale);
  let suffix: string;

  if (type) {
    suffix = getTranslation(locale, `rss.feed-title-${type}-suffix`);
  } else {
    suffix = getTranslation(locale, 'rss.feed-title-suffix');
  }

  return `${title} - ${suffix}`;
}
