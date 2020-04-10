const kites = require('@kites/core');
const docsify = require('./extensions/docsify');

kites.engine({
  loadConfig: true
})
  .use(docsify)
  .init()
  .then(app => {
    app.logger.info('Kites application started!');
  })
  .catch(err => {
    console.error('Kites start app error: ', err);
  });
