/**
 * Created by gaofei on 16/7/12.
 */
'use strict';
module.exports = {
  util: {

  },

  framework: {
    logger: require('./lib/log/log.js'),
    error: require('./lib/error/error.js'),
    server: require('./lib/server/server.js')
  }
}
