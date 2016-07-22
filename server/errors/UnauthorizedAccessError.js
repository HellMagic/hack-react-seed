/*
* @Author: liucong
* @Date:   2016-03-31 11:14:24
* @Last Modified by:   liucong
* @Last Modified time: 2016-03-31 11:14:28
*/

'use strict';

function UnauthorizedAccessError(code, error) {
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "UnauthorizedAccessError";
    this.message = error.message;
    this.code = code;
    this.status = 401;
    this.inner = error;
}

UnauthorizedAccessError.prototype = Object.create(Error.prototype);
UnauthorizedAccessError.prototype.constructor = UnauthorizedAccessError;

module.exports = UnauthorizedAccessError;
