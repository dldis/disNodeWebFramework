/**
 * Created by gaofei on 16/7/14.
 */
'use strict';

var path = require('path'),
    express = require('express'),
    domain = require('domain'),
    logger = require('../log/log.js'),
    error = require('../error/error.js');

var myServer = {};
function getServer() {
  return myServer.server;
}
global.GETSERVER = getServer;
function getApp() {
  return myServer.app;
}
module.exports.start = function (appCallback,serverCallback) {
  var app = express();
  myServer.app = app;

  // 使用 domain 来捕获大部分异常
  app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function (err) {
      try {
        logger.getLog().error(err,'发生未捕获错误');
        var killTimer = setTimeout(function () {
          process.exit(1);
        }, 30000);
        killTimer.unref();
        getServer.close();
        res.status(500).send('发生了系统错误');
      } catch (e) {
        logger.getLog().error(e,'错误处理失败');
      }
    });

    reqDomain.run(next);
  });

  // uncaughtException 避免程序崩溃
  process.on('uncaughtException', function (err) {
    logger.getLog().error(err,'发生未捕获错误');
    try {
      var killTimer = setTimeout(function () {
        process.exit(1);
      }, 30000);
      killTimer.unref();

      getServer().close();
    } catch (e) {
      logger.getLog().error(e,'错误处理失败');
    }
  });

  appCallback(app);

  app.use(error.handleNotFoundError);

  app.use(error.handleSystemError);

  var port = process.env.PORT || 3000;
  var server = app.listen(port,function () {
    myServer.server = server;
    var host = server.address().address;
    var port = server.address().port;
    logger.getLog().info('app listening at http://%s:%s',host,port);
    serverCallback(server);
  });
}

module.exports.registApiRouter = function (app,preUrl,registPath) {
  var router = require('./apiRouter.js');
  app.use(preUrl,router.createRouter(registPath));
}