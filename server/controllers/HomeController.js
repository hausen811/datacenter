'use strict';

module.exports = {
  async index(context) {
    console.log(context.session)
    await context.render();
  }
};
