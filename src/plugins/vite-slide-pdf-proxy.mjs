const PROXY_PATH = '/__doc_proxy';
const HTTP_URL = /^https?:\/\//;

/**
 * @param {{ allowedHosts?: string[] }} [options]
 *   allowedHosts: プロキシを許可する配信元ホスト (SLIDE_PROXY_ALLOWED_HOSTS から渡す)．
 *   dev サーバーを ngrok 等で公開しても任意 URL への SSRF プロキシに
 *   ならないよう，未指定ならすべて拒否する．
 */
export function slidePdfProxyPlugin({ allowedHosts = [] } = {}) {
  const allowed = new Set(allowedHosts.filter(Boolean));

  return {
    name: 'slide-pdf-proxy',
    configureServer(server) {
      server.middlewares.use(PROXY_PATH, async (req, res) => {
        const requestUrl = new URL(req.url ?? '', 'http://localhost');
        const target = requestUrl.searchParams.get('url');

        if (!target || !HTTP_URL.test(target)) {
          res.statusCode = 400;
          res.end('Bad Request');
          return;
        }

        if (!allowed.has(new URL(target).hostname)) {
          console.warn(
            `[slide-pdf-proxy] 許可されていないホストへのリクエストを拒否しました: ${target}\n` +
              '  .env の SLIDE_PROXY_ALLOWED_HOSTS にホスト名を追加してください'
          );
          res.statusCode = 403;
          res.end('Forbidden');
          return;
        }

        try {
          const response = await fetch(target);
          res.statusCode = response.status;
          res.setHeader('Access-Control-Allow-Origin', '*');

          const contentType = response.headers.get('content-type');
          if (contentType) {
            res.setHeader('Content-Type', contentType);
          }

          res.end(Buffer.from(await response.arrayBuffer()));
        } catch {
          res.statusCode = 502;
          res.end('Bad Gateway');
        }
      });
    },
  };
}

export function getSlidePdfFetchUrl(src, dev) {
  if (!dev || !HTTP_URL.test(src)) {
    return src;
  }
  return `${PROXY_PATH}?url=${encodeURIComponent(src)}`;
}
