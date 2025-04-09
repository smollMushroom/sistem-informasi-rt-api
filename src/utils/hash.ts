import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const hashPassword = async (password: string):Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export const hashString = (text: string): string => {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};