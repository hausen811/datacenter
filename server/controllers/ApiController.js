'use strict';

module.exports = {
  async index(context) {
    context.body = [{"a":"b"},{"a":"c"},{"a":"d"},{"a":"e"}]
  }
};
