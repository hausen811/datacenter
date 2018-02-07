const Koa = require('koa');
const config = require('../config');

global.KoaConfig = config;
const plugins = require('../server/plugins');
const middleware = require('../server/middleware');


async function loadKoaApplication() {
    const app = new Koa();
    await plugins.startup(app);

    app.use(middleware(app));

    app.listen(config.port);
  
    process.on('SIGINT', () => {
      (async function shutdown() {
        await plugins.shutdown();
        process.exit();
      }()).catch((ex) => {
        console.error(ex);
        process.exit();
      });
    });
    KoaConfig.log.info(`Listening on port ${config.port}`)
  }

  module.exports.load = loadKoaApplication;