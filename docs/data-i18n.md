# データ管理と国際化 (i18n) 対応

このドキュメントでは，サイトのデータ管理と国際化 (i18n) の仕組みについて説明します．

## 目次

1.  [プロファイルデータ管理](#プロファイルデータ管理)
2.  [国際化 (i18n)](#国際化-i18n)
3.  [ユーティリティ関数](#ユーティリティ関数)
4.  [記事ページの UI](#記事ページの-ui)
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

#### `seoKeywords`

SEO 用キーワード．`Layout.astro` の `meta name="keywords"` で使用します．

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

`profile.ts` と `translations.ts` を組み合わせた文字列を生成する．UI からは `Astro.currentLocale` を渡す．

| 関数                 | 用途                                 |
| -------------------- | ------------------------------------ |
| `getSiteTitle`       | サイトタイトル                       |
| `getSiteName`        | サイト名 (接尾辞付き)                |
| `getSiteDescription` | meta description                     |
| `getRssFeedTitle`    | RSS タイトル (`type` でカテゴリ指定) |
| `getTagLabel`        | 記事タグの表示名                     |
| `formatDate`         | 日付のロケール表示                   |

---

## 記事ページの UI

レイアウト本体は `HomePage.astro` (トップ)，`PostArticle.astro` (個別記事)，`PostsIndex.astro` (一覧)，`IdentityIndex.astro` / `IdentityKeyPage.astro` / `IdentitySignedPage.astro` (アカウント証明)．各 `pages/` 配下はルーティングと前処理のみ．

| ファイル             | 用途                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `src/utils/posts.ts` | 並び順 (`sortPosts`)，ホームのピン留め分割 (`splitHomePosts`)，一覧日付 (`formatPostListDate`) |
| `src/utils/paths.ts` | ロケール付きパス (`localeBasePath`, `homePath`, `postsBasePath`, `identityBasePath`)           |

### UI ラベルを変更する

`src/i18n/translations.ts` の `ja` / `en` を両方更新する．

| キー                                             | 表示箇所                      |
| ------------------------------------------------ | ----------------------------- |
| `posts.toc`                                      | 目次見出し                    |
| `posts.share`                                    | シェア見出し                  |
| `posts.back-to-list`                             | 記事一覧へのリンク            |
| `posts.filter-toggle`                            | 一覧のフィルタ開閉ボタン (SP) |
| `share.twitter` / `share.bluesky` / `share.copy` | シェアボタンの `title`        |
| `share.link-alt`                                 | リンクコピーアイコンの `alt`  |
| `tag.*`                                          | タグ名 (`getTagLabel` 経由)   |

### タグ種別を追加する

1. `src/content.config.ts` の `tags` enum
2. `src/i18n/translations.ts` の `tag.<名前>` (`ja` / `en`)
3. `src/i18n/utils.ts` の `PostTag` 型
4. `src/styles/global.css` の `.tag-<名前>`
5. `src/layouts/PostsIndex.astro` のフィルタボタン

アカウント証明の UI ラベルは `identity.*` キー．フィルタボタン追加手順と同様，`translations.ts` の `ja` / `en` を両方更新する．

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

### 5. 翻訳キーの命名規則

| プレフィックス | 用途                 |
| -------------- | -------------------- |
| `site.*`       | サイト名，タグライン |
| `nav.*`        | ナビゲーション       |
| `component.*`  | 共通コンポーネント   |
| `posts.*`      | 記事 UI              |
| `tag.*`        | タグ表示名           |
| `share.*`      | シェア UI            |
| `rss.*`        | RSS タイトル         |
| `about.*`      | About ページ         |

---

## 関連ドキュメント

- [About ページのデータ管理](./about-data.md) - `src/data/about.ts` の詳細
- [ワークフロー](./workflow.md) - 記事作成やデプロイのワークフロー
- [画像ホスティング](./image-hosting.md) - 画像の管理方法
