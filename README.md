# node-scrypt-native

- Zero dependencies (only uses Node's native `crypto` module)
- Tiny, simple code (only XX LOC (link))
- Compatible with `bcrypt` (just change your imports! (link to readme section))
- TypeScript typings

node-scrypt-native is a dependency-free wrapper around node's `crypto.scrypt`

## Why not `node-scrypt`?

`node-scrypt`'s last update is 2 years old and, most importantly, it doesn't use node's own `crypto.scrypt`.

## Installation

    yarn add scrypt-native

or, if using npm:

    npm i scrypt-native

This package already comes with TypeScript definitions. There's no need to install a separate package from `@types`.
