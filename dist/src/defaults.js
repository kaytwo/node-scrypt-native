"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 64 bytes
exports.DEFAULT_SCRYPT_KEYLEN = 64;
// 16 bytes as recommended by NIST SP 800-132
// https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
exports.DEFAULT_SALT_BYTES = 16;
exports.DEFAULT_SCRYPT_PARAMETERS = {
    // For justification on these parameters, see
    // https://blog.filippo.io/the-scrypt-parameters/
    N: 1 << 15,
    r: 8,
    p: 1,
    maxmem: 45000000,
};
//# sourceMappingURL=defaults.js.map