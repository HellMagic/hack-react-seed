/*
* @Author: liucong
* @Date:   2016-03-31 11:19:09
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-07-22 10:30:58
*/

'use strict';

var fs = require("fs");
var url = require('url');
var path = require("path");
var when = require('when');
var express = require('express');
var engines = require('consolidate');
var unless = require('express-unless');
var bodyParser = require("body-parser");
var onFinished = require('on-finished');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');

var config = require("./env");
var auth = require('../middlewares/auth');
var debug = require('debug')('app:' + process.pid);
var NotFoundError = require('../errors/NotFoundError');
var rootPath = path.join(__dirname, '..', '..', 'index.html');
var compiled_app_module_path = path.resolve(__dirname, '../../', 'public', 'assets', 'server.js');
var App = require(compiled_app_module_path);

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var peterDB = require('peter').getManager('db');
// var peterHFS = require('peter').getManager('hfs');
// var peterFX = require('peter').getManager('fx');
var http_port = process.env.HTTP_PORT || config.port;

module.exports = function(app) {
    // var hsfPromise = bindHFS();
    // var fxPromise = bindFX();
    // var dbPromise = bindDB();
    bindDB().then(function(msgArr) {
        console.log('msgArr :  ', msgArr);
        try {
            initWebServer(app);
        } catch(e) {
            console.log('Init WebServer Error: ', e);
            process.exit(1);
        }
    }).catch(function(err) {
        console.log('Bind DB Error: ', err);
        process.exit(1);
    });
}


function bindDB() {
console.log('bind db:   ',  config.db);
    return when.promise(function(resolve, reject) {
        peterDB.bindDb(config.db, function(error) {
            if(error) {
                console.log('bind Error : ', error);
                return reject(error);
            }
            resolve('success bind DB');
        });
    });
}

// function bindHFS() {
// console.log('hfs mongo:   ',  config.hfsdb);
//     return when.promise(function(resolve, reject) {
//         peterHFS.bindDb(config.hfsdb, function(error) {
//             if(error) {
//                 console.log('bind Error : ', error);
//                 return reject(error);
//             }
//             resolve('success bind HFS');
//         });
//     });
// }

// function bindFX() {
// console.log('fx mongo:   ',  config.fxdb);
//     return when.promise(function(resolve, reject) {
//         peterFX.bindDb(config.fxdb, function(error) {
//             if(error) {
//                 console.log('bind again error: ', error);
//                 return reject(error);
//             }
//             resolve('success bind FX');
//         });
//     });
// }

function initWebServer(app) {
    app.use(require('morgan')("dev"));
    app.use(cookieParser());

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.use(expressValidator());
    app.use(express.static(path.join(__dirname, '../..', 'public')));

    app.engine('html', engines.swig);
    app.engine('jade', engines.jade);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '../..', 'server/views'));

    app.use(require('compression')());
    app.use(require('response-time')());

    app.use(function (req, res, next) {
        onFinished(res, function (err) {
            debug("[%s] finished request", req.connection.remoteAddress);
        });
        next();
    });

    require('../routes/v1')(app);

    app.all("*", function (req, res, next) {
        App(req, res);
    });

    app.use(function (err, req, res, next) {
        var code = err.status || 500;
        if(code === 500) {
            //For Debugg
            console.log('服务端Error', err);
        }

        return res.status(code).json(err);
    });

    debug("Creating HTTP server on port: %s", http_port);
    require('http').createServer(app).listen(http_port, function () {
        debug("HTTP Server listening on port: %s, in %s mode", http_port, app.get('env'));
    });
}
