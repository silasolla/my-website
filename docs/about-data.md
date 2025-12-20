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
    period: '2025年6月 - 現在',
    company: 'やばい会社',
    companyLink: 'https://example.com',
    role: 'エンジニア',
    description: '闇の技術開発に従事しています．',
  },
  {
    period: '2022年4月 - 2025年5月',
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
    period: '2020年4月 - 2022年3月',
    institution: 'すごい先端科学技術大学院大学',
    degree: '修士 (衒学)',
    description: 'すごい研究を行っていました．',
  },
  {
    period: '2016年4月 - 2020年3月',
    institution: 'すごい大学',
    degree: '学士 (衒学)',
  },
  {
    period: '2013年4月 - 2016年3月',
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

### 3. 出版物 (Publications) を追加

```typescript
publications: [
  {
    title: 'ひよこはすごい',
    url: 'https://example.com',
    description: 'この出版物は，ひよこに関する研究成果をまとめたものです．',
    date: '2025年1月',
  },
  {
    title: 'URL と詳細情報がない出版物',
  },
];
```

**フィールド説明：**

- `title`: 出版物のタイトル (必須)
- `url`: 出版物のリンク (オプション)
- `description`: 出版物の説明 (オプション)
- `date`: 出版日 (オプション)

### 4. 資格 (Certifications) を追加

```typescript
certifications: [
  {
    category: '認定資格',
    items: [
      {
        name: 'Super Engineer',
        credlyUrl: 'https://www.credly.com/badges/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        description: 'すごい認定資格です．',
        date: '2025年1月',
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
- `items`: カテゴリ内の資格リスト (必須)
  - `name`: 資格の名前 (必須)
  - `credlyUrl`: Credly のバッジページ URL (オプション)
  - `description`: 資格の説明 (オプション)
  - `date`: 取得日 (オプション)
  - `badgeImage`: バッジ画像のパス (オプション)

**Credly リンクについて：**

- `credlyUrl` はオプションです．指定しない場合は資格名のみ表示されます．
- Credly のバッジページの URL を設定すると，カード内にリンクが表示されます．
- クリックすると，Credly のバッジページが新しいタブで開きます．

**詳細情報の追加：**

- `description`, `date`, `badgeImage` を設定すると，カードの「詳細を見る」をクリックして展開できます．
- バッジ画像を設定すると，PC版ではカード中央に，SP版ではテキストの左側に表示されます．

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

**メモについて：**

- `note` はオプションです．設定すると，タグをクリックして詳細を表示できます．
- メモがない場合は，通常のタグとして表示されます．

## 日本語版と英語版

- `aboutDataJa`: 日本語版のデータ
- `aboutDataEn`: 英語版のデータ

両方を編集することで，言語切り替えに対応できます．

## 使用されているコンポーネント

データは以下のコンポーネントで表示されます：

- `ExperienceSection.astro`: 経歴の表示
- `EducationSection.astro`: 学歴の表示
- `PublicationSection.astro`: 出版物の表示 (カードタイプ)
- `CertificationSection.astro`: 資格の表示 (カードタイプ)
- `MiscSection.astro`: その他の表示 (カードタイプ)
- `HobbySection.astro`: 趣味の表示 (タグ形式)

これらのコンポーネントを変更することで，表示スタイルをカスタマイズできます．
