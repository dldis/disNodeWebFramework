/**
 * Created by gaofei on 16/7/14.
 */
'use strict';

var express = require('express');
var router = express.Router();

router.use('/get',function(req,res,next) {
  res.send('okokokok!');
});

module.exports = router;