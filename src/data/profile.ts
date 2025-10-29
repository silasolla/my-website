/**
 * プロフィール情報
 * SEO，構造化データ，OGP などで使用
 */

export interface ProfileData {
  name: string;
  nameEn: string;
  username: string;
  usernameJa: string;
  alternateNames: string[];
  jobTitle: string;
  description: string;
  url: string;
  avatar: string;
  social: {
    github?: string;
    bluesky?: string;
    twitter?: string;
  };
}

export const profileData: ProfileData = {
  name: '芳賀 雅樹',
  nameEn: 'Masaki Haga',
  username: 'silasolla',
  usernameJa: 'しらそら',
  alternateNames: ['Masaki Haga', 'silasolla', 'しらそら'],
  jobTitle: 'Software Engineer',
  description:
    'ソフトウェアエンジニアとして，アプリケーションの開発や，開発プロセスの内製化支援のお仕事をしています．',
  url: 'https://silasol.la',
  avatar: '/avatar.png',
  social: {
    github: 'https://github.com/silasolla',
    bluesky: 'https://bsky.app/profile/silasol.la',
  },
};

/**
 * SEO 用のキーワード
 */
export const seoKeywords = [
  '芳賀雅樹',
  '芳賀 雅樹',
  'Masaki Haga',
  'silasolla',
  'しらそら',
  'ソフトウェアエンジニア',
  'Software Engineer',
];
