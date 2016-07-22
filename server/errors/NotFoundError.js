/*
* @Author: liucong
* @Date:   2016-03-31 11:13:49
* @Last Modified by:   liucong
* @Last Modified time: 2016-03-31 11:14:00
*/

'use strict';

function NotFoundError(code, error) {
    Error.call(this, typeof error === "undefined" ? undefined : error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "NotFoundError";
    this.message = typeof error === "undefined" ? undefined : error.message;
    this.code = typeof code === "undefined" ? "404" : code;
    this.status = 404;
    this.inner = error;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;
