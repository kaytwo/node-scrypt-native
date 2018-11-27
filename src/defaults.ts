
// 64 bytes
export const DEFAULT_SCRYPT_KEYLEN = 64

// 16 bytes as recommended by NIST SP 800-132
// https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
export const DEFAULT_SALT_BYTES = 16

export const DEFAULT_SCRYPT_PARAMETERS = {
	// For justification on these parameters, see
	// https://blog.filippo.io/the-scrypt-parameters/
	N: 1<<15,
	r: 8,
	p: 1,
	maxmem: 45000000, // 45MB
}
