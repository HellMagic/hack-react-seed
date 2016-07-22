/*
* @Author: liucong
* @Date:   2016-03-31 11:23:27
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-07-22 10:26:24
*/

'use strict';

var development = {
    "db": 'mongodb://localhost:27017/test',
    "port": 3000,
    "client_host": 'localhost'
};

var production = {
    "db": 'mongodb://localhost:27017/test',
    "port": 3000,
    "client_host": 'localhost'
};

// var development = {
//     "hfsdb": process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://fx:fx123456@server4.yunxiao.com:8300/hfs-test',  //mongodb://localhost:27017/hfs-test
//     'fxdb': 'mongodb://fx2:123456@ct.yunxiao.com:19000/fx2',
//     "port": 3000,
//     "secret": "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
//     "alg": "HS256",
//     "rankBaseUrl": 'http://ct.yunxiao.com:8157',
//     "testRankBaseUrl": 'http://ct.yunxiao.com:8157',
//     "yjServer": "http://yj.yunxiao.com",//   http://testyue.yunxiao.com
//     "yj2Server": "http://ct.yunxiao.com:8110",
//     "casServer": "http://passport.yunxiao.com", // http://testpassport.yunxiao.com
//     "client_host": 'localhost'
//     // redis: { port: 6380, host: 'ct.yunxiao.com', max_attempts : 10, auth_pass: 'yunxiao_redis_@xxx', connect_timeout: 50000 },
// };

// var development = {
//     "hfsdb": process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://read:%3A_3IJon%3Cbb08@server4-ks.yunxiao.com:8300/analy4',  //mongodb://localhost:27017/hfs-test
//     'fxdb': 'mongodb://hfsfenxi:%5D%237UXrz%5Bjq98@server4-ks.yunxiao.com:8300/hfsfenxi',
//     "port": 3000,
//     "client_host": 'localhost',
//     'render_host': 'testrender.yunxiao.com',
//     "secret": "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
//     "alg": "HS256",
//     "rankBaseUrl": 'http://fenxi-be.haofenshu.com',
//     "testRankBaseUrl": 'http://ct.yunxiao.com:8157',
//     "yjServer": "http://yj.yunxiao.com",
//     "yj2Server": "http://yue.haofenshu.com",
//     "casServer": "http://passport.yunxiao.com"
// };

// var production = {
//     "hfsdb": process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://read:%3A_3IJon%3Cbb08@server4-ks.yunxiao.com:8300/analy4',  //mongodb://localhost:27017/hfs-test
//     'fxdb': 'mongodb://hfsfenxi:%5D%237UXrz%5Bjq98@server4-ks.yunxiao.com:8300/hfsfenxi',
//     "port": 8666,
//     "client_host": 'localhost',
//     'render_host': 'testrender.yunxiao.com',
//     "secret": "Ci23fWtahDYE3dfirAHrJhzrUEoslIxqwcDN9VNhRJCWf8Tyc1F1mqYrjGYF",
//     "alg": "HS256",
//     "rankBaseUrl": 'http://fenxi-be.haofenshu.com',
//     "testRankBaseUrl": 'http://fenxi-be.haofenshu.com',
//     "yjServer": "http://yj.yunxiao.com",
//     "yj2Server": "http://yue.haofenshu.com",
//     "casServer": "http://passport.yunxiao.com"
// };

var test = {
    db: '',
    secret: ''
};


module.exports = {
    development: development,
    production: production,
    test: test
}[process.env.NODE_ENV] || ['development'];
