import jwt from 'jsonwebtoken';
import { findUser, updateUser } from "../repositories/userRepository"
import { NotFoundError, UnauthorizedError } from "../utils/error";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { addTokenToBlacklist } from './tokenBlacklistService';

export const loginUserService = async (email: string, password: string): Promise<string> => {
  const user = await findUser(email);
  if (!user) throw new NotFoundError('User tidak ditemukan');
  
  const isMatch = await comparePassword(password, user.passwordHash);
  
  if (!isMatch) throw new UnauthorizedError('Password salah');
  
  const token = generateToken({
    email: user.email,
    userId: user.id,
    role: user.role,
  });
  
  updateUser(user.id, {token}, {})
  return token;
}

export const logoutUserService = async (token: string): Promise<void> => {
  const decoded: any = jwt.decode(token);
  
  if (!decoded || !decoded.exp) throw new UnauthorizedError("Token Tidak Valid");

  const expiresAt = new Date(decoded.exp * 1000);
  
  await addTokenToBlacklist(token, expiresAt)
}