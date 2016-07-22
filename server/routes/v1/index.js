/*
* @Author: liucong
* @Date:   2016-03-31 12:08:12
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-07-22 10:15:07
*/

'use strict';

var express = require('express');
var rootRouter = express.Router();

rootRouter.use('/test', require('./test'));

module.exports = function(app) {
    app.use('/api/v1', rootRouter);
}
