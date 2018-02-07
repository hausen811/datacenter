'use strict';

module.exports = {
  async index(context) {
      await context.vueRender(context);
  }
};
