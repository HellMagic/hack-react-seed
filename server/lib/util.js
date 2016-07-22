/*
* @Author: HellMagic
* @Date:   2016-05-05 20:12:30
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-05-05 20:12:35
*/

'use strict';

export function initParams(params, location, other) {
    params = params || {};
    var query = location.query || {};
    params = _.merge(params, query);
    if(other && _.isObject(other)) params = _.merge(params, other);
    return params;
}
