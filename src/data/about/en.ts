import type { AboutData } from './types';

export const aboutDataEn: AboutData = {
  bio: [
    "As a software engineer, I specialize in application development and supporting organizations in bringing their development processes in-house. My work spans the full spectrum—from application coding to public cloud infrastructure. Recently, I've been focused on putting DevOps practices into action.",
    'I have a strong interest in the theoretical side of computing—fields like theoretical computer science, mathematical logic, and functional programming—which help uncover the "black box" mechanisms behind the tools we use. My favorite programming language is Standard ML (that\'s Meta Language, not Machine Learning!).',
    'I deeply respect programming languages and tools that are kind to people (both developers and users) and the communities that have nurtured them. Supported by the open-source ecosystem, my goal is to give back to the community as much as I have gained.',
  ],
  experiences: [
    {
      period: 'June 2025 - Present',
      company: '3-shake Inc. - Sreake',
      companyLink: 'https://3-shake.com/en/',
      role: 'Application Development Support (Full Stack)',
      description:
        'Providing hands-on support for application development and facilitating the internalization (in-housing) of cloud-native development processes for client teams.',
    },
    {
      period: 'April 2022 - May 2025',
      company: 'Sonicmoov Co., Ltd. - Solution Division',
      companyLink: 'https://sonicmoov.com/',
      role: 'Software Engineer (Web Backend / Public Cloud)',
      description:
        'Engaged in client-facing web application development and led the modernization of legacy systems (system replacement/refactoring).',
    },
  ],
  educations: [
    {
      period: 'April 2020 - March 2022',
      institution: 'Graduate School of Science and Technology, Niigata University',
      degree: 'Master of Engineering',
      description:
        'Researched the foundational theory of programming languages, specifically investigating the computational properties of Term Rewriting Systems.',
    },
    {
      period: 'April 2016 - March 2020',
      institution:
        'Faculty of Engineering, Department of Information Engineering, Niigata University',
      degree: 'Bachelor of Engineering',
      description:
        'Studied Computer Science systematically, with a passion not just for writing code, but for understanding the underlying mechanisms of computers.',
    },
    {
      period: 'April 2013 - March 2016',
      institution: 'Fukushima Prefectural Asaka Senior High School',
    },
  ],
  writings: [
    {
      category: 'Thesis',
      items: [
        {
          title: "Master's Thesis: Nominal Rewriting with Permutation Fixed Point Constraints",
          url: 'https://doc.silasol.la/thesis/mthesis.pdf',
          description:
            'A study on the properties of a computational model known as the Nominal Rewriting System. Also presented at PPL 2022 (Programming and Programming Languages Workshop).',
          date: 'March 2022',
        },
      ],
    },
    {
      category: 'Articles',
      items: [
        {
          title: 'Graph Monotonicity and the Safety of Permission Additions in the Zanzibar Model',
          url: 'https://sreake.com/blog/graphs-monotonicity-and-permission-safety-on-zanzibar-model/',
          description:
            "A post from my company's Tech Blog. Using Google Zanzibar's authorization model, I treat relation tuples as a directed graph and reduce permission checks to reachability, then explore how negation (set difference) breaks monotonicity and can cause incidents in distributed systems (the CALM theorem).",
          date: 'June 2026',
        },
        {
          title: 'Beyond TrueTime: The Role of the Spanner Query Engine',
          url: 'https://sreake.com/blog/spanner-query-engine-functionability/',
          description:
            "A post from my company's Tech Blog. Rather than the storage layer that guarantees consistency, I focus on the compute layer that earns performance, exploring query engine techniques such as Distributed Union, Batched Apply Join, Restart Token, and Ressi.",
          date: 'June 2026',
        },
        {
          title: 'Firestore Conflict Resolution and Choosing a Data Model',
          url: 'https://sreake.com/blog/firestore-conflict-resolution-and-data-model-selection/',
          description:
            "A post from my company's Tech Blog. I compare Firestore's offline conflict resolution (last write wins and Field transform) with CRDTs (G-Counter, RGA, etc.), exploring the design difference of where the responsibility for conflict resolution should live.",
          date: 'June 2026',
        },
        {
          title: 'Sreake Use Case (Interview with TIIS)',
          url: 'https://sreake.com/case/tiis/',
          description:
            'A case study from a client project at my company. It involves providing support for the modernization of application development.',
          date: 'June 2026',
        },
        {
          title: 'Commutative Monoids in Cloud Dataflow',
          url: 'https://sreake.com/blog/commutative-monoid-on-cloud-dataflow/',
          description:
            "A post from my company's Tech Blog. It discusses how commutative monoid structures contribute to the stability of Cloud Dataflow pipelines.",
          date: 'April 2026',
        },
        {
          title: 'How Cloud Spanner Solved the Global "Time Lag"',
          url: 'https://sreake.com/blog/how-cloud-spanner-deal-with-large-scale-time-diff/',
          description:
            "A post from my company's Tech Blog. Unlocking the Google Cloud black box: A deep dive into Cloud Spanner's architecture. I examine the inner workings of TrueTime (atomic clocks) and Paxos-based distributed consensus that make multi-region deployments possible.",
          date: 'December 2025',
        },
      ],
    },
  ],
  talks: [
    {
      title: 'How to Represent Monads in a Language Without HKTs: The Case of Standard ML',
      event: 'λ Kansai in Summer 2026',
      eventUrl: 'https://lambda-kansai.connpass.com/event/385059/',
      date: 'June 13, 2026',
      slideUrl: 'https://doc.silasol.la/talks/2026-06-13_lambda-kansai/slides.pdf',
      postSlug: '2026-06-14-01_sml-type-class',
      description:
        'A functional programming event held in Osaka. Shared an attempt to implement Haskell-like type classes and Monads in Standard ML.',
    },
    {
      title: 'Reflections on Practicing Spec-Driven Development',
      event: 'AI を紡ぐ者たち #1',
      eventUrl: 'https://3-shake.connpass.com/event/391906/',
      date: 'May 20, 2026',
      slideUrl: 'https://doc.silasol.la/talks/2026-05-20_3-shake_ai-1/slides.pdf',
      postSlug: '2026-05-20-01_3-shake-ai-1',
      description:
        'Spoke at the meetup hosted by 3-shake Inc., sharing my reflections on adopting spec-driven development in real-world projects.',
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
          name: 'Applied Information Technology Engineer Examination',
        },
      ],
    },
  ],
  misc: [],
  hobbies: [],
};
