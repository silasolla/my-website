declare module './plugins/rehype-link-card-target.mjs' {
  import type { Root } from 'hast';
  export function rehypeLinkCardTarget(): (tree: Root) => void;
}

declare module './plugins/rehype-external-links.mjs' {
  import type { Root } from 'hast';
  export function rehypeExternalLinks(): (tree: Root) => void;
}

declare module './plugins/remark-image-url.mjs' {
  import type { Root } from 'mdast';
  export function remarkImageUrl(): (tree: Root) => void;
}
