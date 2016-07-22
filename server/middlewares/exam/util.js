/*
* @Author: HellMagic
* @Date:   2016-04-30 13:32:43
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-07-05 22:16:46
*/

'use strict';

var peterHFS = require('peter').getManager('hfs');

var when = require('when');
var _ = require('lodash');
var errors = require('common-errors');
var client = require('request');
var moment = require('moment');

var config = require('../../config/env');

/**
 * 通过schoolid获取学校
 * @param  {[type]} schoolid [description]
 * @return {[type]}          [description]
 */
var getSchoolById = exports.getSchoolById = function(schoolid) {
    return when.promise(function(resolve, reject) {
        peterHFS.get('@School.'+schoolid, function(err, school) {
            if(err || !school) return reject(new errors.data.MongoDBError('find school:'+schoolid+' error', err));
            resolve(school);
        });
    });
};

/**
 * 获取此学校所发生过的所有exam的具体实例
 * @param  {[type]} school [description]
 * @return {[type]}        [description]
 */
exports.getExamsBySchool = function(school) {
    var examPromises = _.map(school["[exams]"], function(item) {
        return makeExamPromise(item.id);
    });
    return when.all(examPromises);
}

function makeExamPromise(examid) {
    return when.promise(function(resolve, reject) {
        peterHFS.get('@Exam.' + examid, function(err, exam) {
            if(err) return reject(new errors.data.MongoDBError('find exam:'+examid+ ' error', err));
            resolve(exam);
        });
    });
}

//当前考试单位的所有相关信息
/*
examInfo
{
    id:
    name:
    grade:
    fullmark:
    startTime:
    endTime:
    classesCount:
    studentsCount:
}

examStudentsInfo:
[
    {
        id:
        name:

        papers: [
            {id: , score: }
        ]
    }
]

examPapersInfo:
[
    {
        id:
        name:
        fullMark:
        classes:[<className>]
        realCount:
        lostCount:
    }
]


examClassesInfo:
[
    {
        name:
        students: [<studentId>]
    }
]
 */
/*

examInfo的[papers]属性代替examPapersInfo，examInfo的grade.classes属性代替examClassesInfo
 */
exports.generateExamInfo = function(schoolid, examid, gradeName) {
    var data = {};
    return fetchExamById(examid).then(function(exam) {
        //通过grade过滤papers
        try {
            exam['[papers]'] = _.filter(exam['[papers]'], (paper) => paper.grade == gradeName);
            exam.fullMark = _.sum(_.map(exam['[papers]'], (paper) => paper.manfen));
            data.exam = exam;
        } catch (e) {
            return when.reject(new errors.Error('generateExamInfo Error: ', e));
        }
        return getSchoolById(schoolid);
    }).then(function(school) {
        var targetGrade = _.find(school['[grades]'], (grade) => grade.name == gradeName);
        if (!targetGrade || !targetGrade['[classes]'] || targetGrade['[classes]'].length == 0) return when.reject(new errors.Error('没有找到对应的年级或者从属此年级的班级'));

        data.exam.grade = targetGrade;
        //fetchId是不带有一大串儿'0'的examid
        data.exam.fetchId = examid;
        return when.resolve(data.exam);
    });
};

// exports.filterExam = function(examid, gradeName) {
//     return fetchExamById(examid).then(fucntion(exam) {
//         exam['[papers]'] = _.filter(exam['[papers]'], (paper) => paper.grade == gradeName);
//         return when.resolve(exam);
//     });
// }

/**
 * 通过examid查询获取一个exam实例
 * @param  {[type]} examid [description]
 * @return {[type]}        [description]
 */
function fetchExamById(examid) {
    var url = config.rankBaseUrl + '/exams' + '?' + 'examids=' + examid;

    return when.promise(function(resolve, reject) {
        client.get(url, {}, function(err, res, body) {
            if (err) return reject(new errors.URIError('查询rank server(exams)失败', err));
            resolve(JSON.parse(body)[examid]); //这里必须反序列化--因为是通过网络传输的全部都是String
        });
    });
};

/*
问题：这里通过examid去获取scores怎么区分是哪个年级的学生的总分呢？哦，通过班级过滤。。。
 */
