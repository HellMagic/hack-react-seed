/*
* @Author: liucong
* @Date:   2016-03-31 11:59:40
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-07-09 10:33:26
*/

'use strict';

var _ = require("lodash");
var path = require('path');
var bcrypt = require('bcryptjs');
var util = require('util');
var jsonwebtoken = require("jsonwebtoken");
var Router = require("express").Router;
var murmur = require('murmur'); //TODO: 应该是没用了，可以把此module从node中去除了
var when = require('when');
var errors = require('common-errors');
var ObjectId = require('mongodb').ObjectId;
// var md5 = crypto.createHash('md5');

var debug = require('debug')('app:utils:' + process.pid);

var peterHFS = require('peter').getManager('hfs');

var UnauthorizedAccessError = require('../../errors/UnauthorizedAccessError');
var BadRequestError = require('../../errors/BadRequestError');
var DBError = require('../../errors/DBError');

var config = require('../../config/env');
var debug = require('debug')('app:routes:default' + process.pid);

var authUitls = require('./util');

exports.authenticate = function(req, res, next) {
    req.checkBody('value', '无效的value').notEmpty();
    req.checkBody('password', '无效的password').notEmpty();
    if(req.validationErrors()) return next(new errors.HttpStatusError(401, {errorCode: 1, message: '无效的用户名或密码'}));

    var value = req.body.value.toLowerCase();
    var password = req.body.password;

    authUitls.getUserInfo(value).then(function(user) {
        if(user && (!_.eq(user.pwd, password))) return when.reject(new errors.HttpStatusError(401, {errorCode: 2, message: '密码不正确'}));
        if(!user) return authUitls.getUserInfo2(value, password);

        return when.resolve(user);
    }).then(function(user) {
        if(!user) return when.reject(new errors.HttpStatusError(401, {errorCode: 1, message: '用户不存在'}));
        if(user && (!_.eq(user.pwd, password))) return when.reject(new errors.HttpStatusError(401, {errorCode: 1, message: '密码不正确'}));
        delete user.pwd;

        var token = jsonwebtoken.sign({ user: user }, config.secret);
        user.token = token;
        req.user = user;

        next();
    }).catch(function(err) {
        next(err);
    })
}


exports.verify = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.authorization;
    if(!token) return next(new errors.HttpStatusError(400, '没有令牌，拒绝访问，请登录~'));

    when.promise(function(resolve, reject) {
        jsonwebtoken.verify(token, config.secret, function (err, decode) {
            if (err) return reject(new errors.HttpStatusError(401, {errorCode: 3, message: '无效的令牌，拒绝访问，请登录~'}));
            //如果验证通过，则通过decode._id，然后去找user，并赋值给req.user
            resolve(decode.user);
        });
    }).then(function(user) {
        req.user = user;
        req.user.token = token;
        next();
    }).catch(function(err) {
        next(err);
    });
};

/*

.then(function(userid) {

console.log('userid = ', userid);

//         return when.promise(function(resolve, reject) {
//             //照当前来看是不再需要查询的，因为decord里就有几乎我们要的信息了，id, name,schoolId
//             peterHFS.get('@Teacher.'+userid, function(err, user) {
//                 if(err) return reject(new DBError('500', {message: 'find user error'}));

// console.log('user.name = ', user.name);

//                 resolve(user);
//             });
//         });
    })

 */


// exports.validate = function(req, res, next) {
//     if(req.validationErrors()) next(req.validationErrors());
//     next();
// }



// exports.authenticate = function (req, res, next) {
//     debug("Processing authenticate middleware");
//     var value = req.body.value;//注意：body里面写value而不再是username
//     var password = req.body.password;//暂时还是明文传递过来，后面进行md5

//     //TODO:使用express-validator来处理各种验证的需求
//     if (_.isEmpty(value) || _.isEmpty(password)) {
//         return next(new UnauthorizedAccessError("401", {
//             message: 'Invalid value or password'
//         }));
//     }
//     value = value.toLowerCase();

// //1.验证User的usernmae和password是否有效：new UnauthorizedAccessError("401", { message: 'Invalid username or password' })
//     var hash = murmur.hash128(value).hex().substr(0, 24);

//     when.promise(function(resolve, reject) {
//         peterHFS.get('@UserIndex.' + hash, function(err, result) {
//             if(err) return reject(new DBError('500', { message: 'get user index error' }));
//             var target = _.find(result['[list]'], function(item) {
//                 return value == item.key;
//             });
//             if(!target) return reject(new UnauthorizedAccessError('401', { message: 'not found user of value : ' + value }));
//             resolve(target);
//         });
//     }).then(function(target) {
//         return when.promise(function(resolve, reject) {
//             peterHFS.get(target.userid, ['_id', 'pass'], function(err, result) {
//                 if(err) return reject(new DBError('500', { message: 'find user error' }));
//                 if(!result) return reject(new UnauthorizedAccessError('401', { message: 'db not found user of value = ' + value}));

//                 //md5.update(result.pass)
//                  result.pass == password ? resolve(result) : reject(new UnauthorizedAccessError('401', { message: 'invalid password' }));
//             });
//         });
//     }).then(function(user) {
//         var token = jsonwebtoken.sign({ _id: user._id.toString() }, config.secret);
//         user.token = token;
//         req.user = user;
//         next();
//     }).catch(function(err) {
//         next(err);
//     });
// };

