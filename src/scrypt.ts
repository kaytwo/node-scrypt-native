import * as crypto from 'crypto'
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
