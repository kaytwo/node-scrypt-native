/* We use require for crypto to avoid non-sense deprecation warnings.
   See https://github.com/nodejs/node/issues/23203 */
import crypto = require('crypto')
import {DEFAULT_SCRYPT_PARAMETERS, DEFAULT_SCRYPT_KEYLEN} from './defaults'

interface ScryptOptions {
	N: number
	r: number
	p: number
	maxmem: number
}

export const scrypt = (plaintext: string, salt: Buffer, options: ScryptOptions = DEFAULT_SCRYPT_PARAMETERS): Promise<Buffer> =>
	new Promise<Buffer>((resolve, reject) => {
		crypto.scrypt(plaintext, salt, DEFAULT_SCRYPT_KEYLEN, {
		}, (err, derivedKey) => {
			if (err) {
				reject(err)
			} else {
				resolve(derivedKey)
			}
		})
	})
