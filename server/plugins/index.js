'use strict';

const ejs = require('./ejs');
const vue = require('./vue')

module.exports = {
  startup: (app) => {
    return Promise.all([
      ejs.startup(app),
      vue.startup(app),
    ]);
  },
  shutdown: () => {
    return Promise.all([
      // librato.shutdown(),
    ]);
  },
};
