import { NextFunction, Request, Response } from "express"
import { ForbiddenError } from "../utils/error";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as {role: string};

    if(!user || !allowedRoles.includes(user.role)) {
      return next(new ForbiddenError('Akses ditolak'))
    }

    next();
  }
}