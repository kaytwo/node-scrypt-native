"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var defaults_1 = require("./defaults");
var scrypt_1 = require("./scrypt");
exports.hash = function (password, keylen) {
    if (keylen === void 0) { keylen = defaults_1.DEFAULT_SCRYPT_KEYLEN; }
    validateType(password, 'string');
    validateType(keylen, 'number');
    var salt = crypto.randomBytes(defaults_1.DEFAULT_SALT_BYTES);
    return exports.hashWithSalt(password, salt, keylen);
};
exports.compare = function (plaintext, hash) {
    validateType(plaintext, 'string');
    validateType(hash, 'string');
    var buf = Buffer.from(hash, 'base64');
    var keylen = buf.readUInt8(0) + 1;
    var salt = buf.slice(keylen);
    return exports.hashWithSalt(plaintext, salt)
        .then(function (hashedPlaintext) { return hashedPlaintext == hash; });
};
exports.hashWithSalt = function (password, salt, keylen) {
    if (keylen === void 0) { keylen = defaults_1.DEFAULT_SCRYPT_KEYLEN; }
    validateType(password, 'string');
    validateStringOrBuffer(salt);
    validateType(keylen, 'number');
    if (typeof salt === 'string') {
        salt = Buffer.from(salt);
    }
    /* The `header` is simply a 1-byte buffer denoting the key length.
       Without it, we aren't able to distinguish between the salt and derived key */
    var header = createHeader(keylen);
    var totalLength = 1 + keylen + salt.length;
    return scrypt_1.scrypt(password, salt)
        .then(function (derivedKey) { return Buffer.concat([header, derivedKey, salt], totalLength); })
        .then(function (buf) { return buf.toString('base64'); });
};
var createHeader = function (keylen) {
    /* Using allocUnsafe is OK here because we're overwriting the buffer */
    var buf = Buffer.allocUnsafe(1);
    buf.writeUInt8(keylen, 0);
    return buf;
};
var validateType = function (str, type) {
    if (typeof str !== type) {
        throw new TypeError("The \"" + str + "\" argument must be of type string");
    }
};
var validateStringOrBuffer = function (arg) {
    if (typeof arg !== 'string' && !Buffer.isBuffer(arg)) {
        throw new TypeError('The "${arg}" argument must be of type Buffer or string');
    }
};
//# sourceMappingURL=index.js.map