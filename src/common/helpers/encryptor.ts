import crypto from 'crypto';

export class Encryptor {
    constructor(
        private readonly algorithm: string,
        private readonly key: crypto.CipherKey,
        private readonly iv: crypto.BinaryLike,
    ) {}

    encrypt(key: string, encoding: BufferEncoding = 'base64') {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        return Buffer.from(
            cipher.update(key, 'utf-8', 'hex') + cipher.final('hex'),
        ).toString(encoding);
    }

    decrypt(encryptedKey: string, encoding: BufferEncoding = 'base64') {
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.key,
            this.iv,
        );
        const buff = Buffer.from(encryptedKey, encoding);
        return Buffer.from(
            decipher.update(buff.toString('utf-8'), 'hex', 'utf-8') +
                decipher.final('utf-8'),
        ).toString();
    }
}
