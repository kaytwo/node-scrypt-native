# node-scrypt-native

- Zero dependencies (only uses Node's native `crypto` module)
- Tiny, simple code ([around 62 LOC](./src/index.ts))
- TypeScript typings

node-scrypt-native is a dependency-free wrapper around Node's own [crypto.scrypt](https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback).

## Why not `node-scrypt`?

`node-scrypt`'s last update is 2 years old and, most importantly, it doesn't use `crypto.scrypt`.

## Installation

    yarn add scrypt-native

or, if using npm:

    npm i scrypt-native

This package already comes with TypeScript definitions. There's no need to install a separate package from `@types`.
