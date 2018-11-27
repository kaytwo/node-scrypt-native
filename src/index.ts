import * as crypto from 'crypto'
import {DEFAULT_SCRYPT_KEYLEN, DEFAULT_SALT_BYTES} from './defaults'
import {scrypt} from './scrypt'


export const hash = (password: string, keylen = DEFAULT_SCRYPT_KEYLEN): Promise<string> => {
	validateType(password, 'string')
	validateType(keylen, 'number')

	const salt = crypto.randomBytes(DEFAULT_SALT_BYTES)

	return hashWithSalt(password, salt, keylen)
}

export const compare = (plaintext: string, hash: string): Promise<boolean> => {
	validateType(plaintext, 'string')
	validateType(hash, 'string')

	const buf = Buffer.from(hash, 'base64')
	const keylen = buf.readUInt8(0) + 1
	const salt = buf.slice(keylen)

	return hashWithSalt(plaintext, salt)
		.then(hashedPlaintext => hashedPlaintext == hash)
}

export const hashWithSalt = (password: string, salt: Buffer | string, keylen = DEFAULT_SCRYPT_KEYLEN): Promise<string> => {
	validateType(password, 'string')
	validateStringOrBuffer(salt)
	validateType(keylen, 'number')

	if (typeof salt === 'string') {
		salt = Buffer.from(salt)
	}

	/* The `header` is simply a 1-byte buffer denoting the key length.
	   Without it, we aren't able to distinguish between the salt and derived key */
	const header = createHeader(keylen)
	const totalLength = 1 + keylen + salt.length

	return scrypt(password, salt)
		.then(derivedKey => Buffer.concat([header, derivedKey, salt as Buffer], totalLength))
		.then(buf => buf.toString('base64'))
}

const createHeader = (keylen: number): Buffer => {
	/* Using allocUnsafe is OK here because we're overwriting the buffer */
	const buf = Buffer.allocUnsafe(1)
	buf.writeUInt8(keylen, 0)
	return buf
}

const validateType = (str: any, type: 'string' | 'number') => {
	if (typeof str !== type) {
		throw new TypeError(`The "${str}" argument must be of type string`)
	}
}

const validateStringOrBuffer = (arg: any) => {
	if (typeof arg !== 'string' && !Buffer.isBuffer(arg)) {
		throw new TypeError('The "${arg}" argument must be of type Buffer or string')
	}
}