/*
Test Code:
var lostStudentsInfo = [];

// if(index == 0) {
// var originalIds = classItem['[students]'];
// var realIds = _.map(targetClassesScore[classItem.name], (sss) => sss.id+'');
// var diffIds = _.difference(originalIds, realIds);

// // console.log(targetClassesScore[classItem.name]);

// console.log('originalIds ========');
// console.log(originalIds);
// console.log('realIds ============');
// console.log(realIds);
// console.log('diffIds ===========  ');
// console.log(diffIds);
// }

                // var originalIds = classItem['[students]'];
                // var realIds = _.map(targetClassesScore[classItem.name], (sss) => sss.id+'');
                // var diffIds = _.difference(originalIds, realIds);
                // lostStudentsInfo = _.concat(lostStudentsInfo, diffIds);


// console.log('=====================  lost students ==============================');
// console.log(lostStudentsInfo);
// console.log('=====================  lost students ==============================');
// console.log('lostStudentsInfo.length = ', lostStudentsInfo.length);
 */
exports.generateExamScoresInfo = function(exam) {
    //Mock Data
    //需要再添加个grade字段--用来过滤grade...这样就不用再去school中找了
    // var arr = {
    //         'A': [{name: 'aa', score: 12, class: 'A'}, {name: 'bb', score: 20, class: 'A'}],
    //         'B': [{name: 'cc', score: 2, class: 'B'}, {name: 'dd', score: 50, class: 'B'}],
    //         'C': [{name: 'aa', score: 100, class: 'A'}, {name: 'bb', score: 39, class: 'A'}],
    //         'D': [{name: 'cc', score: 65, class: 'B'}, {name: 'dd', score: 5, class: 'B'}],
    //         'E': [{name: 'aa', score: 1, class: 'A'}, {name: 'bb', score: 180, class: 'A'}],
    //         'F': [{name: 'cc', score: 200, class: 'B'}, {name: 'dd', score: 0, class: 'B'}],
    //         'G': [{name: 'aa', score: 111, class: 'A'}, {name: 'bb', score: 24, class: 'A'}],
    //         'H': [{name: 'cc', score: 90, class: 'B'}, {name: 'dd', score: 76, class: 'B'}],
    //         'I': [{name: 'aa', score: 500, class: 'A'}, {name: 'bb', score: 390, class: 'A'}],
    //         'G': [{name: 'cc', score: 165, class: 'B'}, {name: 'dd', score: 75, class: 'B'}],
    //         'K': [{name: 'aa', score: 16, class: 'A'}, {name: 'bb', score: 20, class: 'A'}],
    //         'L': [{name: 'cc', score: 300, class: 'B'}, {name: 'dd', score: 60, class: 'B'}]
    //     };

    //每个学校每个年级都是唯一的（只有一个初一，只有一个初二...），通过年级，获取所有此年级下的所有班级className，通过scores的className key过滤
    return fetchExamScoresById(exam.fetchId).then(function(scoresInfo) {
        //全校此考试(exam)某年级(grade)所有考生总分信息，升序排列


        var targetClassesScore = _.pick(scoresInfo, _.map(exam.grade['[classes]'], (classItem) => classItem.name));

        var orderedStudentScoreInfo = _.sortBy(_.concat(..._.values(targetClassesScore)), 'score'); //这个数据结构已经很接近
        //examStudentsInfo的结构了，后面schoolAnalysis等页面还需要，所以会考虑缓存~~~
        //给exam补充实考和缺考人数信息：全校此年级此场考试的缺考人数=全校此年级的学生人数-全校此年级参加此场考试的人数

        //在exam.grade的每个班级对象中补充realCount和lostCount，如果整个班级缺考，则添加到exam.lostClasses中
        exam.realClasses = _.keys(targetClassesScore);
        exam.lostClasses = [], exam.realStudentsCount = 0, exam.lostStudentsCount = 0;

        //TODO:在这里还可以添加此班级在此场exam（而不是某一个paper）的realStudentsCount和lostStudentsCount
        _.each(exam.grade['[classes]'], (classItem, index) => {
            if (targetClassesScore[classItem.name]) {
                classItem.realStudentsCount = targetClassesScore[classItem.name].length;
                exam.realStudentsCount += classItem.realStudentsCount;
                classItem.lostStudentsCount = classItem['[students]'].length - classItem.realStudentsCount;
                exam.lostStudentsCount += classItem.lostStudentsCount; //各个真正参加考试的班级中缺考的人数
            } else {
                exam.lostClasses.push(classItem.name);
            }
        });

        exam.realClasses = _.keys(targetClassesScore);
        return when.resolve({
            classScoreMap: targetClassesScore,
            orderedScoresArr: orderedStudentScoreInfo
        });
    });
};

