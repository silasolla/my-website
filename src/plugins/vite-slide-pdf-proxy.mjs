const PROXY_PATH = '/__doc_proxy';
const HTTP_URL = /^https?:\/\//;

export function slidePdfProxyPlugin() {
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
