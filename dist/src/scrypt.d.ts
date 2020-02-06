/// <reference types="node" />
interface ScryptOptions {
    N: number;
    r: number;
    p: number;
    maxmem: number;
}
export declare const scrypt: (plaintext: string, salt: Buffer, options?: ScryptOptions) => Promise<Buffer>;
export {};
