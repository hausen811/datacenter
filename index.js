'use strict';

const app = require('./bin/app');

app.load().catch((ex) => {
  console.error(ex);
  throw ex;
});
