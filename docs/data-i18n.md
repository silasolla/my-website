# データ管理と国際化 (i18n) 対応

このドキュメントでは，サイトのデータ管理と国際化 (i18n) の仕組みについて説明します．

## 目次

1.  [プロファイルデータ管理](#プロファイルデータ管理)
2.  [国際化 (i18n)](#国際化-i18n)
3.  [ユーティリティ関数](#ユーティリティ関数)
4.  [使用例](#使用例)
5.  [ベストプラクティス](#ベストプラクティス)

---

## プロファイルデータ管理

### `src/data/profile.ts`

個人情報やプロファイルデータを一元管理するためのファイルです．サイト全体で使用される個人情報はすべてここに集約されています．

#### `ProfileData` インターフェース

```typescript
export interface ProfileData {
  name: string; // 日本語名
  nameEn: string; // 英語名
  username: string; // ユーザー名 (@username)
  alternateNames: string[]; // 別名・通称のリスト
  jobTitle: string; // 職種
  description: string; // 自己紹介文
  avatar: string; // アバター画像のパス
  social: {
    // SNS・外部リンク
    github?: string;
    bluesky?: string;
    twitter?: string;
    // ... その他のSNS
  };
}
```

#### `profileData`

実際のプロファイルデータを格納するオブジェクトです．

**使用例:**

```typescript
import { profileData } from '../data/profile';

// 名前を取得
const name = profileData.name; // "山田 太郎"
const nameEn = profileData.nameEn; // "Taro Yamada"
const username = profileData.username; // "your_username"

// SNSリンクを取得
const githubUrl = profileData.social.github; // "https://github.com/..."
```

#### `seoKeywords`

SEO用のキーワードリストです．`meta name="keywords"` タグで使用されます．

```typescript
export const seoKeywords = [
  '山田太郎',
  'Taro Yamada',
  'your_username',
  'ニックネーム',
  'ソフトウェアエンジニア',
  // ...
];
```

**使用例:**

```astro
<meta name="keywords" content={seoKeywords.join(',')} />
```

---

## 国際化 (i18n)

### `src/i18n/translations.ts`

日本語と英語の翻訳データを管理するファイルです．

#### 翻訳キーの構造

翻訳キーは階層的にドット記法で管理されています．

```typescript
export const translations = {
  ja: {
    // サイト全体
    'site.name-suffix': 'の個人サイト',
    'site.tagline': 'のテックブログです．',

    // ナビゲーション
    'nav.home': 'ホーム',
    'nav.about': '自己紹介',

    // コンポーネント
    'component.details': '詳細を見る',
    'component.open-link': 'リンクを開く',

    // RSS
    'rss.feed-title-suffix': 'のブログ',

    // ...
  },
  en: {
    'site.name-suffix': "'s Personal Site",
    'site.tagline': "'s tech blog.",
    // ...
  },
};
```

#### 翻訳の取得方法

```astro
---
import { getTranslation } from '../i18n/translations';

const detailsText = getTranslation(Astro.currentLocale, 'component.details');
// ロケールが 'ja' なら "詳細を見る"
// ロケールが 'en' なら "View Details"
---
```

#### 新しい翻訳を追加する方法

1.  `src/i18n/translations.ts` を開く
2.  `ja` と `en` の両方に同じキーを追加
3.  適切な値を設定

```typescript
export const translations = {
  ja: {
    // 既存の翻訳...
    'component.new-feature': '新機能', // 追加
  },
  en: {
    // 既存の翻訳...
    'component.new-feature': 'New Feature', // 追加
  },
};
```

---

## ユーティリティ関数

### `src/i18n/utils.ts`

プロファイルデータと翻訳を組み合わせて，動的なテキストを生成するユーティリティ関数を提供します．

#### このファイルの目的

以前は，サイト名などの情報を各ファイルに直接記述 (ハードコーディング) していました．

```astro
<!-- 悪い例: ハードコーディング -->
<title>Taro Yamada / 山田 太郎の個人サイト</title>
<meta name="description" content="Taro Yamada / 山田 太郎 (@your_username) のテックブログです．" />
```

この方法には以下の問題がありました．

- 情報が各ファイルに散らばってしまう．
- 名前などを変更する場合，すべてのファイルを修正する必要がある．
- 汎用的なテンプレートとして再利用しにくい．

`utils.ts` を使うことで，データと表示ロジックを分離し，DRY (Don't Repeat Yourself) の原則に従うことができます．

#### 提供される関数

##### `getSiteTitle(locale: Locale): string`

サイトのタイトルを生成します．

```typescript
getSiteTitle('ja'); // "Taro Yamada / 山田 太郎の個人サイト"
getSiteTitle('en'); // "Taro Yamada / 山田 太郎's Personal Site"
```

##### `getSiteName(locale: Locale): string`

サイト名を生成します (`getSiteTitle` と同じ実装です)．

##### `getSiteDescription(locale: Locale): string`

サイトの説明文を生成します．

```typescript
getSiteDescription('ja'); // "Taro Yamada / 山田 太郎 (@your_username) のテックブログです．"
getSiteDescription('en'); // "Taro Yamada / 山田 太郎 (@your_username)'s tech blog."
```

##### `getRssFeedTitle(locale: Locale, category: RssCategory): string`

RSSフィードのタイトルを生成します．

```typescript
getRssFeedTitle('ja', 'all'); // "Taro Yamada / 山田 太郎 - のブログ"
getRssFeedTitle('ja', 'tech'); // "Taro Yamada / 山田 太郎 - 技術記事"
getRssFeedTitle('en', 'tech'); // "Taro Yamada / 山田 太郎 - Tech Articles"
```

##### `formatDate(date: Date, locale?: string): string`

日付をロケールに応じたフォーマットで表示します．

```typescript
formatDate(new Date('2025-01-15'), 'ja'); // "2025年1月15日"
formatDate(new Date('2025-01-15'), 'en'); // "January 15, 2025"
```

---

## 使用例

### レイアウトでの使用

```astro
---
// src/layouts/Layout.astro
import { profileData, seoKeywords } from '../data/profile';
import { getSiteTitle, getSiteDescription } from '../i18n/utils';

const title = getSiteTitle(Astro.currentLocale);
const description = getSiteDescription(Astro.currentLocale);
---

<html>
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content={`${profileData.nameEn} (@${profileData.username})`} />
    <meta name="keywords" content={seoKeywords.join(',')} />
  </head>
</html>
```

### コンポーネントでの使用

```astro
---
// src/components/SomeComponent.astro
import { profileData } from '../data/profile';
import { getTranslation } from '../i18n/translations';

const detailsText = getTranslation(Astro.currentLocale, 'component.details');
---

<div>
  <img src={profileData.avatar} alt={profileData.nameEn} />
  <a href={profileData.social.github}>GitHub</a>
  <button>{detailsText}</button>
</div>
```

### ページでの使用

```astro
---
// src/pages/about.astro
import { profileData } from '../data/profile';
import { getSiteName } from '../i18n/utils';

const siteName = getSiteName('ja');
---

<Layout title={`About - ${siteName}`}>
  <h1>{profileData.name} / {profileData.nameEn}</h1>
  <p>{profileData.description}</p>
</Layout>
```

### RSSフィードでの使用

```typescript
// src/pages/rss.xml.ts
import { getRssFeedTitle, getSiteDescription } from '../i18n/utils';

export async function GET(context) {
  return rss({
    title: getRssFeedTitle('ja', 'all'),
    description: getSiteDescription('ja'),
    // ...
  });
}
```

---

## ベストプラクティス

### 1. 個人情報は `profileData` に集約する

❌ **悪い例:**

```astro
<meta name="author" content="山田 太郎" />
<a href="https://github.com/your_username">GitHub</a>
```

✅ **良い例:**

```astro
---
import { profileData } from '../data/profile';
---

<meta name="author" content={profileData.name} />
<a href={profileData.social.github}>GitHub</a>
```

### 2. 翻訳可能なテキストは `translations` に追加する

❌ **悪い例:**

```astro
<button>詳細を見る</button>
```

✅ **良い例:**

```astro
---
import { getTranslation } from '../i18n/translations';
const detailsText = getTranslation(Astro.currentLocale, 'component.details');
---

<button>{detailsText}</button>
```

### 3. 動的なテキストは `utils.ts` の関数を使用する

❌ **悪い例:**

```astro
<title>Taro Yamada / 山田 太郎の個人サイト</title>
```

✅ **良い例:**

```astro
---
import { getSiteTitle } from '../i18n/utils';
---

<title>{getSiteTitle(Astro.currentLocale)}</title>
```

### 4. 新しいプロファイル項目を追加する場合

1.  `src/data/profile.ts` の `ProfileData` インターフェースに項目を追加します．
2.  `profileData` オブジェクトに値を設定します．

```typescript
export interface ProfileData {
  // 既存のフィールド...
  company?: string; // 新しいフィールドを追加
}

export const profileData: ProfileData = {
  // 既存のデータ...
  company: '株式会社Example', // 値を設定
};
```

### 5. 新しい翻訳カテゴリを追加する場合

翻訳キーは階層的に管理します．新しいカテゴリを追加する際は，既存の命名規則に従ってください．

- `site.*` - サイト全体に関する翻訳
- `nav.*` - ナビゲーションメニュー
- `component.*` - 共通コンポーネント
- `posts.*` - 記事ページ
- `rss.*` - RSS フィード
- `about.*` - About ページ (必要に応じて)

---

## 関連ドキュメント

- [About ページのデータ管理](./about-data.md) - `src/data/about.ts` の詳細
- [ワークフロー](./workflow.md) - 記事作成やデプロイのワークフロー
- [画像ホスティング](./image-hosting.md) - 画像の管理方法
