/*
* @Author: HellMagic
* @Date:   2016-05-03 19:03:53
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-07-09 10:32:57
*/

'use strict';

var when = require('when');
var client = require('request');
var util = require('util');
var config = require('../../config/env');

var qs = require('querystring');
var jwt = require('jsonwebtoken');
var errors = require('common-errors');

var yjServer = config.yjServer;
var yj2Server = config.yj2Server;
var casServer = config.casServer;

var apiUser = `${yjServer}/api/user/fenxi_login.do`;
var apiUser2 = `${yj2Server}/anno/user/profile`;
var apiCasValid = `${casServer}/passport/fx/login`;

var tokenKey = new Buffer('462fd506cf7c463caa4bdfa94fad5ea3', 'base64');

exports.getUserInfo = function(name) {
    var result;
    var url = buildGetUrl(apiUser, {username : name});

    return when.promise(function(resolve, reject) {
        client.get(url, {}, function(err, res, body) {
            if(err) return reject(new errors.URIError('请求登录用户接口I失败', err));
            if(res.statusCode != 200) return resolve(null);

            body = JSON.parse(body);
            if(body.code != 1) return resolve(null);
            resolve(body.object);
        });
    });
}


exports.getUserInfo2 = function(name, pwd){
    var result, body, userId;
    var url = buildGetUrl(apiCasValid, {username : name, password : pwd});

    return getUserId(url).then(function(userId) {
        if(!userId) return when.resolve(null);
        var token = jwt.sign({}, tokenKey, { algorithm: 'HS512', jwtid : userId, noTimestamp : false});
        return getUserProfile(token, userId);
    }).then(function(data) {
        if(!data) return when.resolve(null);

        var result = {};
        result.name = name;
        result.pwd = pwd;
        result.id = +data.userId;
        result.realName = data.name;
        result.schoolId = +data.schoolId;
        result.schoolName = data.schoolName;

        return when.resolve(result);
    });
}


function buildGetUrl(apiUrl, params){
    return `${apiUrl}?` + qs.stringify(params);
}


function getUserProfile(token, userId) {
    var url = buildGetUrl(apiUser2, {token: token});
    return when.promise(function(resolve, reject) {
        client.get(url, {}, function(err, res, body) {
            if(err) return reject(new errors.URIError('请求登录用户接口II，getUserProfile失败', err));
            if(res.statusCode != 200) return resolve(null);

            body = JSON.parse(body);
            if(body.code != 0) return resolve(null);
            body.data.userId = userId;
            resolve(body.data);
        });
    });
}

function getUserId(url) {
    return when.promise(function(resolve, reject) {
        client.get(url, {}, function(err, res, body) {
            if(err) return reject(new errors.URIError('请求登录用户接口II失败', err));
            if(res.statusCode != 200) return resolve(null);

            body = JSON.parse(body);
            if(!(body.code == 1 && body.msg == 'ok')) return resolve(null);

            resolve(body.userId);
        });
    })
}

