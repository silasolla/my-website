import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.enum(['news', 'tech', 'diary'])),
    coverImage: z.string().optional(),
    pinned: z.boolean().optional(), // ピン留め
    important: z.boolean().optional(), // 重要なお知らせ
    lang: z.enum(['ja', 'en']).optional(), // 言語 (未定義の場合は両言語版に表示)
  }),
});

export const collections = {
  posts: postsCollection,
};
