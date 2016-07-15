/**
 * Created by gaofei on 16/7/11.
 */
"use strict";
var path = require('path'),
    express = require('express');

var logger = require('./minnow-core').framework.logger
logger.config(path.join(__dirname,'logconfig.js'));
global.log = logger.getLog();

var myServer = require('./minnow-core').framework.server;

myServer.start(function (app) {

  // 静态资源配置
  app.use('/web',express.static('public'));

  myServer.registApiRouter(app,'/api',path.join(__dirname,'router'));

  app.get('/',function(req,res) {
    throw new TypeError('throw from my test!!!');
    res.send('hello world! success');
  });

  app.get('/user',function(req,res) {
    setTimeout(function() {
      throw new TypeError('throw from my test!!!');
    });
    log.info('custom log module is called success!');
    log.error('error occus!');
    res.send('this is a request for /user');
  });
},function (server) {

});


