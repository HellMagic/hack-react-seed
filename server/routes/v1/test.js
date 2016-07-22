/*
* @Author: HellMagic
* @Date:   2016-07-22 10:15:08
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-07-22 10:16:55
*/

'use strict';

var router = require('express').Router();

router.get('/', function(req, res, next) {
    res.status(200).send('hello, world');
})

module.exports = router;
