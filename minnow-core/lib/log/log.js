/**
 * Created by gaofei on 16/7/12.
 */
'use strict';

var bunyan = require('bunyan');
var logger = {
  log: bunyan.createLogger({name:'default'})
};
module.exports.config = function (configjs) {
  console.log('log config path is :[%s]',configjs);
  logger.config = require(configjs);
  logger.log = bunyan.createLogger(logger.config);
}
module.exports.getLog = function () {
  return logger.log;
}