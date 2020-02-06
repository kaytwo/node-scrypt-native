/// <reference types="node" />
export declare const hash: (password: string, keylen?: number) => Promise<string>;
export declare const compare: (plaintext: string, hash: string) => Promise<boolean>;
export declare const hashWithSalt: (password: string, salt: string | Buffer, keylen?: number) => Promise<string>;
