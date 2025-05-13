import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/error';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if(!result.success){
      return next(new ValidationError('Validasi data gagal'))
    }
    req.body = result.data;
    next();
  };
