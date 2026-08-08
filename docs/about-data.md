# About データ管理

`src/data/about/` ディレクトリには「私について」ページのコンテンツデータが格納されています．

## ファイル構成

- `src/data/about/types.ts`: データの型定義
- `src/data/about/index.ts`: `aboutDataJa` と `aboutDataEn` をエクスポート
- `src/data/about/ja.ts`: 日本語版のコンテンツデータ
- `src/data/about/en.ts`: 英語版のコンテンツデータ

## データの編集方法

### 1. 経歴 (Experience) を追加

```typescript
experiences: [
  {
    period: '2025-06 - 現在',
    company: 'やばい会社',
    companyLink: 'https://example.com',
    role: 'エンジニア',
    description: '闇の技術開発に従事しています．',
  },
  {
    period: '2022-04 - 2025-05',
    company: 'すごい会社',
    companyLink: 'https://example.com',
    role: 'エンジニア',
  },
];
```

**フィールド説明：**

- `period`: 期間 (必須)
- `company`: 会社名 (必須)
- `companyLink`: 会社のウェブサイトへのリンク (必須)
- `role`: 役職名 (必須)
- `description`: 業務内容の説明 (オプション)

### 2. 学歴 (Education) を追加

```typescript
educations: [
  {
    period: '2020-04 - 2022-03',
    institution: 'すごい先端科学技術大学院大学',
    degree: '修士 (衒学)',
    description: 'すごい研究を行っていました．',
  },
  {
    period: '2016-04 - 2020-03',
    institution: 'すごい大学',
    degree: '学士 (衒学)',
  },
  {
    period: '2013-04 - 2016-03',
    institution: 'すごい高等学校',
    description: '普通科に在籍していました．',
  },
];
```

**フィールド説明：**

- `period`: 期間 (必須)
- `institution`: 教育機関名 (必須)
- `degree`: 学位・専攻 (オプション) - 大学，大学院など
- `description`: 詳細説明 (オプション) - 高校など学位がない場合や補足情報に使用

`degree`と`description`は両方オプションで，どちらか一方，または両方を設定できます．

### 3. 著作 (Writings) を追加

```typescript
writings: [
  {
    category: 'Thesis',
    items: [
      {
        title: 'ひよこはすごい',
        url: 'https://example.com',
        description: 'この出版物は，ひよこに関する研究成果をまとめたものです．',
        date: '2025-01',
      },
    ],
  },
  {
    category: 'Articles',
    items: [
      {
        title: 'URL と詳細情報がない記事',
      },
    ],
  },
];
```

**フィールド説明：**

- `title`: 出版物のタイトル (必須)
- `url`: 出版物のリンク (オプション)
- `description`: 出版物の説明 (オプション)
- `date`: 出版日 (オプション)

### 3.5. 登壇 (Talks) を追加

```typescript
talks: [
  {
    title: 'ひよこ駆動開発入門',
    event: 'ひよこ Conference 2025',
    eventUrl: 'https://example.com/event',
    date: '2025-01-01',
    slideUrl: 'https://example.com/talks/hiyoko/slides.pdf',
    postSlug: '2025-01-01-01_hiyoko-talk',
    description: '登壇のサマリです．',
  },
];
```

**フィールド説明：**

- `title`: 登壇タイトル (必須)
- `event`: イベント名 (必須)
- `eventUrl`: イベントページの URL (オプション)
- `date`: 登壇日 (必須)
- `slideUrl`: スライドの URL (オプション) - PDF や SpeakerDeck などへの直リンク
- `postSlug`: サイト内の関連記事のスラッグ (オプション) - 指定すると「記事」へのリンクが表示される
- `description`: 登壇内容の説明 (オプション)

### 4. 資格 (Certifications) を追加

```typescript
certifications: [
  {
    category: '認定資格',
    note: '2025-01-01: 全冠しました！',
    items: [
      {
        name: 'Super Engineer',
        credlyUrl: 'https://www.credly.com/badges/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        badgeImage:
          'https://images.credly.com/size/680x680/images/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/image.png',
      },
      {
        name: 'Hyper Engineer',
      },
    ],
  },
];
```

**フィールド説明：**

- `category`: 資格のカテゴリ (必須)
- `note`: カテゴリへの注記 (オプション)
- `items`: カテゴリ内の資格リスト (必須)
  - `name`: 資格の名前 (必須)
  - `credlyUrl`: Credly のバッジページ URL (オプション)
  - `badgeImage`: バッジ画像のパス (オプション)

**表示：**

- 資格はカテゴリごとにタイルのグリッドで並びます．
- `credlyUrl` を設定するとタイル全体が Credly のバッジページへのリンクになり，新しいタブで開きます．
- `badgeImage` を設定するとバッジ画像がタイル左側に表示されます．
- `note` を設定すると，カテゴリ名の右にタグとして表示されます．
- 同じカテゴリ内の全項目が `badgeImage` を持たない場合は，資格名を中央に寄せます．

### 5. その他 (Misc) を追加

```typescript
misc: [
  {
    category: 'ノート',
    items: [
      {
        name: 'ひよこに関する考察',
        url: 'https://example.com',
        description: '個人的なメモです．',
      },
    ],
  },
  {
    category: 'ツール',
    items: [
      {
        name: 'ひよこマシン',
        url: 'https://example.com',
        description: '便利ツールです．',
      },
    ],
  },
];
```

**フィールド説明：**

- `category`: カテゴリ名 (必須)
- `items`: カテゴリ内の項目リスト (必須)
  - `name`: 項目の名前 (必須)
  - `url`: 項目のリンク (オプション)
  - `description`: 項目の説明 (オプション)

### 6. 趣味 (Hobby) を追加

```typescript
hobbies: [
  {
    name: 'プログラミング',
    note: '新しい技術を学ぶのが好きです．',
  },
  {
    name: '読書',
  },
];
```

**フィールド説明：**

- `name`: 趣味の名前 (必須)
- `note`: 趣味の説明 (オプション)

**表示：**

- Hobby は 2 段組みで並びます．
- `note` を設定すると，趣味の名前の下に表示されます．

## 日本語版と英語版

- `aboutDataJa`: 日本語版のデータ
- `aboutDataEn`: 英語版のデータ

両方を編集することで，言語切り替えに対応できます．

## 使用されているコンポーネント

- `ExperienceSection.astro`: 経歴
- `EducationSection.astro`: 学歴
- `WritingsSection.astro`: 著作 (カード)
- `TalksSection.astro`: 登壇 (カード)
- `CertificationSection.astro`: 資格 (カード)
- `MiscSection.astro`: その他 (カード)
- `HobbySection.astro`: 趣味 (タグ)
- `ImageGallery.astro`: プロフィール画像ギャラリー

## 編集するファイル

| 変更したい内容                  | ファイル                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| テキスト (経歴，学歴，資格など) | `src/data/about/ja.ts`, `en.ts`                                                                         |
| セクションの見た目              | `src/styles/about-sections.css`                                                                         |
| About ページ全体のレイアウト    | `src/styles/about-page.css`                                                                             |
| プロフィールギャラリー          | `src/styles/image-gallery.css`                                                                          |
| ギャラリー画像の追加・差し替え  | `public/profile/` と `AboutPage.astro` の `profileImages` ([手順](./static-images.md#about-ギャラリー)) |
