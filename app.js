/**
 * Autodiscover mode
 */
require('@kites/core')
  .engine({
    loadConfig: true,
    // load custom config file from environment or default
    configFile: process.env.APP_CONFIG_FILE,
  })
  .init()
  .then(app => {
    app.logger.info('Kites application started!');
  })
  .catch(err => {
    console.error('Kites start app error: ', err);
  });
