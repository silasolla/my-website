import { visit } from 'unist-util-visit';

/**
 * rehypeプラグイン: 外部リンクに target="_blank" と rel="noopener noreferrer" を追加
 */
export function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // aタグを探す
      if (node.tagName === 'a' && node.properties && node.properties.href) {
        const href = node.properties.href;

        // 外部リンクかどうかを判定
        // - http:// または https:// で始まる
        // - mailto:, tel: などのプロトコルは除外
        // - 相対パス（/で始まる）や #（アンカー）は除外
        const isExternalLink =
          typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'));

        if (isExternalLink) {
          // target="_blank"とrel="noopener noreferrer"を追加
          node.properties.target = '_blank';
          node.properties.rel = 'noopener noreferrer';
        }
      }
    });
  };
}
