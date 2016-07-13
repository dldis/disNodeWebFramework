/**
 * Created by gaofei on 16/7/12.
 */
'use strict';
var bunyan = require('bunyan');
var logger = module.exports = function (configjs) {
  var config = require(configjs);
  this.log = bunyan.createLogger(config);
}
logger.prototype.log = this.log;