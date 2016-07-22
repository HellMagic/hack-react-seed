var express = require('express');
var app = express();
var fs = require('fs');
var webpack = require('webpack');

// var mongoose = require('mongoose');
var config = require('./config/env');

var isDev = process.env.NODE_ENV === 'development';
if (isDev) {
    var wpconfig = require('../webpack/webpack.config.dev-client.js');
    var compiler = webpack(wpconfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: wpconfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

require('./config/express')(app);

// mongoose.connect(config.db, function(err, res) {
//     if(err) {
//         console.log('Error connecting to: ' + config.db + '. ' + err);
//     }else {
//         console.log('Succeeded connected to: ' + config.db);

//         fs.readdirSync(__dirname + '/models').forEach(function(file) {
//             if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
//         });

//         // var User = mongoose.model('User');
//         // var user = new User();

//         // user.username = 'hell_magic';
//         // user.password = '123456';

//         // user.save(function (err) {
//         //     if (err) {
//         //         console.log(err);
//         //     }
//         //     process.exit();
//         // });


//         require('./config/express')(app);
//     }
// });

// mongoose.connection.on('error', console.log);

