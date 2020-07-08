/**
 * Autodiscover mode
 */
require('@kites/core')
  .engine({
    loadConfig: true,
    configFile: process.env.APP_CONFIG_FILE,
  })
  .init()
  .then(app => {
    app.logger.info('Kites application started!');
  })
  .catch(err => {
    console.error('Kites start app error: ', err);
  });
