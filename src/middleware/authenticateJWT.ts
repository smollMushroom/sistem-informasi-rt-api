import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { UnauthorizedError } from "../utils/error";
import { isTokenBlacklisted } from "../services/tokenBlacklistService";

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) return next(new UnauthorizedError('Token tidak ditemukan'));

  const token = authHeader.split(' ')[1];
  const isBlackListed = await isTokenBlacklisted(token);

  if (isBlackListed) {
    return next(new UnauthorizedError("Token sudah tidak berlaku"));
  }

  try {
    const decode = verifyToken(token);
    req.user = decode;
    req.token = token;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return next(new UnauthorizedError('Token telah kedaluwarsa'));
    }
    return next(new UnauthorizedError('Token tidak valid'));
  }
}