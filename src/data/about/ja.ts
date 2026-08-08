import type { AboutData } from './types';

export const aboutDataJa: AboutData = {
  bio: [
    'ソフトウェアエンジニアとして，アプリケーションの開発や，開発プロセスの内製化支援のお仕事をしています．アプリケーションのコーディングからパブリッククラウドまで，なんでも幅広くやっています．最近は DevOps の実践に関心があります．',
    '技術やツールのブラックボックスになっている部分，それらを裏付ける理論計算機科学や数理論理学，関数型プログラミングなどにも興味があります．お気に入りのプログラミング言語は Standard ML です．(流行りの Machine Learning ではなく Meta Language です．)',
    '人 (開発者にもユーザにも) に優しいプログラミング言語やツール，それらを醸成してきた人々を尊敬しています．今後の普及や発展に自分も貢献できたらなと思っています．コミュニティや OSS に支えられながらの日々ですが，これまで享受してきたぶん，還元していけたらなというのが目標です．',
  ],
  experiences: [
    {
      period: '2025-06 - 現在',
      company: '株式会社スリーシェイク - Sreake 事業部',
      companyLink: 'https://3-shake.com/',
      role: 'アプリケーション開発支援チーム (Full Stack)',
      description:
        'アプリケーションの開発やクラウドネイティブな開発プロセスの内製化支援をやっています．',
    },
    {
      period: '2022-04 - 2025-05',
      company: '株式会社ソニックムーブ - 開発部 (Solution 事業)',
      companyLink: 'https://sonicmoov.com/',
      role: 'ソフトウェアエンジニア (Web Backend / Public Cloud)',
      description:
        'Web アプリケーションの受託開発やレガシーなシステムのリプレイスなどをやっていました．',
    },
  ],
  educations: [
    {
      period: '2020-04 - 2022-03',
      institution: '新潟大学 大学院 自然科学研究科 電気情報工学専攻 情報工学コース',
      degree: '修士 (工学)',
      description:
        'プログラミング言語の基礎理論 (特に「項書き換えシステム」という計算モデルの性質) を研究していました．',
    },
    {
      period: '2016-04 - 2020-03',
      institution: '新潟大学 工学部 情報工学科',
      degree: '学士 (工学)',
      description: 'プログラムを書くことだけでなくコンピュータの仕組みを知ることが好きでした．',
    },
    {
      period: '2013-04 - 2016-03',
      institution: '福島県立安積高等学校 普通科',
    },
  ],
  writings: [
    {
      category: 'Thesis',
      items: [
        {
          title: '置換に関する不動点制約を用いた名目書き換え (修士論文)',
          url: 'https://doc.silasol.la/thesis/mthesis.pdf',
          description:
            '名目書き換えシステム (Nominal Rewriting System) という計算モデルの性質についてです．PPL 2022 (第24回プログラミングおよびプログラミング言語ワークショップ) でも発表しました．',
          date: '2022-03-31',
        },
      ],
    },
    {
      category: 'Articles',
      items: [
        {
          title: 'Zanzibar モデルで考えるグラフの単調性と権限追記の安全性',
          url: 'https://sreake.com/blog/graphs-monotonicity-and-permission-safety-on-zanzibar-model/',
          description:
            '職場の Tech Blog です．Google Zanzibar の権限モデルを題材に，Relation Tuple を有向グラフとして捉え権限判定をパスの到達性に帰着させる流れや，否定 (差集合) が単調性を崩し分散環境で事故を招くこと (CALM 定理) を見ていきます．',
          date: '2026-06-22',
        },
        {
          title: 'TrueTime だけではない Spanner クエリエンジンの役割',
          url: 'https://sreake.com/blog/spanner-query-engine-functionability/',
          description:
            '職場の Tech Blog です．Spanner は整合性を保つ部分がよく語られますが，今回はコンピュート層が性能を稼ぐ仕組みに着目し，Distributed Union や Batched Apply Join，Restart Token，Ressi といったクエリエンジンの工夫を掘り下げています．',
          date: '2026-06-22',
        },
        {
          title: 'Firestore の競合解決とデータモデルの選択',
          url: 'https://sreake.com/blog/firestore-conflict-resolution-and-data-model-selection/',
          description:
            '職場の Tech Blog です．Firestore のオフライン競合解決を CRDT と比較して，競合解決の責任を持たせる設計の違いを考えます．',
          date: '2026-06-22',
        },
        {
          title: 'Sreake 活用事例の紹介 (TIIS さま, インタビュー記事)',
          url: 'https://sreake.com/case/tiis/',
          description:
            '職場の顧客案件における事例紹介です．アプリケーション開発のモダナイゼーション支援をやっております．',
          date: '2026-06-17',
        },
        {
          title: '順序の不確実性と決定性 〜 Cloud Dataflow における可換モノイド',
          url: 'https://sreake.com/blog/commutative-monoid-on-cloud-dataflow/',
          description:
            '職場の Tech Blog です．Cloud Dataflow のパイプラインの安定性に可換モノイドの構造が見える話です．',
          date: '2026-04-27',
        },
        {
          title: '地球規模の「時間のずれ」を Cloud Spanner はどう解決したか',
          url: 'https://sreake.com/blog/how-cloud-spanner-deal-with-large-scale-time-diff/',
          description:
            '職場の Tech Blog です．Cloud Spanner のコアアーキテクチャについて，マルチリージョン構成を支える分散合意 (Paxos) や原子時計を用いた TrueTime の仕組みなど Google Cloud のブラックボックスを掘り下げています．',
          date: '2025-12-16',
        },
      ],
    },
  ],
  talks: [
    {
      title:
        '2026 年に読む "The Definition of Standard ML" 〜 現代の堅牢なソフトウェア設計の源流として',
      event: '関数型まつり 2026',
      eventUrl: 'https://2026.fp-matsuri.org/',
      date: '2026-07-12',
      slideUrl: 'https://doc.silasol.la/talks/2026-07-12_fp-matsuri/slides.pdf',
      description:
        '関数型プログラミングのカンファレンスです．コアスタッフおよび登壇者としての参加でした．Standard ML の形式的な仕様から，ソフトウェア開発におけるヒントを探る試みです．',
    },
    {
      title: 'HKT のない言語で Monad をどう表現するか 〜 Standard ML の場合',
      event: 'λ Kansai in Summer 2026',
      eventUrl: 'https://lambda-kansai.connpass.com/event/385059/',
      date: '2026-06-13',
      slideUrl: 'https://doc.silasol.la/talks/2026-06-13_lambda-kansai/slides.pdf',
      postSlug: '2026-06-14-01_sml-type-class',
      description:
        '大阪に行って Haskell の型クラスや Monad を Standaed ML でやろうとする話をしてきました．',
    },
    {
      title: '先達もすなる仕様駆動といふものを、オタクもしてみむとてするなり。',
      event: 'AI を紡ぐ者たち #1',
      eventUrl: 'https://3-shake.connpass.com/event/391906/',
      date: '2026-05-20',
      slideUrl: 'https://doc.silasol.la/talks/2026-05-20_3-shake_ai-1/slides.pdf',
      postSlug: '2026-05-20-01_3-shake-ai-1',
      description:
        '職場で開催された勉強会です．仕様駆動開発を実務としてやっていて感じたことを話しました．',
    },
  ],
  certifications: [
    {
      category: 'Google Cloud',
      note: '2026-02-14: 全冠しました！',
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
          name: 'Professional Security Operations Engineer',
          credlyUrl: 'https://www.credly.com/badges/4a1c0765-ebd9-402a-abc8-6614bd4643d1',
          badgeImage:
            'https://images.credly.com/size/680x680/images/59ad6615-4b4c-4508-88f5-0c397597f437/blob',
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
      category: 'AWS',
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
            '自然演繹体系でトートロジーを証明しています．背理法や二重否定の除去などを使わないと証明できない (証明は省略) ものを扱っています．',
        },
        {
          name: '様相論理の体系と Lindenbaum の補題',
          url: 'https://doc.silasol.la/logic/sys-modal.pdf',
          description:
            '様相論理の体系を定義して Lindenbaum の補題を導きます．様相論理と言いつつ極大理論を作る話がメインです．',
        },
      ],
    },
    {
      category: 'Tools',
      items: [
        {
          name: 'Functional Programming in SML (関数型まつり 2026 ハンズオン)',
          url: 'https://github.com/fp-matsuri/fp-in-scala-exercises/tree/main/fp-in-sml',
          description:
            'Functional Programming in Scala の演習を Standard ML でやっていくハンズオン教材です．SML を書いたことがなくても前提知識の準備から始められます．なるべく処理系に依存した機能は避けて，MLton と SML/NJ の両方で動くようにしています．',
        },
        {
          name: 'Bluesky の投稿を消すやつ',
          url: 'https://github.com/silasolla/bsky-delete-bot',
          description:
            '自分の発言を削除して責任逃れをするための簡単な Python スクリプトです．GitHub Actions で Workflow を動かして定期実行できます．',
        },
        {
          name: '退職届を作るやつ',
          url: 'https://gist.github.com/silasolla/806c4c50702fd743ef6789cedeea84cb',
          description: '退職届 (PDF) を作るための LuaLaTeX のコードスニペットです．',
        },
        {
          name: '項書き換え系を完備化するやつ',
          url: 'https://github.com/silasolla/knuth-bendix',
          description:
            'Standard ML で書いた一階項書き換え系を操作する CLI ツールです．MLton で実行形式にコンパイルできます．',
        },
        {
          name: '証明写真のリストを作るやつ',
          url: 'https://gist.github.com/silasolla/48e34b90dfa9651a22b66efc61ef4bbc',
          description:
            '写真データを縮小して単一の PDF ファイルに並べます．コンビニプリントして切り取ることで印刷代をケチることができます．',
        },
        {
          name: 'Brainf*ck のインタプリタ',
          url: 'https://github.com/silasolla/smlbf',
          description: 'Standard ML で書いたインタプリタです．',
        },
        {
          name: 'もけ寄生',
          url: 'https://github.com/silasolla/moke',
          description: 'Gleam で簡単な CSR ページを作りました．Cloudflare Pages にデプロイします．',
        },
        {
          name: '担々麺屋',
          url: 'https://assets.silasol.la/extra/tangtang.html',
          description: '担々麺屋に行きたくなるページです．Matrix Canvas Code を参考にしています．',
        },
      ],
    },
  ],
  hobbies: [
    {
      name: 'Standard ML',
      note: 'モジュールシステムや実直な仕様がお気に入りです．思い入れがある．',
    },
    {
      name: '関数型プログラミング',
      note: 'OCaml, Haskell, Racket, Gleam, Koka など．とりわけ ML 系言語が好き．',
    },
    {
      name: '型システムや定理証明',
      note: '型自体の強さと扱いやすさ (型推論など) のバランスは大事だと思う．',
    },
    {
      name: '音楽鑑賞',
      note: '古楽から現代音楽や民謡まで幅広く．King Gnu (常田さん) リスペクトです．',
    },
    {
      name: '楽器演奏や歌うこと',
      note: '中学から大学まで Tuba をやっていた．実家に帰省したらピアノを練習する．',
    },
    { name: '数学', note: '計算は得意じゃないけれど証明を追うのは好き．数理論理学に関心がある．' },
    {
      name: '国内旅行',
      note: '直近は，高知 (四万十/足摺) や浜松 (天竜二俣) や三島，熱海 (初島) など．',
    },
    { name: '散歩', note: 'かなり長く歩けて，浅草 ~ 新宿は余裕，2 日で 42.195 × 2 km 歩いたり．' },
    { name: '日本庭園', note: '四季折々の景観が楽しいです (浜離宮恩賜庭園の年パス持ってます)．' },
    { name: '読書', note: '理工書や謎雑学など．SF なら藤子F不二雄の短篇や柞刈湯葉さんが好き．' },
    {
      name: 'けろけろけろっぴ',
      note: 'サンリオの人気投票では毎年入れています (最近は不調みたいでつらい)．',
    },
    { name: '科博', note: '直近だと鳥展から超危険生物展まで，特別展は毎回ずっと見に行っています' },
    {
      name: '神保町のカレー',
      note: '疲れているときに共栄堂のスマトラカレーを食べると，ありえん美味い．',
    },
    {
      name: 'おいしいもの',
      note: '揚げたての天麩羅や刺身，あっさり系のラーメン，トマトジュース (無塩) など．',
    },
    {
      name: 'ビール',
      note: '天然素材の液体でこんな黄金だと神に祝福されているなと．(not 任意の酒)',
    },
    {
      name: 'カフェ通い',
      note: 'カフェ「巡り」とは似て異なります．お気に入りのお店にたくさん行きます．',
    },
    {
      name: 'アニメ',
      note: 'ごちうさ，ゆるキャン△，重めのだと，まどマギ，サイコパス1期が好きです．',
    },
    {
      name: 'ドラえもん',
      note: '大長編は全部持っているし，映画は小さい頃から劇場で見ていました．',
    },
    { name: 'ゲーム', note: 'サルゲッチュ，ロマサガ，オクトラ，ドラクエ7，深夜廻などが好きです．' },
    {
      name: '言葉遊び',
      note: '自己言及文，回文，駄洒落，あとは語録ごっこで遊ぶのなんかも好きです．',
    },
    { name: '自分', note: '他人に優しく，自分にはちょー優しい．' },
  ],
};
