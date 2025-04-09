import { SignOptions } from "jsonwebtoken";

export const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET || 'secret-key',
  expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '5m'
}

interface JwtConfig {
  secret: string;
  expiresIn: SignOptions["expiresIn"];
}
