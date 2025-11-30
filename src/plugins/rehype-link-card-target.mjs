import { visit } from 'unist-util-visit';

/**
 * rehypeプラグイン: remark-link-cardで生成されたリンクカードに target="_blank" を追加
 */
export function rehypeLinkCardTarget() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // rlc-containerクラスを持つaタグを探す
      if (
        node.tagName === 'a' &&
        node.properties &&
        node.properties.className &&
        node.properties.className.includes('rlc-container')
      ) {
        // target="_blank"とrel="noopener noreferrer"を追加
        node.properties.target = '_blank';
        node.properties.rel = 'noopener noreferrer';
      }
    });
  };
}
