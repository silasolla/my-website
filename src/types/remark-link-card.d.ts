declare module 'remark-link-card' {
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
  function remarkLinkCard(options?: RemarkLinkCardOptions): any;

  export default remarkLinkCard;
}
