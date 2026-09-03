import { createMarkdownProcessor, type MarkdownRenderer } from '@astrojs/markdown-remark';
import type { CollectionEntry } from 'astro:content';
import { resolveImageUrl } from './image';

let processor: Promise<MarkdownRenderer> | undefined;
const getProcessor = () => (processor ??= createMarkdownProcessor({ syntaxHighlight: false }));

const textLink = (text: string, url: string) => `[${text.replace(/[[\]]/g, '')}](${url})`;

const componentMarkdown: Record<string, (attrs: Record<string, string>) => string> = {
  Img: ({ src, alt, caption }) =>
    textLink(`画像: ${[alt, caption].filter(Boolean).join(' — ')}`, resolveImageUrl(src) ?? src),
  Tweet: ({ id, user }) => textLink('ツイート', `https://twitter.com/${user ?? 'x'}/status/${id}`),
  Slide: ({ src, title }) => textLink(`スライド${title ? `: ${title}` : ''}`, src),
};

const protectMath = (chunk: string) =>
  chunk
    .replace(/\$\$([\s\S]+?)\$\$/g, (_match, tex: string) => `\n\`\`\`\n${tex.trim()}\n\`\`\`\n`)
    .replace(/\$([^$\n]+)\$/g, (_match, tex: string) => `\`${tex}\``);

function toMarkdown(entry: CollectionEntry<'posts'>): string {
  const markdown = (entry.body ?? '')
    .replace(/^import .*\n/gm, '')
    .split(/(^```[\s\S]*?^```)/gm)
    .map((chunk, index) => (index % 2 === 0 ? protectMath(chunk) : chunk))
    .join('')
    .replace(/<([A-Z]\w*)\b([^>]*?)\/>/g, (_match, name: string, attrs: string) => {
      const render = componentMarkdown[name];
      if (!render) {
        throw new Error(
          `textView: 未対応のコンポーネント <${name}> (${entry.id}). componentMarkdown に追加してください`
        );
      }
      const pairs = [...attrs.matchAll(/([a-zA-Z]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]);
      return render(Object.fromEntries(pairs));
    });

  const leftover = markdown.replace(/^```[\s\S]*?^```/gm, '').match(/<[A-Z]\w*/);
  if (leftover) {
    throw new Error(
      `textView: 未対応のコンポーネント ${leftover[0]} (${entry.id}). componentMarkdown に追加してください`
    );
  }

  return markdown;
}

export async function renderPostText(entry: CollectionEntry<'posts'>): Promise<string> {
  const { render } = await getProcessor();
  const { code } = await render(toMarkdown(entry));
  return code;
}
