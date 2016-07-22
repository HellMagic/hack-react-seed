/*
* @Author: HellMagic
* @Date:   2016-04-15 19:08:28
* @Last Modified by:   HellMagic
* @Last Modified time: 2016-04-15 19:09:14
*/

'use strict';

function BadRequestError(code, error) {
    Error.call(this, typeof error === "undefined" ? undefined : error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "BadRequestError";
    this.message = typeof error === "undefined" ? undefined : error.message;
    this.code = typeof code === "undefined" ? "400" : code;
    this.status = 400;
    this.inner = error;
}

BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.constructor = BadRequestError;

module.exports = BadRequestError;
