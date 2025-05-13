"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_KEY || "secret-key-must-32-digits-words!";
const salt = process.env.SALT || 'salt';
const key = crypto_1.default.scryptSync(secretKey, salt, 32);
const ivLength = 16;
const encrypt = (text) => {
    const iv = crypto_1.default.randomBytes(ivLength);
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};
exports.encrypt = encrypt;
