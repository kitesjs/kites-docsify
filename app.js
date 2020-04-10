/**
 * Autodiscover mode
 */
require('@kites/core')
  .engine({
    loadConfig: true
  })
  .init()
  .then(app => {
    app.logger.info('Kites application started!');
  })
  .catch(err => {
    console.error('Kites start app error: ', err);
  });
