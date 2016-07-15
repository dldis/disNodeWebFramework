/**
 * Created by gaofei on 16/7/14.
 */
'use strict';

var path = require('path'),
    express = require('express'),
    domain = require('domain'),
    logger = require('../log/log.js');


var router = express.Router();

var registPath = undefined;
module.exports.createRouter = function (inPath) {
  registPath = inPath;

  // 使用 domain 来捕获大部分异常
  router.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function (err) {
      try {
        logger.getLog().error(err,'API发生未捕获错误');
        var killTimer = setTimeout(function () {
          process.exit(1);
        }, 30000);
        killTimer.unref();
        GETSERVER().close();
        res.status(500).send('API发生了系统错误');
      } catch (e) {
        logger.getLog().error(e,'API错误处理失败');
      }
    });

    reqDomain.run(next);
  });

  router.use(function timelog(req,res,next) {
    console.log('apiRouter start is run');
    next();
  });

  router.use('/user',require(path.join(registPath,'userRouter.js')));

  return router;
}
