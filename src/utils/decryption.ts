import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_KEY || "secret-key-must-32-digits-words!";
const salt = process.env.SALT || 'salt';
const key = crypto.scryptSync( secretKey, salt, 32);

export const decrypt = (text: string): string => {
  const [ivHex, encryptedHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString();
}

export const safeDecrypt = (text?: string) => {
  try {
    if (!text) return null;
    return decrypt(text);
  } catch {
    return null;
  }
};