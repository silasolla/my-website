export const translations = {
  ja: {
    // サイト基本情報
    'site.name-suffix': ' のページ',
    'site.tagline': 'Trust, but verify.',

    // ページタイトル
    'page.home': 'ホーム',
    'page.about': '私について',
    'page.posts': '記事',
    'page.links': 'リンク',

    // ナビゲーション
    'nav.menu': 'お品書き',
    'nav.home': 'ホーム',
    'nav.about': '私について',
    'nav.posts': '記事',
    'nav.links': 'リンク',

    // ホームページ
    'home.pinned': 'ピン留めされたお知らせ',
    'home.important': '重要',
    'home.latest': '最新の記事',
    'home.no-posts': 'まだ記事がありません．',

    // 記事ページ
    'posts.title': '記事',
    'posts.description': '技術記事，お知らせ，日記などの記事一覧です．',
    'posts.all': 'すべての記事',
    'posts.filter-by-tag': 'タグで絞り込み',
    'posts.show-all': 'すべて表示',
    'posts.no-posts': '記事がありません．',
    'posts.rss': 'RSS',
    'posts.rss-all': 'すべての記事',
    'posts.rss-news': 'お知らせ',
    'posts.rss-tech': '技術記事',
    'posts.rss-diary': '日記',

    // RSS フィードタイトル（接尾辞）
    'rss.feed-title-suffix': 'すべての記事',
    'rss.feed-title-news-suffix': 'お知らせ',
    'rss.feed-title-tech-suffix': '技術記事',
    'rss.feed-title-diary-suffix': '日記',

    // タグ
    'tag.news': 'お知らせ',
    'tag.tech': '技術',
    'tag.diary': '日記',

    // テーマ・言語切り替え
    'theme.toggle': 'テーマ切り替え',
    'theme.dark-light': 'ダーク/ライトモード切り替え',
    'lang.switch.ja': '日本語',
    'lang.switch.en': 'English',

    // ナビゲーションメニュー (モバイル)
    'nav.toggle.open': 'メニューを開く',
    'nav.toggle.close': 'メニューを閉じる',

    // フィルター切り替え (モバイル)
    'filter.toggle.open': 'フィルターを開く',
    'filter.toggle.close': 'フィルターを閉じる',

    // シェアボタン
    'share.twitter': 'X (Twitter) でシェア',
    'share.bluesky': 'Bluesky でシェア',
    'share.copy': 'URL をコピー',

    // 画像ギャラリー
    'gallery.image': '画像',

    // コンポーネント共通
    'component.details': '詳細を見る',
    'component.open-link': 'リンクを開く',
    'component.view-badge': 'Credly バッジを見る',

    // 404ページ
    'notfound.title': 'ページが見つかりません',
    'notfound.heading': 'ページが見つかりません',
    'notfound.message': 'お探しのページは存在しないか，移動または削除された可能性があります．',
    'notfound.home': 'ホームに戻る',
  },
  en: {
    // Site basics
    'site.name-suffix': "'s Web Page",
    'site.tagline': 'Trust, but verify.',

    // Page titles
    'page.home': 'Home',
    'page.about': 'About Me',
    'page.posts': 'Posts',
    'page.links': 'Links',

    // Navigation
    'nav.menu': 'Menu',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.posts': 'Posts',
    'nav.links': 'Links',

    // Home page
    'home.pinned': 'Pinned Announcements',
    'home.important': 'Important',
    'home.latest': 'Latest Posts',
    'home.no-posts': 'No posts yet.',

    // Posts page
    'posts.title': 'Posts',
    'posts.description': 'A collection of tech articles, news, and diary entries.',
    'posts.all': 'All Posts',
    'posts.filter-by-tag': 'Filter by Tag',
    'posts.show-all': 'Show All',
    'posts.no-posts': 'No posts found.',
    'posts.rss': 'RSS',
    'posts.rss-all': 'All Posts',
    'posts.rss-news': 'News',
    'posts.rss-tech': 'Tech',
    'posts.rss-diary': 'Diary',

    // RSS feed titles (suffixes)
    'rss.feed-title-suffix': 'All Posts',
    'rss.feed-title-news-suffix': 'News',
    'rss.feed-title-tech-suffix': 'Tech',
    'rss.feed-title-diary-suffix': 'Diary',

    // Tags
    'tag.news': 'News',
    'tag.tech': 'Tech',
    'tag.diary': 'Diary',

    // Theme/Language toggle
    'theme.toggle': 'Toggle theme',
    'theme.dark-light': 'Toggle dark/light mode',
    'lang.switch.ja': '日本語',
    'lang.switch.en': 'English',

    // Navigation menu (mobile)
    'nav.toggle.open': 'Open menu',
    'nav.toggle.close': 'Close menu',

    // Filter toggle (mobile)
    'filter.toggle.open': 'Open filters',
    'filter.toggle.close': 'Close filters',

    // Share buttons
    'share.twitter': 'Share on X (Twitter)',
    'share.bluesky': 'Share on Bluesky',
    'share.copy': 'Copy URL',

    // Image gallery
    'gallery.image': 'Image',

    // Component common
    'component.details': 'View details',
    'component.open-link': 'Open link',
    'component.view-badge': 'View Credly badge',

    // 404 page
    'notfound.title': 'Page Not Found',
    'notfound.heading': 'Page Not Found',
    'notfound.message':
      'The page you are looking for does not exist or may have been moved or deleted.',
    'notfound.home': 'Go to Home',
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)['ja'];

export function getTranslation(locale: Locale | string | undefined, key: TranslationKey): string {
  const normalizedLocale = (locale === 'en' ? 'en' : 'ja') as Locale;
  return translations[normalizedLocale][key] || translations['ja'][key];
}

export function getCurrentLocale(localeFromAstro: string | undefined): Locale {
  return (localeFromAstro === 'en' ? 'en' : 'ja') as Locale;
}
