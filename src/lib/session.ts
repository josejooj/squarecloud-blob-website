export function decrypt(key: string = "") {
    return Buffer.from(key, 'base64').toString('ascii')
}

export function encrypt(key: string = "") {
    return Buffer.from(key, 'ascii').toString("base64");
}