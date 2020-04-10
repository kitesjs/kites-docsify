const path = require('path');
const Renderer = require('docsify-server-renderer');
const readFileSync = require('fs').readFileSync;

// init
var renderer = new Renderer({
  template: readFileSync(path.join(__dirname, '../docs/template.html'), 'utf-8')
})

module.exports = function docsify(kites) {
  kites.on('express:config', (app) => {
    app.get('/*', (req, res) => {
      renderer.renderToString(req.url)
        .then(html => {
          res.end(html);
        })
        .catch(err => {
          kites.logger.error('Error: ' + err);
          res.status(500);
          res.end(err);
        })
    })
  });
}
