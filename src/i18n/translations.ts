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
    'nav.links': 'リンク集',

    // ホームページ
    'home.pinned': 'ピン留めされた記事',
    'home.important': '重要',
    'home.latest': '最新の記事',
    'home.no-posts': 'まだ記事がありません．',
    'home.view-all': 'すべての記事を見る',

    // 記事一覧・個別記事 UI
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
    'posts.toc': '目次',
    'posts.share': 'シェア',
    'posts.back-to-list': '← 記事一覧に戻る',
    'posts.filter-toggle': '絞り込み・RSS',

    // RSS フィードタイトル (接尾辞)
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
    'share.link-alt': 'リンク',

    // 画像ギャラリー
    'gallery.image': '画像',

    // コンポーネント共通
    'component.details': '詳細を見る',
    'component.open-link': 'リンクを開く',
    'component.view-badge': 'Credly バッジを見る',
    'component.signed-text.loading': '読み込み中...',
    'component.signed-text.copy': 'クリップボードにコピー',
    'component.signed-text.open-file': '元のファイルを開く',
    'component.signed-text.copied': 'コピーしました！',
    'component.signed-text.copy-failed': 'コピーに失敗しました',
    'component.signed-text.error': 'エラー',

    // Writings セクション
    'writings.intro.prefix': 'サイト内にも',
    'writings.intro.link-text': 'ブログ記事',
    'writings.intro.suffix': 'があります．',

    // Talks セクション
    'talks.event': 'イベント',
    'talks.slides': 'スライド',
    'talks.post': '記事',

    // アカウント証明
    'identity.title': 'アカウント証明',
    'identity.meta-description': 'のアカウント証明と PGP 公開鍵',
    'identity.meta-description-prefix': '',
    'identity.intro':
      'のアカウントを証明するための情報です．アカウントが本人のものであることを PGP 署名で証明しています．',
    'identity.intro-prefix': '',
    'identity.intro-suffix': '',
    'identity.pgp-section': 'PGP 公開鍵',
    'identity.pgp-card-title': 'PGP 公開鍵',
    'identity.pgp-card-desc': '公開鍵の確認とダウンロード',
    'identity.accounts-section': 'アカウント証明',
    'identity.accounts-intro':
      '以下のアカウントについて，PGP 署名による所有の証明を提供しています．',
    'identity.verification-title': '署名の検証方法',
    'identity.verify-step1-prefix': '',
    'identity.verify-step1-link': 'PGP 公開鍵ページ',
    'identity.verify-step1-after': 'から公開鍵を取得し，インポート',
    'identity.verify-step2-before': '各アカウントの ',
    'identity.verify-step2-after': ' をダウンロード',
    'identity.verify-step3-before': '',
    'identity.verify-step3-after': ' で署名を検証',

    'identity.key.title': 'PGP 公開鍵',
    'identity.key.meta-description': 'の PGP 公開鍵',
    'identity.key.meta-description-prefix': '',
    'identity.key.intro': 'の PGP 公開鍵です．',
    'identity.key.intro-prefix': '',
    'identity.key.intro-suffix': '',

    'identity.signed.title-suffix': ' の署名',
    'identity.signed.intro-mid': ' が ',
    'identity.signed.intro-after': ' の ',
    'identity.signed.intro-end': ' アカウントを所有していることを述べた署名付きテキストです．',
    'identity.signed.intro-prefix-en': 'Signed text stating that ',
    'identity.signed.intro-mid-en': ' owns the ',
    'identity.signed.intro-end-en': ' account ',
    'identity.signed.verification-title': '検証方法',
    'identity.signed.keybase-heading': 'A: Keybase でブラウザから検証',
    'identity.signed.keybase-step1-prefix': '',
    'identity.signed.keybase-step1-link': 'Keybase.io',
    'identity.signed.keybase-step1-after': ' にアクセス',
    'identity.signed.keybase-step2': '上記の署名付きテキスト全体をコピーして貼り付け',
    'identity.signed.keybase-step3': '"Verify" ボタンをクリック',
    'identity.signed.gpg-heading': 'B: GPG コマンドで検証',
    'identity.signed.gpg-step1-prefix': '',
    'identity.signed.gpg-step1-link': 'PGP 公開鍵',
    'identity.signed.gpg-step1-after': ' をインポート',
    'identity.signed.gpg-step2': '上記のテキストをファイルに保存',
    'identity.signed.gpg-step3-before': '',
    'identity.signed.gpg-step3-after': ' で検証',

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
    'nav.links': 'Link Collection',

    // Home page
    'home.pinned': 'Pinned Posts',
    'home.important': 'Important',
    'home.latest': 'Latest Posts',
    'home.no-posts': 'No posts yet.',
    'home.view-all': 'View all posts',

    // Posts list and article UI
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
    'posts.toc': 'Table of Contents',
    'posts.share': 'Share',
    'posts.back-to-list': '← Back to Posts',
    'posts.filter-toggle': 'Filter & RSS',

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
    'share.link-alt': 'Link',

    // Image gallery
    'gallery.image': 'Image',

    // Component common
    'component.details': 'View details',
    'component.open-link': 'Open link',
    'component.view-badge': 'View Credly badge',
    'component.signed-text.loading': 'Loading...',
    'component.signed-text.copy': 'Copy to Clipboard',
    'component.signed-text.open-file': 'Open Original File',
    'component.signed-text.copied': 'Copied!',
    'component.signed-text.copy-failed': 'Failed to copy',
    'component.signed-text.error': 'Error',

    // Writings section
    'writings.intro.prefix': 'Posts on this site are listed on the ',
    'writings.intro.link-text': 'Posts',
    'writings.intro.suffix': ' page.',

    // Talks section
    'talks.event': 'Event details',
    'talks.slides': 'Slides',
    'talks.post': 'Post',

    // Identity verification
    'identity.title': 'Identity Verification',
    'identity.meta-description-prefix': 'Identity verification and PGP public key for ',
    'identity.meta-description': '',
    'identity.intro-prefix': 'Identity verification information for ',
    'identity.intro-suffix':
      '. Ownership of each social media account is verified with PGP signatures.',
    'identity.intro': '',
    'identity.pgp-section': 'PGP Public Key',
    'identity.pgp-card-title': 'PGP Public Key',
    'identity.pgp-card-desc': 'View and download the public key',
    'identity.accounts-section': 'Account Verification',
    'identity.accounts-intro':
      'PGP signature-based ownership verification is provided for the following accounts.',
    'identity.verification-title': 'How to Verify Signatures',
    'identity.verify-step1-prefix': 'Get the public key from the ',
    'identity.verify-step1-link': 'PGP Public Key page',
    'identity.verify-step1-after': ' and import it',
    'identity.verify-step2-before': 'Download ',
    'identity.verify-step2-after': ' for each account',
    'identity.verify-step3-before': 'Verify the signature with ',
    'identity.verify-step3-after': '',

    'identity.key.title': 'PGP Public Key',
    'identity.key.meta-description': '',
    'identity.key.meta-description-prefix': 'PGP public key for ',
    'identity.key.intro': '',
    'identity.key.intro-prefix': 'PGP public key for ',
    'identity.key.intro-suffix': '.',

    'identity.signed.title-suffix': ' Signature',
    'identity.signed.intro-mid': '',
    'identity.signed.intro-after': '',
    'identity.signed.intro-end': '',
    'identity.signed.intro-prefix-en': 'Signed text stating that ',
    'identity.signed.intro-mid-en': ' owns the ',
    'identity.signed.intro-end-en': ' account ',
    'identity.signed.verification-title': 'How to Verify',
    'identity.signed.keybase-heading': 'A: Verify in Browser with Keybase',
    'identity.signed.keybase-step1-link': 'Keybase.io',
    'identity.signed.keybase-step1-after': '',
    'identity.signed.keybase-step1-prefix': 'Visit ',
    'identity.signed.keybase-step2': 'Copy and paste the entire signed text above',
    'identity.signed.keybase-step3': 'Click the "Verify" button',
    'identity.signed.gpg-heading': 'B: Verify with GPG Command',
    'identity.signed.gpg-step1-link': 'PGP Public Key page',
    'identity.signed.gpg-step1-after': ' and import it',
    'identity.signed.gpg-step1-prefix': 'Get the public key from the ',
    'identity.signed.gpg-step2': 'Save the above text to a file',
    'identity.signed.gpg-step3-before': 'Verify with ',
    'identity.signed.gpg-step3-after': '',

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
