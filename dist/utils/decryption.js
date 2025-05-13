"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeDecrypt = exports.decrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_KEY || "secret-key-must-32-digits-words!";
const salt = process.env.SALT || 'salt';
const key = crypto_1.default.scryptSync(secretKey, salt, 32);
const decrypt = (text) => {
    const [ivHex, encryptedHex] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
const safeDecrypt = (text) => {
    try {
        if (!text)
            return null;
        return (0, exports.decrypt)(text);
    }
    catch (_a) {
        return null;
    }
};
exports.safeDecrypt = safeDecrypt;
