/**
 * Created by gaofei on 16/7/11.
 */
"use strict";
var path = require('path');
var express = require('express');
var app = express();
app.get('/',function(req,res) {
  res.send('hello world! success');
});

var logger = require('./minnow-core').framework.logger;
global.log = new logger(path.join(__dirname,'logconfig.js')).log;

app.get('/user',function(req,res) {
  log.info('custom log module is called success!');
  log.error('error occus!');
  res.send('this is a request for /user');
});

app.use('/file',express.static('public'));

app.set('views','./views');
app.set('view engine', 'jade');

app.get('/jadetest',function(req,res) {
  console.log('jadetest is run');
  res.render('test/index',{title:'Hey',message:'hello there!'});
});

app.use(function(req,res,next) {
  console.log('request is:',req.path);
  res.status(404).send('sorry can not find :' + req.path);
})

app.use(function(err,req,res,next) {
  console.error(err.stack);
  res.status(500).send('something broke!');
});

var server = app.listen(3000,function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s',host,port);
});
