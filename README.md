# node-scrypt-native

- Zero dependencies (only uses Node's native `crypto` module)
- Tiny, simple code ([around 62 LOC](./src/index.ts))
- TypeScript typings

node-scrypt-native is a dependency-free wrapper around Node's own [crypto.scrypt](https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback).

## Why not `node-scrypt`?

`node-scrypt`'s last update is 2 years old and, most importantly, it doesn't use `crypto.scrypt`. Having 0 dependencies reduces the attack surface and makes `node-scrypt-native` easier to install.

## Installation

    yarn add scrypt-native

or, if using npm:

    npm i scrypt-native

This package already comes with TypeScript definitions. There's no need to install a separate package from `@types`.

## Usage

```typescript
import * as scrypt from 'scrypt-native'
// if not using ES6 modules, do
const scrypt = require('scrypt-native')

async function registerUser(username, password) {
	const passwordHash = await scrypt.hash(password)
	//...
}

async function loginUser(username, password) {
	// ... fetch passwordHash from database,
	const isPasswordCorrect = await scrypt.compare(password, user.passwordHash)

	if (!isPasswordCorrect) {
		// error
	}

	// login user
}
```

## API

| Function     | Description                                                | Input type                                             | Output type        | Notes                                                                                                                              |
|--------------|------------------------------------------------------------|--------------------------------------------------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------|
| hash         | Returns the scrypt hash for `plaintext`                    | `(plaintext: string, keylen=64)`                       | `Promise<string>`  |  Keylen must be between 1 and 255. Output is `base64(keylen + derived key + salt)`. Salt is the output of `crypto.randomBytes(16)` |
| compare      | Checks if `hash` matches `plaintext`                       |                                                        | `Promise<boolean>` |                                                                                                                                    |
| hashWithSalt | Returns the scrypt hash for `plaintext` salted with `salt` | `(plaintext: string, salt: Buffer, string, keylen=64)` | `Promise<string>`  |  Keylen must be between 1 and 255. Output is `base64(keylen + derived key + salt)`                                                 |
