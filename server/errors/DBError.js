/*
* @Author: HellMagic
* @Date:   2016-04-15 18:21:14
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-15 18:23:16
*/

'use strict';

function DBError(code, error) {
    Error.call(this, typeof error === "undefined" ? undefined : error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "DBError";
    this.message = typeof error === "undefined" ? undefined : error.message;
    this.code = typeof code === "undefined" ? "500" : code;
    this.status = 500;
    this.inner = error;
}

DBError.prototype = Object.create(Error.prototype);
DBError.prototype.constructor = DBError;

module.exports = DBError;
