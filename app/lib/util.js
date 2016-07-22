/*
* @Author: HellMagic
* @Date:   2016-04-29 15:02:12
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-07-01 09:54:02
*/

'use strict';

import _ from 'lodash';

var numberMapper = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十'

}
export function convertJS(data) {
    return JSON.parse(JSON.stringify(data));
}

export function initParams(params, location, other) {
    params = params || {};
    var query = location.query || {};
    params = _.merge(params, query);
    if(other && _.isObject(other)) params = _.merge(params, other);
    return params;
}

export function getNumberCharacter(num) {
    if (!parseInt(num)) return ;
    return numberMapper[num.toString()];
}

export function saveAs(uri) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.href = uri;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}

export function downloadTable(headSeq, headSelect, headerMapper, renderRows) {
    var validColumnKeys = [], validColumnNames = [];
    _.each(headSeq, (headKey) => {
        if(headSelect[headKey]) {
            validColumnKeys.push(headKey);
            var keys = _.split(headKey, '_');
            var names = _.map(keys, (k) => headerMapper[k]);
            var theName = _.join(_.reverse(names), '');
            validColumnNames.push(theName);
        }
    });
    //从每一行学生数据中拿到需要的数据
    var validStudentInfoMatrix = _.map(renderRows, (studentRowObj) => {
        return _.map(validColumnKeys, (key) => studentRowObj[key]);
    });
    var url = '/api/v1/file/export/rank/report';
    var inputKeys = "<input type='hidden' name='" + 'keys' + "' value='" + JSON.stringify(validColumnKeys) + "' />";
    var inputNames = "<input type='hidden' name='" + 'names' + "' value='" + JSON.stringify(validColumnNames) + "' />";
    var inputMatrix = "<input type='hidden' name='" + 'matrix' + "' value='" + JSON.stringify(validStudentInfoMatrix) + "' />";
    $('<form action="' + url + '" method="' + ('post') + '">' + inputKeys + inputNames + inputMatrix + '</form>')
        .appendTo('body').submit().remove();
}


/*
方案一：
    //通过 this.state.headSeq, this.state.headSelect 得到有序的 要显示的所有列选项
    // 通过 遍历renderRows中每一行的学生数据，选出需要的列。
    // 组成想要的 JSON
    //下载
    var validColumnKeys = [], validColumnNames = [];
    _.each(headSeq, (headKey) => {
        if(headSelect[headKey]) {
            validColumnKeys.push(headKey);
            var keys = _.split(headKey, '_');
            var names = _.map(keys, (k) => headerMapper[k]);
            var theName = _.join(_.reverse(names), '');
            console.log('theName = ', theName);
            validColumnNames.push(theName);
        }
    });
    //从每一行学生数据中拿到需要的数据
    var validStudentInfoMatrix = _.map(renderRows, (studentRowObj) => {
        return _.map(validColumnKeys, (key) => studentRowObj[key]);
    });
    // console.log(jsonToSsXml(validColumnNames, validStudentInfoMatrix));

// var names = ['姓名', '城市', '国家', '生日', '人数'];
// var datas = [
//     ["笨笨", "New York", "United States", "1978-03-15", 42],
//     ["Ζαλώνης Thessaloniki", "Athens", "Greece", "1987-11-23", 42]
// ];

console.log(jsonToSsXml(validColumnNames, validStudentInfoMatrix));


    download(jsonToSsXml(validColumnNames, validStudentInfoMatrix), 'theTest.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');



function emitXmlHeader(validColumnNames) {
    var headerRow =  '<ss:Row>\n';
    _.each(validColumnNames, (name) => {
        headerRow += '  <ss:Cell>\n';
        headerRow += '    <ss:Data ss:Type="String">';
        headerRow += name + '</ss:Data>\n';
        headerRow += '  </ss:Cell>\n';
    });
    headerRow += '</ss:Row>\n';
    return '<?xml version="1.0"?>\n' +
           '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
           '<ss:Worksheet ss:Name="Sheet1">\n' +
           '<ss:Table>\n\n' + headerRow;
};


function emitXmlFooter() {
    return '\n</ss:Table>\n' +
           '</ss:Worksheet>\n' +
           '</ss:Workbook>\n';
};

function jsonToSsXml(validColumnNames, validStudentInfoMatrix) {
    var xml = emitXmlHeader(validColumnNames);
    //前三个是String，后面都是Number
    _.each(validStudentInfoMatrix, (rowData, index) => {
        var theType = (index > 2) ? 'Number' : 'String';
        xml += '<ss:Row>\n';
        _.each(rowData, (value) => {
            xml += '  <ss:Cell>\n';
            xml += '    <ss:Data ss:Type="' + theType  + '">';
            xml += value + '</ss:Data>\n';
            xml += '  </ss:Cell>\n';
        });
        xml += '</ss:Row>\n';
    });

    xml += emitXmlFooter();
    return xml;
};

function download(content, filename, contentType) {
    if (!contentType) contentType = 'application/octet-stream';
    var a = document.getElementById('rankTable');
    var blob = new Blob([content], {
        'type': contentType
    });
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
};

 */
