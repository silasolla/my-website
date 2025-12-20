declare module 'remark-link-card' {
  import type { Root } from 'mdast';

  export interface RemarkLinkCardOptions {
    /**
     * Cache images for next/image
     * Automatically save open graph images and favicon images to process.cwd()/public/remark-link-card/
     */
    cache?: boolean;

    /**
     * Display only hostname of target URL
     */
    shortenUrl?: boolean;
  }

  /**
   * Remark plugin to convert text links to link cards
   */
  function remarkLinkCard(options?: RemarkLinkCardOptions): (tree: Root) => void;

  export default remarkLinkCard;
}
