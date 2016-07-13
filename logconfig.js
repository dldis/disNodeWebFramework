/**
 * Created by gaofei on 16/7/12.
 */
'use strict';

var path = require('path');
var logpath = path.join(__dirname,'log/myapp-error.log');

module.exports = {
  name: 'myapp',
  src: true,
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'info',
      type: 'rotating-file',
      period: '1d',
      path: path.join(__dirname,'log/myapp.log'),
      count: 10
    },
    {
      level: 'error',
      type: 'rotating-file',
      period: '1d',
      path: logpath,
      count: 10
    }
  ]
}