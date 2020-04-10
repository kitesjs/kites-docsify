const path = require('path');
const Renderer = require('docsify-server-renderer');
const readFileSync = require('fs').readFileSync;
const serveStatic = require('serve-static');

/**
 * Docsify extension
 */
module.exports = function docsify(kites) {

  // if (!kites.options.ssrDocsify) {
  //   kites.logger.info('Disable Docsify SSR!');
  //   return;
  // }

  // init
  const template = readFileSync(path.join(kites.options.appDirectory, 'docs/index.html'), 'utf-8');
  const renderer = new Renderer({
    template: template,
    maxAge: 60 * 60 * 1000, // lru-cache config
  });

  // config ssr.
  kites.on('express:config', (app) => {
    app.use((req, res) => serveStatic(kites.options.express.static)(req, res, () => {
      if (
        /\.(jpg|jpeg|gif|png|svg|ico|mp4|webm|ogg|ogv|js|css|md)(?:\?v=[0-9.]+)?$/.test(
          req.url
        )
      ) {
        res.writeHead(404)
        res.end()
      } else {
        const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
        // TODO: Resole ERROR
        renderer.renderToString(url)
          .then(html => {
            kites.logger.info('Request: ' + req.url);
            res.end(html);
          })
          .catch(err => {
            kites.logger.error(`Request: ${req.url} - Error: ${err}`);
            res.status(500);
            res.send(err.message);
            res.end();
          })
      }
    }))
  });
}
