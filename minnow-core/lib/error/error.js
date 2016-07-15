/**
 * Created by gaofei on 16/7/13.
 */
'use strict';

var logger = require('../log/log.js');

module.exports.handleNotFoundError = function(req,res,next) {
  logger.getLog().warn("请求的资源不存在:[%s]",req.path);
  res.status(404).send('请求的资源不存在 :' + req.path);
}

module.exports.handleSystemError = function(err,req,res,next) {
  logger.getLog().error(err,'发生了系统错误');
  res.status(500).send('发生了系统错误');
}