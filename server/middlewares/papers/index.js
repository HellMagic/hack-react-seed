/*
* @Author: HellMagic
* @Date:   2016-05-30 19:57:47
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-07-01 09:44:24
*/

'use strict';

var peterHFS = require('peter').getManager('hfs');
var peterFX = require('peter').getManager('fx');
var errors = require('common-errors');

//TODO: fetchCustomPaper -- 当选择自定义分析的东东的时候给出
exports.fetchPaper = function (req, res, next) {
    req.checkParams('paperId', '无效的paperId').notEmpty();
    if(req.validationErrors()) return next(req.validationErrors());
    //从数据库中找到此paper，然后返回
    peterHFS.get(req.params.paperId, function(err, paper) {
        if(err) return next(new errors.data.MongoDBError('find paper: '+req.params.paperId+' Error', err));
        res.status(200).json({
            id: paper._id,
            pid: paper.id,  //这个值也用不到了，可以删除--因为是插入，所以pid是生成的，但是这里又没有@Paper，所以这里是mock的id
            // answers: paper.answers, //TODO: 设计关于answers的存储
            x: paper['[questions]'],
            y: paper['[students]'],
            m: paper['matrix']
        });
    });
}

exports.fetchCustomPaper = function(req, res, next) {
    console.log('fetchCustomPaper =================');
    req.checkParams('paperId', '无效的paperId').notEmpty();
    req.checkParams('examId', '无效的examId').notEmpty();
    if(req.validationErrors()) return next(req.validationErrors());

    peterFX.get(req.params.examId, function(err, exam) {
        if(err || !exam) return next(new errors.data.MongoDBError('find custom exam error : ', err));
        var targetPaper = _.find(exam['[papersInfo]'], (paperObj) => paperObj.paper == req.params.paperId);
        if(!targetPaper) return next(new errros.data.Error('not found target custom paper'));
        var result = {id: targetPaper.paper, pid: targetPaper.id, x: targetPaper['[questions]'], y: targetPaper['[students]'], m: targetPaper['matrix']};
        res.status(200).json(result);
    });
}
