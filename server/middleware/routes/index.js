'use strict';

const _ = require('lodash');
const Router = require('koa-router');

module.exports = () => {
  const router = new Router();
  const isGetRegExp = new RegExp(/get/i);

  KoaConfig.routeDetails = {};
  const ejsRouteConfig = require('../../routes/ejsRoute')
  const reactRouteConfig = require('../../routes/reactRoute')
  const vueRouteConfig = require('../../routes/vueRoute')
    for (const routeConfig of [ejsRouteConfig,reactRouteConfig,vueRouteConfig]){
        for (const verbs of _.keys(routeConfig)) {
            const verb = verbs;
            const routeObj = routeConfig[verbs];
            for (const routeKey of _.keys(routeObj)){
                const url = routeKey;
                const routeValue = routeObj[routeKey];
                if (routeValue[0] === '/') {
                    router.redirect(url, routeValue, 301);
                } else {
                    const [controllerPath, action] = routeValue.split('.');
                    // eslint-disable-next-line global-require, import/no-dynamic-require
                    const controller = require(`../../controllers/${controllerPath}`);
                    if (controller) {
                        const actionInstance = controller[action];
                        if (actionInstance) {
                            router[verb](url, actionInstance);

                            // Trim "Controller" off the end of the controllerPath
                            if (!KoaConfig.routeDetails[url] || isGetRegExp.test(verb)) {
                                KoaConfig.routeDetails[url] = {
                                    controller: controllerPath.replace(/Controller$/ig, '').toLowerCase(),
                                    action,
                                };
                            }
                        } else {
                            console.warn(`Ejs render unable to find controller action for route: ${routeKey}`);
                        }
                    } else {
                        console.warn(`Ejs render unable to find controller for route: ${routeKey}`);
                    }
                }
            }
        }
    }



  return router.routes();
};