function fetchExamScoresById(examid) {
    var url = config.testRankBaseUrl + '/scores' + '?' + 'examid=' + examid;
    return when.promise(function(resolve, reject) {
        client.get(url, {}, function(err, res, body) {
            if(err) return reject(new errors.URIError('查询rank server(scores)失败', err));
            //TODO: 这里当获取到数据错误的时候，服务不会给error status，都会走成功，但是返回的字段里有error属性，因此通过判断error属性来做健壮性判断！
            var data = JSON.parse(body);
            if(data.error) return reject(new errors.Error('获取rank服务数据错误，examid='+examid));
            var keys = _.keys(data);
            resolve(data[keys[0]]);
        });
    });
}

exports.getPapersInfoByExam = function(exam) {
    var findPapersPromises = _.map(exam["[papers]"], function(pobj) {
        return when.promise(function(resolve, reject) {
            peterHFS.get(pobj.paper, function(err, paper) {
                if(err) return reject(new errors.data.MongoDBError('find paper:'+pid+' error', err));
                resolve(paper);
            });
        });
    });
    return when.all(findPapersPromises);
};



//其实分析结果只要出一次就可以了，后面考试一旦考完，数据肯定就是不变的，但是出数据的颗粒度需要设计，因为前端会有不同的维度--所以还是需要计算
/**
 * 为SchoolAnalysis提供设计好的方便灵活的数据结构
 * @param  {[type]} exam   [description]
 * @param  {[type]} papers [description]
 * @param  {[type]} school [description]
 * @return {[type]}        [description]
 */
//Update: 其实这个数据结构通过当前rank-server的/score API也能获取，因为里面信息也都拼进来了
exports.generateStudentScoreInfo = function(exam, papers, school) {
    //学生的信息；-- @Paper   id, name, totalScore(来自score的接口), class
    //学科的信息  -- @Paper   <paper_score>
    // var studentTotalScoreMap = {};
    var studentScoreInfoMap = {};
    var paperInfo = {};
    var classInfo = {};
    _.each(papers, function(paper) {
        paperInfo[paper.id] = {
            name: paper.name,
            event_time: paper.event_time,
            fullMark: paper.manfen
        };
        _.each(paper["[students]"], function(student) {
            //确认：选用学生的id作为索引（虽然也可以用kaohao--因为是在同一场考试下）
            if (!studentScoreInfoMap[student.id]) {
                //TODO：重构--这个赋值的操作可以使用ES6的简单方式
                var obj = {};
                obj.id = student.id;
                obj.kaohao = student.kaohao;
                obj.name = student.name;
                obj.class = student.class;
                studentScoreInfoMap[student.id] = obj;
            }
            //这里赋给0默认值，就不能区分“缺考”（undefined）和真实考了0分

            //TODO:修改成student.papers = [{id: paper.id, score: <paper_score>, ...}]

            studentScoreInfoMap[student.id][paper.id] = student.score || 0;
            studentScoreInfoMap[student.id].totalScore = (studentScoreInfoMap[student.id].totalScore) ? (studentScoreInfoMap[student.id].totalScore + studentScoreInfoMap[student.id][paper.id]) : (studentScoreInfoMap[student.id][paper.id]);
        });
    });
    //确定基数到底是此班级内参加此场paper考生的人数还是此班级所有学生的人数（应该是前者，否则计算所有的数据都有偏差，但是缺考人数还是需要
    //班级的总人数）
    _.each(school['[grades]'], function(grade) {
        _.each(grade['[classes]'], function(classItem) {
            classInfo[classItem.name] = {
                studentsCount: (classItem.students ? classItem.students.length : 0),
                grade: grade.name
            }
        });
    });
    return {
        studentScoreInfoMap: studentScoreInfoMap,
        paperInfo: paperInfo,
        classInfo: classInfo
    };
}



/*
    请求rank-server "/schools"的API接口：
    var url = config.rankBaseUrl + '/schools?ids=' + schoolId;
    return when.promise(function(resolve, reject) {
        client.get(url, {}, function(err, res, body) {
            if(err) return reject(new errors.URIError('查询rank server(schools)失败', err));
            resolve(JSON.parse(body)[schoolId]);
        })
    })

 */
