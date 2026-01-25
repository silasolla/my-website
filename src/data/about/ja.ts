import type { AboutData } from './types';

export const aboutDataJa: AboutData = {
  experiences: [
    {
      period: '2025年6月 - 現在',
      company: '株式会社スリーシェイク - Sreake 事業部',
      companyLink: 'https://3-shake.com/',
      role: 'アプリケーション開発支援チーム (Full Stack)',
      description:
        'アプリケーションの開発やクラウドネイティブな開発プロセスの内製化支援をやっています．',
    },
    {
      period: '2022年4月 - 2025年5月',
      company: '株式会社ソニックムーブ - 開発部 (Solution 事業)',
      companyLink: 'https://sonicmoov.com/',
      role: 'ソフトウェアエンジニア (Web Backend / Public Cloud)',
      description:
        'Web アプリケーションの受託開発やレガシーなシステムのリプレイスなどをやっていました．',
    },
  ],
  educations: [
    {
      period: '2020年4月 - 2022年3月',
      institution: '新潟大学 大学院 自然科学研究科 電気情報工学専攻 情報工学コース',
      degree: '修士 (工学)',
      description:
        'プログラミング言語の基礎理論の研究をしており「項書き換えシステム」という計算モデルの性質を調べていました．',
    },
    {
      period: '2016年4月 - 2020年3月',
      institution: '新潟大学 工学部 情報工学科',
      degree: '学士 (工学)',
      description:
        '学生として情報工学を体系的に学んでいました．プログラムを書くことだけでなくコンピュータの仕組みを知ることが好きでした．',
    },
    {
      period: '2013年4月 - 2016年3月',
      institution: '福島県立安積高等学校 普通科',
    },
  ],
  writings: [
    {
      category: 'Thesis',
      items: [
        {
          title: '修士論文：置換に関する不動点制約を用いた名目書き換え',
          url: 'https://doc.silasol.la/thesis/mthesis.pdf',
          description:
            '名目書き換えシステム (Nominal Rewriting System) という計算モデルの性質について．\nPPL 2022 (第24回プログラミングおよびプログラミング言語ワークショップ) でも発表しました．',
          date: '2022年3月',
        },
      ],
    },
    {
      category: 'Articles',
      items: [
        {
          title: 'Tech Blog：地球規模の「時間のずれ」を Cloud Spanner はどう解決したか',
          url: 'https://sreake.com/blog/how-cloud-spanner-deal-with-large-scale-time-diff/',
          description:
            '職場の Tech Blog です．Cloud Spanner のコアアーキテクチャについて，マルチリージョン構成を支える分散合意 (Paxos) や原子時計を用いた TrueTime の仕組みなど Google Cloud のブラックボックスを掘り下げています．',
          date: '2025年12月',
        },
      ],
    },
  ],
  certifications: [
    {
      category: 'Google Cloud Certifications',
      items: [
        {
          name: 'Professional Cloud Architect',
          credlyUrl: 'https://www.credly.com/badges/8ff07024-e4bf-436f-b7b3-768d7be2a2aa',
          badgeImage:
            'https://images.credly.com/size/680x680/images/d96faaa1-8c14-4d2d-8927-46f33ccf4523/image.png',
        },
        {
          name: 'Professional Cloud Database Engineer',
          credlyUrl: 'https://www.credly.com/badges/a2865c33-33ba-44c7-9920-00125391e438',
          badgeImage:
            'https://images.credly.com/size/680x680/images/b170e960-57d8-4c4a-883d-21b9e420b9dd/image.png',
        },
        {
          name: 'Professional Cloud Developer',
          credlyUrl: 'https://www.credly.com/badges/b37ff2c8-763e-4722-bf75-cd01f98619ad',
          badgeImage:
            'https://images.credly.com/size/680x680/images/10227907-54b6-466f-a52c-1a26948f0aaf/image.png',
        },
        {
          name: 'Professional Data Engineer',
          credlyUrl: 'https://www.credly.com/badges/cc52b7f1-2724-4f13-89ea-1ce4877d4525',
          badgeImage:
            'https://images.credly.com/size/680x680/images/d7d0d0f5-ea0b-4b3f-a76f-93934726573d/image.png',
        },
        {
          name: 'Professional Cloud DevOps Engineer',
          credlyUrl: 'https://www.credly.com/badges/7d6f2e07-7d1d-462b-b0c1-553a4dc8a95a',
          badgeImage:
            'https://images.credly.com/size/680x680/images/9baf2afb-e107-4acc-b886-5d8112581e73/image.png',
        },
        {
          name: 'Professional Cloud Security Engineer',
          credlyUrl: 'https://www.credly.com/badges/31b27d82-53b2-4541-b7af-d7804011d5a0',
          badgeImage:
            'https://images.credly.com/size/680x680/images/7bb9dc2d-53b4-412c-8bc7-8ea90556710d/image.png',
        },
        {
          name: 'Professional Cloud Network Engineer',
          credlyUrl: 'https://www.credly.com/badges/153e7bcb-7a89-4159-b7e4-c77e8e606ad5',
          badgeImage:
            'https://images.credly.com/size/680x680/images/fd53cb0e-6622-4a14-a7d0-5793c8703a4c/image.png',
        },
        {
          name: 'Professional Machine Learning Engineer',
          credlyUrl: 'https://www.credly.com/badges/a6392b42-8cc0-4a4c-a386-4cea63e5af58',
          badgeImage:
            'https://images.credly.com/size/680x680/images/00096281-8052-4cf1-b412-37702a94b539/image.png',
        },
        {
          name: 'Associate Cloud Engineer',
          credlyUrl: 'https://www.credly.com/badges/2c9c34f4-88e6-4267-8bb2-08394f2f08f5',
          badgeImage:
            'https://images.credly.com/size/680x680/images/f6c4798e-59c9-4e94-8383-58a9041e8a7f/image.png',
        },
        {
          name: 'Associate Google Workspace Administrator',
          credlyUrl: 'https://www.credly.com/badges/d8ef26fa-4b5a-48d2-87f8-cf09a3fe78d1',
          badgeImage:
            'https://images.credly.com/size/680x680/images/4a0f7e87-a666-4c11-8c3e-49559e7295c9/blob',
        },
        {
          name: 'Associate Data Practitioner',
          credlyUrl: 'https://www.credly.com/badges/2e762901-4f25-4fc8-94c8-fdd07565d483',
          badgeImage:
            'https://images.credly.com/size/680x680/images/3e3f6d8b-b37e-4a3d-93d0-6f2bafa5f03c/blob',
        },
        {
          name: 'Cloud Digital Leader',
          credlyUrl: 'https://www.credly.com/badges/e8100325-44d7-4cf3-97df-c6188df15e74',
          badgeImage:
            'https://images.credly.com/size/680x680/images/300d4058-0dbd-47b1-96ad-63ff89e41d2b/image.png',
        },
        {
          name: 'Generative AI Leader',
          credlyUrl: 'https://www.credly.com/badges/a85fb04a-ed20-4087-bd9a-0280d2aaf94e',
          badgeImage:
            'https://images.credly.com/size/680x680/images/aae35976-6fff-441c-9ecc-186d56f6f669/blob',
        },
      ],
    },
    {
      category: 'AWS Certifications',
      items: [
        {
          name: 'Solutions Architect - Associate',
          credlyUrl: 'https://www.credly.com/badges/7aa4497b-dfd6-4de6-8f1c-feb6d54394be',
          badgeImage:
            'https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
        },
        {
          name: 'SysOps Administrator - Associate',
          credlyUrl: 'https://www.credly.com/badges/d074dde9-3c79-4167-8e84-e3c7af83009c',
          badgeImage:
            'https://images.credly.com/size/680x680/images/f0d3fbb9-bfa7-4017-9989-7bde8eaf42b1/image.png',
        },
        {
          name: 'Cloud Practitioner - Foundational',
          credlyUrl: 'https://www.credly.com/badges/bdb601e7-1fa4-4d34-9384-dccc8586adcd',
          badgeImage:
            'https://images.credly.com/size/680x680/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
        },
        {
          name: 'AI Practitioner - Foundational',
          credlyUrl: 'https://www.credly.com/badges/efb6e86c-7499-4ed2-8b60-460efb24646a',
          badgeImage:
            'https://images.credly.com/size/680x680/images/4d4693bb-530e-4bca-9327-de07f3aa2348/image.png',
        },
      ],
    },
    {
      category: 'Information Technology Engineers Examination (ITEE)',
      items: [
        {
          name: '応用情報技術者試験 合格',
        },
      ],
    },
  ],
  misc: [
    {
      category: 'Notes',
      items: [
        {
          name: '構成的に証明できないトートロジー',
          url: 'https://doc.silasol.la/logic/daily-shinjiro.pdf',
          description:
            'トートロジーの自然演繹体系での証明木集です．\n背理法や二重否定の除去などを使わないと証明できない (証明は省略) ものを扱っています．',
        },
        {
          name: '様相論理の体系と Lindenbaum の補題',
          url: 'https://doc.silasol.la/logic/sys-modal.pdf',
          description:
            '様相論理の体系の定義から始まって Lindenbaum の補題を導きます．\n様相論理と言いつつ極大理論を作る話がメインです．',
        },
      ],
    },
    {
      category: 'Tools',
      items: [
        {
          name: 'Bluesky の投稿を消すやつ',
          url: 'https://github.com/silasolla/bsky-delete-bot',
          description:
            '自分の発言を削除して責任逃れをするための簡単な Python スクリプト．\nGitHub Actions で Workflow を動かして定期実行できます．',
        },
        {
          name: '退職届を作るやつ',
          url: 'https://gist.github.com/silasolla/806c4c50702fd743ef6789cedeea84cb',
          description: '退職届 (PDF) を作るための LuaLaTeX コードスニペットです．',
        },
        {
          name: '項書き換え系を完備化するやつ',
          url: 'https://github.com/silasolla/knuth-bendix',
          description:
            'Standard ML で書いた一階項書き換え系を操作する UNIX コマンドです．\nMLton でコンパイルします．',
        },
        {
          name: '証明写真のリストを作るやつ',
          url: 'https://gist.github.com/silasolla/48e34b90dfa9651a22b66efc61ef4bbc',
          description:
            '写真データを縮小して PDF ファイルに並べます．\nコンビニプリントして切り取ることで印刷代をケチることができます．',
        },
        {
          name: 'Brainf*ck のインタプリタ',
          url: 'https://github.com/silasolla/smlbf',
          description:
            'すべての人類が一生に一度は書くことで知られるインタプリタです．\nStandard ML で書いてます．',
        },
        {
          name: '担々麺屋',
          url: 'https://assets.silasol.la/extra/tangtang.html',
          description:
            '担々麺屋に行きたくなるページです．\nMatrix Canvas Code (https://gigazine.net/news/20130321-matrix-javascript/) を真似しました．',
        },
      ],
    },
  ],
  hobbies: [
    {
      name: 'Standard ML',
      note: 'ゆるく関数型．操作的意味論すごい！ HM 型推論すごい！手続き型との良いとこ取りすごい！ SML# 頑張れ！',
    },
    {
      name: 'Haskell',
      note: 'はじめて関数型プログラミングするときに触った．遅延評価！お仕事で使うのがあこがれ．',
    },
    { name: 'Elm', note: 'コンパイルエラーが丁寧ですごい！ゴリゴリ書かなきゃなスタイル．' },
    { name: 'Racket', note: 'Scheme! Homoiconicity! call/cc! shift/reset!' },
    { name: 'Koka', note: '代数的エフェクトの．勉強中！' },
    {
      name: '型システム',
      note: '推論が柔軟に動くレベルのと依存型くらい表現力強いのを適材適所で．',
    },
    { name: '定理証明支援系', note: 'Isabelle/HOL の本読んでた．Lean, Agda, Idris など勉強中．' },
    { name: '音楽', note: 'クラシックや現代音楽から世界の民謡やロックバンドまで幅広く聴きます．' },
    {
      name: 'クラシック音楽',
      note: 'Alkan, Liszt, Brahms, Bruckner, Franck, Sibelius, Webern, Varèse, Messiaen, Xenakis, Penderecki, Crumb, 諸井三郎, 湯浅譲二あたりが好きです．',
    },
    {
      name: 'King Gnu',
      note: 'どのアルバムも何周したかわからんくらい聴きました．Millennium Parade も好きです．常田大希さんリスペクトです．',
    },
    {
      name: 'Tuba',
      note: '中学校から大学までやっていました．デカすぎて個人所有が厳しいですがベースラインに耳が行きがち．',
    },
    {
      name: 'ピアノ',
      note: '母が実家でピアノ教室やってたので帰省したときに練習してます．ガチ勢じゃないのであんまり．',
    },
    {
      name: '数学',
      note: '計算より証明を追うのが好き．数理論理学に一番興味ありますが，メタじゃないのもやります．',
    },
    {
      name: '国内旅行',
      note: '知らない景色や根付いた文化を見に行くのが好きです．最近は静岡県 (熱海, 初島, 沼津, 三島, 三保松原, 三島, 天竜二俣など) を攻めてます．',
    },
    {
      name: '散歩',
      note: '街並みを見ながら尋常じゃないくらい歩きます．2日で 42.195 × 2 km 歩いたり，浅草から新宿まで歩いたりもします．',
    },
    {
      name: '日本庭園',
      note: '四季折々の景観が楽しいです．草花や野鳥を眺めながら，のんびりと歩いています．浜離宮恩賜庭園の年パス持ってる．',
    },
    {
      name: '読書',
      note: 'コンピュータや数学などの理工書がメインですが，藤子F不二雄のSF短篇集や謎雑学本もよく読みます．最近は柞刈湯葉さんとか．',
    },
    {
      name: 'けろけろけろっぴ',
      note: 'サンリオ人気投票で毎年投票してます (有象無象に負けるな)．部屋のカーテンも文房具もよく使う LINE スタンプも全部けろっぴです．',
    },
    {
      name: '科博',
      note: '特別展に毎回行っています．いつも展示のボリュームが凄くて，たくさん新しいこと知れたなって満足してます．',
    },
    {
      name: '神保町のカレー',
      note: '最近は共栄堂のスマトラカレーにハマってます．疲れているときに食べるとありえん美味い．',
    },
    { name: 'トマトジュース', note: '塩分が無添加のやつ．' },
    { name: '魚', note: '旅行で海の近くに行ったときに食べるお刺身ほど美味いものはない．' },
    { name: '天麩羅', note: '目の前で揚げてもらったやつありえん美味い．' },
    { name: 'ラーメン', note: 'あっさり系のシンプル醤油ラーメンが好き．' },
    {
      name: 'ビール',
      note: '天然素材でこんなに金色の液体ってあるだろうか．神に祝福されている．クラフトビールやビアカクテルも．(not 任意の酒)',
    },
    { name: '甘いもの', note: 'すきだけどおでぶに．' },
    { name: 'カフェ通い', note: 'カフェ「巡り」ではない．お気に入りのお店にたくさん行きます．' },
    { name: 'ごちうさ', note: '救われました．' },
    { name: 'ゆるキャン△', note: 'おもしろい．実写も良かった．' },
    { name: 'まどマギ', note: '脚本とキャラデザと音楽と演出と総合芸術．' },
    { name: 'ドラえもん', note: '大長編ドラえもん全部持っている．映画も映画館で見ていた．' },
    {
      name: 'ゲーム',
      note: 'シナリオやゲームシステムや音楽に引き込まれる．好きなゲームはサルゲッチュ，ロマサガ，オクトラ，ドラクエ7，深夜廻など．',
    },
    {
      name: '言葉遊び',
      note: '自己言及文，部分文字列，回文，駄洒落，(何のとは言わないけれど) 語録遊びなど．',
    },
    { name: '自分', note: '他人に優しく，自分には更に優しい．' },
  ],
};
