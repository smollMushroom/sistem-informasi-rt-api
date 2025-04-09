import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
}

export const verifyToken = (token:string):any => {
  return jwt.verify(token, jwtConfig.secret);
}