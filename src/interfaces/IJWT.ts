import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export interface JwtPayload extends DefaultJwtPayload {
  email: string;
  userId: string;
  role: 'warga' | 'admin' | 'ketua';
}
