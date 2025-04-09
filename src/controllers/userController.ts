import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { createUserService, getUserBySearchService, getUsersService } from '../services/userService';
import { ForbiddenError, NotFoundError } from '../utils/error';


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByEmailOrUsername = async (req: Request, res: Response, next: NextFunction) => {
  const { search } = req.query;
  
  if (!search) {
    return next(new NotFoundError("parameter search diperlukan"))
  }
  
  try {
    const user = await getUserBySearchService(search as string);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requester = req.user as {role?: string}
    const isFromPublic = !requester;
    const bodyRole = req.body.role

    if (isFromPublic){
      req.body.role = 'warga';
    } else {
      if (requester.role !== 'ketua' && (bodyRole === 'admin' || bodyRole === 'ketua')){
        return next(new ForbiddenError('Hanya untuk ketua yang bisa membuat admin atau ketua'));
      }
    }

    const newUser = await createUserService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const whoAmI = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = jwt.decode(req.token) as { email: string};
    const user = await getUserBySearchService(email);

    res.json(user)
  } catch (error) {
    next(error)
  }
}
