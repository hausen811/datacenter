'use strict';
const device = require('./device');
const requestLoggingDetails = require('./requestLoggingDetails');
const response = require('./response');
const compose = require('koa-compose');
const cors = require('kcors');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');
const session = require('koa-session');
const serve = require('koa-static');
module.exports = (app) => {
    return compose([
      cors(),
      device(),
      session(KoaConfig.session,app),
      serve(KoaConfig.path+'/assets'),
      requestLoggingDetails(),
      response(),
      compress(),
      bodyParser(), 
      routes()
    ]);
  }