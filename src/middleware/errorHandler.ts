import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { ConflictError } from '../utils/error';


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); 

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const fields = (err.meta as any)?.target?.join(', ') || 'field unik';
      err = new ConflictError(`${fields} sudah digunakan.`);
    }
  }

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Terjadi kesalahan pada server',
  });
};
