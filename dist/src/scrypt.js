"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var defaults_1 = require("./defaults");
exports.scrypt = function (plaintext, salt, options) {
    if (options === void 0) { options = defaults_1.DEFAULT_SCRYPT_PARAMETERS; }
    return new Promise(function (resolve, reject) {
        crypto.scrypt(plaintext, salt, defaults_1.DEFAULT_SCRYPT_KEYLEN, {}, function (err, derivedKey) {
            if (err) {
                reject(err);
            }
            else {
                resolve(derivedKey);
            }
        });
    });
};
//# sourceMappingURL=scrypt.js.map