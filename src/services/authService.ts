import jwt from 'jsonwebtoken';
import { findUserByEmailOrUsername, updateUser } from "../repositories/userRepository"
import { NotFoundError, UnauthorizedError } from "../utils/error";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { addTokenToBlacklist } from './tokenBlacklistService';

export const loginUserService = async (email: string, password: string): Promise<string> => {
  const user = await findUserByEmailOrUsername(email);
  if (!user) throw new NotFoundError('User tidak ditemukan');
  
  const isMatch = await comparePassword(password, user.passwordHash);
  
  if (!isMatch) throw new UnauthorizedError('Password salah');
  
  const newToken = generateToken({
    email: user.email,
    username: user.username,
    role: user.role,
  });
  
  updateUser({email, token: newToken})

  return newToken;
}

export const logoutUserService = async (token: string): Promise<void> => {
  const decoded: any = jwt.decode(token);
  
  if (!decoded || !decoded.exp) throw new UnauthorizedError("Token Tidak Valid");

  const expiresAt = new Date(decoded.exp * 1000);
  
  await addTokenToBlacklist(token, expiresAt)
}